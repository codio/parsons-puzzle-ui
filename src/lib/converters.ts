import { parseScript } from 'esprima'
import { ParsonsGrader, AssertEqualParams, UnitTest } from '../@types/types'

export const convertParsonsGraderFuncToEnum = (grader?: (() => void) | string | undefined): ParsonsGrader => {
  if (!grader) {
    return ParsonsGrader.LineBased
  }

  let graderName: string = typeof grader === 'string' ? grader : grader.name
  graderName = graderName.replace('ParsonsWidget._graders.', '')

  switch (graderName) {
    case 'VariableCheckGrader':
      return ParsonsGrader.VariableCheck
    case 'TurtleGrader':
      return ParsonsGrader.Turtle
    case 'UnitTestGrader':
      return ParsonsGrader.UnitTest
    case 'LanguageTranslationGrader':
      return ParsonsGrader.LanguageTranslation
    default:
      return ParsonsGrader.LineBased
  }
}

export const convertTestVariablesToString = (variables: object): string => {
  const lines: string[] = []
  Object.entries(variables).forEach(([key, value]) => {
    lines.push(`"${key}": ${value}`)
  })
  return lines.join('\n')
}

const parseUnitTestArguments = (str: string): AssertEqualParams => {
  const unitTestChecks = str.split('\n')
  const methodCall: string[] = []
  const expectedOutput: string[] = []
  const errorMessage: string[] = []

  unitTestChecks.forEach((check: string) => {
    // use any type because return type for esprima.parseScript is wrong
    // eslint-disable-next-line
    const jsonObj: any = parseScript(check, { range: true })
    const expArgumentsArr = jsonObj.body[0].expression.arguments
    methodCall.push(check.slice(...expArgumentsArr[0].range))
    expectedOutput.push(check.slice(...expArgumentsArr[1].range))
    errorMessage.push(expArgumentsArr[2] ? check.slice(...expArgumentsArr[2].range) : '')
  })
  return {
    methodCall: methodCall.join('\n'),
    expectedOutput: expectedOutput.join('\n'),
    errorMessage: errorMessage.join('\n')
  }
}

const parseUnitTests = (unitTestsStr: string | undefined): RegExpMatchArray | null => {
  if (!unitTestsStr) return null
  const pattern = /(def\s*(.*?)\(.*?\):\n)^(\s*self\.assertEqual\(.*?\))*\s*$/gm
  const testMatches: RegExpMatchArray | null = unitTestsStr.match(pattern)
  if (!testMatches) return null
  return testMatches
}

export const convertUnitTestsFromString = (unitTestsStr: string | undefined): UnitTest[] => {
  const unitTests = parseUnitTests(unitTestsStr)
  if (!unitTests) {
    return []
  }
  const unitTestsArr: UnitTest[] = []
  unitTests.forEach((test) => {
    const pattern = /\s*def\s*(.*?)\(.*?\):\n^(\s*self\.assertEqual\(.*?\))*\s*$/m
    const checks: RegExpMatchArray | null = pattern.exec(test)
    if (checks?.length) {
      const firstAssertEqualIndex = checks[0].indexOf('self.assertEqual')
      unitTestsArr.push({
        name: checks[1],
        assertEquals: parseUnitTestArguments(checks[0].substr(firstAssertEqualIndex))
      })
    }
  })
  return unitTestsArr
}

export default {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString
}
