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

const unitTestParse = (str: string): UnitTest => {
  const startPosition = str.lastIndexOf('")')
  const messageQuoteEndPosition = str.lastIndexOf('"', startPosition - 1)
  const firstCommaPosition = str.lastIndexOf(',', messageQuoteEndPosition - 1)
  const secondCommaPosition = str.lastIndexOf(',', firstCommaPosition - 1)

  const errorMessage = str.slice(firstCommaPosition + 1, startPosition + 1)
  let expectedValue = str.slice(secondCommaPosition + 1, firstCommaPosition)
  let testCode
  const isArray = expectedValue.lastIndexOf(']')
  const isObject = expectedValue.lastIndexOf('}')

  if (isArray !== -1 || isObject !== -1) {
    const startBracketPosition = str.lastIndexOf('[', firstCommaPosition) || str.lastIndexOf('{', firstCommaPosition)
    const commaStartExpectedValuePos = str.lastIndexOf(',', startBracketPosition)
    expectedValue = str.slice(startBracketPosition, firstCommaPosition)
    testCode = str.slice(1, commaStartExpectedValuePos)
  } else {
    testCode = str.slice(1, secondCommaPosition)
  }
  return { methodCall: testCode.trim(), expectedOutput: expectedValue.trim(), errorMessage: errorMessage.trim() }
}

export const convertUnitTestsFromString = (unitTests: string | undefined): UnitTest[] => {
  if (!unitTests) {
    return []
  }
  let match: RegExpExecArray | null
  const test: UnitTest[] = []
  const re = /^\s*self\.assertEqual(\(.*?\))\s*$/gm

  do {
    match = re.exec(unitTests)
    if (match !== null) {
      test.push(unitTestParse(match[1]))
    }
  } while (match !== null)
  return test
}

export default {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString
}
