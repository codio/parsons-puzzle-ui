import $, { Cash } from 'cash-dom'
import {
  Dictionary,
  ParsonsGrader,
  ParsonsOptions,
  ParsonsSettings, UnitTest,
  VariableTest
} from '../@types/types'

interface CommonSettings {
  initial: string;
  maxDistractors: number;
  grader: ParsonsGrader;
  requireDragging: boolean;
  indenting: boolean;
  indentSize: number;
  execLimit: number;
}

interface VariableCheckGraderOptions {
  vartests: VariableTest[];
}

interface UnitTestGraderOptions {
  unittestCodePrepend: string;
  unitTests: string;
}

const collectCommonSettings = (container: Cash): CommonSettings => {
  const codeBlocks: string = (container.find('#initial').val() as string)
  const distractors: string = (container.find('#distractors').val() as string)
  const maxDistractors: number = parseInt(container.find('#max-distractors').val() as string, 10)

  const initialWithDistractors: string = [
    codeBlocks,
    distractors.split('\n').map((line: string) => `${line} #distractor`).join('\n')
  ].join('\n')

  const grader: ParsonsGrader = (container.find('#grader').val() as string) as ParsonsGrader

  const indentSize: number = parseInt(container.find('#indent-size').val() as string, 10)
  const execLimit: number = parseInt(container.find('#exec-limit').val() as string, 10)

  return {
    initial: initialWithDistractors,
    maxDistractors: !Number.isNaN(maxDistractors) ? maxDistractors : 10,
    grader: grader || ParsonsGrader.LineBased,
    requireDragging: container.find('#require-dragging').is(':checked'),
    indenting: container.find('#can-indent').is(':checked'),
    indentSize: !Number.isNaN(indentSize) ? indentSize : 50,
    execLimit: !Number.isNaN(execLimit) ? execLimit : 2500
  }
}

const collectVariableCheckGraderOptions = (container: Cash): VariableCheckGraderOptions => {
  const tests: VariableTest[] = []

  container.find('.test-container').each((index: number, el: HTMLElement) => {
    const $this: Cash = $(el)
    const variables: Dictionary<number | string> = {}
    const variablesStr: string = $this.find('[name="variables"]').val() as string
    const description: string = $this.find('[name="description"]').val() as string
    const preCode: string = $this.find('[name="pre-code"]').val() as string
    const postCode: string = $this.find('[name="post-code"]').val() as string

    variablesStr.split('\n').forEach((line: string) => {
      const params: RegExpExecArray | null = /^\s*"(.*)":\s*(.*)\s*$/.exec(line)
      if (params && params.length !== 0) {
        const [, key, value] = params
        const trimmedValue: string = value.trim()
        const isNumber: boolean = /^[0-9]*$/.test(trimmedValue)
        variables[key] = isNumber ? parseInt(value, 10) : value
      }
    })

    tests.push({
      message: description,
      initcode: preCode,
      code: postCode,
      variables
    })
  })

  return {
    vartests: tests
  }
}

const collectUnitTestGraderOptions = (container: Cash): UnitTestGraderOptions => {
  const unitTests: UnitTest[] = []

  const codePrepend: string = container.find('[name="code-prepend"]').val() as string

  container.find('.test-container').each((index: number, el: HTMLElement) => {
    const $this: Cash = $(el)
    const methodCall: string = $this.find('[name="method-call"]').val() as string
    const errorMessage: string = $this.find('[name="error-message"]').val() as string
    const expectedOutput: string = $this.find('[name="expected-output"]').val() as string

    unitTests.push({ methodCall, errorMessage, expectedOutput })
  })

  const unitTestsArr: string[] = [
    'import unittestparson',
    'class myTests(unittestparson.unittest):',
    ...unitTests.map((test: UnitTest, index: number): string => [
      `  def test_${index}(self):`,
      `    self.assertEqual(${test.methodCall},${test.expectedOutput},${test.errorMessage})`
    ].join('\n')),
    '_test_result = myTests().main()'
  ]

  return {
    unittestCodePrepend: codePrepend,
    unitTests: unitTestsArr.join('\n')
  }
}

export const collectData = (container: Cash, initialOptions: ParsonsOptions): ParsonsSettings => {
  const common: CommonSettings = collectCommonSettings(container)

  const { grader } = common

  // todo add python to lang blocks
  const options: ParsonsOptions = {
    sortableId: initialOptions.sortableId || 'sortable',
    max_wrong_lines: common.maxDistractors,
    grader,
    exec_limit: common.execLimit,
    can_indent: common.indenting,
    x_indent: common.indentSize,
    lang: initialOptions.lang || 'en',
    toggleTypeHandlers: initialOptions.toggleTypeHandlers,
    programmingLang: '',
    executable_code: '',
    feedback_cb: initialOptions.feedback_cb,
    turtleModelCode: ''
  }

  if (common.requireDragging) {
    options.trashId = initialOptions.trashId || 'sortableTrash'
  }

  switch (grader) {
    case ParsonsGrader.VariableCheck: {
      const graderOptions: VariableCheckGraderOptions = collectVariableCheckGraderOptions(container)
      options.vartests = graderOptions.vartests
      break
    }
    case ParsonsGrader.UnitTest: {
      const graderOptions: UnitTestGraderOptions = collectUnitTestGraderOptions(container)
      options.unittest_code_prepend = graderOptions.unittestCodePrepend
      options.unittests = graderOptions.unitTests
      break
    }
    case ParsonsGrader.LanguageTranslation:
      break
    case ParsonsGrader.Turtle:
      break
    default:
      break
  }

  return {
    initial: common.initial,
    options
  }
}

export default {
  collectData
}
