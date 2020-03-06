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

interface LanguageTranslationGraderOptions {
  programmingLang: string;
  executableCode: string;
  vartests: VariableTest[];
}

interface TurtleGraderOptions {
  programmingLang: string;
  executableCode: string;
  turtleModelCode: string;
}

interface HTMLElementWithCodeMirror extends HTMLElement {
  // eslint-disable-next-line
  CodeMirror?: any;
}

const getValueFromEditor = (el: Cash): string => {
  const codeMirrorEl: HTMLElementWithCodeMirror = el.siblings('.CodeMirror').get(0) as HTMLElement
  if (codeMirrorEl && codeMirrorEl.CodeMirror) {
    return codeMirrorEl.CodeMirror.getValue()
  }
  return (el.val() as string)
}

const collectCommonSettings = (container: Cash): CommonSettings => {
  const codeBlocks: string = getValueFromEditor(container.find('#initial'))
  const distractors: string = getValueFromEditor(container.find('#distractors'))
  const maxDistractors: number = parseInt(container.find('#max-distractors').val() as string, 10)

  const codeArr: string[] = codeBlocks.split('\n')
  const disrtactorsArr: string[] = distractors.split('\n')
    .map((line: string) => (line ? `${line} #distractor` : ''))
  const initialWithDistractors: string = codeArr.concat(disrtactorsArr)
    .filter((line: string) => !!line)
    .join('\n')

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

const collectVariableTests = (container: Cash): VariableTest[] => {
  const tests: VariableTest[] = []

  container.find('.test-container').each((index: number, el: HTMLElement) => {
    const $this: Cash = $(el)
    const variables: Dictionary<number | string> = {}
    const variablesStr: string = getValueFromEditor($this.find('[name="variables"]'))
    const description: string = getValueFromEditor($this.find('[name="description"]'))
    const preCode: string = getValueFromEditor($this.find('[name="pre-code"]'))
    const postCode: string = getValueFromEditor($this.find('[name="post-code"]'))

    variablesStr.split('\n').forEach((line: string) => {
      const params: RegExpExecArray | null = /^\s*"(.*)":\s*(.*)\s*$/.exec(line)
      if (params && params.length !== 0) {
        const [, key, value] = params
        const trimmedValue: string = value.trim()
        const isNumber: boolean = /^[0-9]*$/.test(trimmedValue)
        variables[key] = isNumber ? parseInt(value, 10) : value.replace(/^"(.*)"$/, '$1')
      }
    })

    tests.push({
      message: description,
      initcode: preCode,
      code: postCode,
      variables
    })
  })

  return tests
}

const collectVariableCheckGraderOptions = (container: Cash): VariableCheckGraderOptions => {
  return {
    vartests: collectVariableTests(container)
  }
}

const collectUnitTestGraderOptions = (container: Cash): UnitTestGraderOptions => {
  const unitTests: UnitTest[] = []

  const codePrepend: string = getValueFromEditor(container.find('[name="code-prepend"]'))

  container.find('.test-container').each((index: number, el: HTMLElement) => {
    const $this: Cash = $(el)
    const methodCall: string = getValueFromEditor($this.find('[name="method-call"]'))
    const errorMessage: string = getValueFromEditor($this.find('[name="error-message"]'))
    const expectedOutput: string = getValueFromEditor($this.find('[name="expected-output"]'))

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

const collectLanguageTranslationGraderOptions = (container: Cash): LanguageTranslationGraderOptions => {
  return {
    programmingLang: container.find('#programming-lang').val() as string,
    executableCode: getValueFromEditor(container.find('#executable-code')),
    vartests: collectVariableTests(container)
  }
}

const collectTurtleGraderOptions = (container: Cash): TurtleGraderOptions => {
  return {
    programmingLang: container.find('#programming-lang').val() as string,
    executableCode: getValueFromEditor(container.find('#executable-code')),
    turtleModelCode: getValueFromEditor(container.find('#turtle-model-code'))
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
    feedback_cb: initialOptions.feedback_cb
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
    case ParsonsGrader.LanguageTranslation: {
      const graderOptions: LanguageTranslationGraderOptions = collectLanguageTranslationGraderOptions(container)
      options.executable_code = graderOptions.executableCode
      options.programmingLang = graderOptions.programmingLang
      options.vartests = graderOptions.vartests
      break
    }
    case ParsonsGrader.Turtle: {
      const graderOptions: TurtleGraderOptions = collectTurtleGraderOptions(container)
      options.executable_code = graderOptions.executableCode
      options.programmingLang = graderOptions.programmingLang
      options.turtleModelCode = graderOptions.turtleModelCode
      break
    }
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
