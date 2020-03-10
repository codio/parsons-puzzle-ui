import { parseScript } from 'esprima'
import { ParsonsGrader, UnitTest } from '../@types/types'

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

const parseUnitTestArguments = (str: string): UnitTest => {
  // use any type because return type for esprima.parseScript is wrong
  // eslint-disable-next-line
  const jsonObj: any = parseScript(str, { range: true })
  const expArgumentsArr = jsonObj.body[0].expression.arguments
  const methodCall = str.slice(...expArgumentsArr[0].range)
  const expectedValue = str.slice(...expArgumentsArr[0].range)
  const errorMessage = str.slice(...expArgumentsArr[0].range)

  return {
    methodCall: methodCall.trim(),
    expectedOutput: expectedValue.trim(),
    errorMessage: errorMessage.trim()
  }
}

export const convertUnitTestsFromString = (unitTests: string | undefined): UnitTest[] => {
  if (!unitTests) {
    return []
  }
  const re = /^\s*self\.assertEqual(\(.*?\))\s*$/gm
  const matches: RegExpMatchArray | null = unitTests.match(re)
  return matches ? matches.map((match) => parseUnitTestArguments(match)) : []
}

export default {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString
}
