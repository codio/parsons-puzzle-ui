import { ParsonsGrader, UnitTest } from '../@types/types'

export const convertParsonsGraderFuncToEnum = (grader?: (() => void) | undefined): ParsonsGrader => {
  if (!grader) {
    return ParsonsGrader.LineBased
  }
  switch (grader.name) {
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

export const convertUnitTestsFromString = (/* unitTests: string */): UnitTest[] => {
  const test: UnitTest = { methodCall: '', expectedOutput: '', errorMessage: '' }
  return [test]
}

export default {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString
}
