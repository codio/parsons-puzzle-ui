import { ParsonsGrader, UnitTest } from '../@types/types'

export const convertParsonsGraderFuncToEnum = (grader?: (() => void) | string | undefined): ParsonsGrader => {
  if (!grader) {
    return ParsonsGrader.LineBased
  }

  const graderName: string = typeof grader === 'string' ? grader : grader.name

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
  const startpos = str.lastIndexOf('")')
  const pos1 = str.lastIndexOf('"', startpos - 1)
  const pos2 = str.lastIndexOf(',', pos1 - 1)
  const pos3 = str.lastIndexOf(',', pos2 - 1)

  const substr1 = str.slice(pos2 + 1, startpos + 1)
  let substr2 = str.slice(pos3 + 1, pos2)
  let substr3
  const posArr = substr2.lastIndexOf(']')
  const posObj = substr2.lastIndexOf('}')

  if (posArr !== -1) {
    const pos4 = str.lastIndexOf('[', pos2)
    const pos5 = str.lastIndexOf(',', pos4)
    substr2 = str.slice(pos4, pos2)
    substr3 = str.slice(1, pos5)
  } else if (posObj !== -1) {
    const pos4 = str.lastIndexOf('{', pos2)
    const pos5 = str.lastIndexOf(',', pos4)
    substr2 = str.slice(pos4, pos2)
    substr3 = str.slice(1, pos5)
  } else {
    substr3 = str.slice(1, pos3)
  }
  return { methodCall: substr3.trim(), expectedOutput: substr2.trim(), errorMessage: substr1.trim() }
}

export const convertUnitTestsFromString = (unitTests: string | undefined): UnitTest[] => {
  if (!unitTests) {
    return []
  }
  let result: RegExpExecArray | null
  const test: UnitTest[] = []
  const re = /^\s*self\.assertEqual(\(.*?\))\s*$/gm

  // eslint-disable-next-line no-cond-assign
  while ((result = re.exec(unitTests)) != null) {
    test.push(unitTestParse(result[1]))
  }
  return test
}

export default {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString
}
