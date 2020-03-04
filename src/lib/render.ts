import $, { Cash } from 'cash-dom'

import {
  convertParsonsGraderFuncToEnum,
  convertTestVariablesToString,
  convertUnitTestsFromString
} from './converters'
import {
  ParsonsGrader,
  ParsonsOptions,
  ParsonsSettings,
  UnitTest,
  VariableTest
} from '../@types/types'

const renderInitialCodeBlock = (code: string): Cash => {
  const codeBlocksContainer: Cash = $('<div class="code-blocks-container"></div>')
  const codeBlock = getCodeBlocks(code, false)

  const taContainer: Cash = $('<div class="code-blocks-ta-container fieldset"></div>')
  taContainer.append('<label for="initial">Code to Become Blocks</label>')
  const taCode: Cash = $(`<textarea id="initial" rows="8">${codeBlock}</textarea>`)
  taCode.attr('placeholder', 'Type Solution Here')
  taContainer.append(taCode)
  codeBlocksContainer.append(taContainer)

  const hintText = '$$toggle::value1::value2::valuen$$&nbsp;&nbsp;&nbsp;&nbsp; new line \\n in same block'
  codeBlocksContainer.append(`<div class="code-blocks-hint">${hintText}</div>`)

  return codeBlocksContainer
}

const renderDistractorBlocks = (settings: ParsonsSettings): Cash => {
  const distractorBlockContainer: Cash = $('<div class="distractor-blocks-container"></div>')
  const taContainer: Cash = $('<div class="distractor-blocks-ta-container fieldset"></div>')
  const distractors = getCodeBlocks(settings.initial, true)

  taContainer.append('<label for="distractors">Code to Become Distractor Blocks</label>')
  const taDistractors: Cash = $(`<textarea id="distractors" rows="4">${distractors}</textarea>`)
  taDistractors.attr('placeholder', 'Code blocks that serve as distractions (incorrect options)')
  taContainer.append(taDistractors)
  distractorBlockContainer.append(taContainer)

  const maxDistractors: number = settings.options.max_wrong_lines || 10
  const maxDistractorsContainer: Cash = $('<div class="distractor-blocks-max-container fieldset"></div>')
  maxDistractorsContainer.append('<label for="max-distractors">Max Distractors</label>')
  maxDistractorsContainer.append(`<input id="max-distractors" type="number" value="${maxDistractors}" />`)
  distractorBlockContainer.append(maxDistractorsContainer)

  return distractorBlockContainer
}

const getCodeBlocks = (code: string, isDistractors: boolean): string => {
  const lines = code.split('\n')
  const pattern = /(.*?)\s*#distractor\s*$/;
  if (isDistractors) {
    return lines.filter(line => !line.search(pattern))
        .map(item => item.replace(/#distractor\s*$/,''))
        .join('\n')
  }
  return lines.filter(line => line.search(pattern)).join('\n')
}

const renderGraderSelect = (grader?: (() => void) | string | undefined): Cash => {
  const graderContainer: Cash = $('<div class="grader-container fieldset"></div>')

  graderContainer.append('<label for="grader">Grader</label>')
  const graderSelect: Cash = $('<select id="grader"></select>')
  graderSelect.append(`<option value="${ParsonsGrader.LineBased}">LineBasedGrader</option>`)
  graderSelect.append(`<option value="${ParsonsGrader.VariableCheck}">VariableCheckGrader</option>`)
  graderSelect.append(`<option value="${ParsonsGrader.UnitTest}">UnitTestGrader</option>`)
  graderSelect.append(`<option value="${ParsonsGrader.LanguageTranslation}">LanguageTranslationGrader</option>`)
  graderSelect.append(`<option value="${ParsonsGrader.Turtle}">TurtleGrader</option>`)

  graderSelect.val(convertParsonsGraderFuncToEnum(grader))
  graderContainer.append(graderSelect)

  return graderContainer
}

const renderRequireDragging = (trashId?: string): Cash => {
  const draggingContainer: Cash = $('<div class="dragging-container fieldset"></div>')

  draggingContainer.append('<label for="require-dragging">Require dragging?</label>')
  draggingContainer.append(`<input id="require-dragging" type="checkbox" ${trashId ? 'checked' : ''} />`)

  return draggingContainer
}

const renderIndenting = (canIndent?: boolean): Cash => {
  const indentingContainer: Cash = $('<div class="indenting-container fieldset"></div>')

  indentingContainer.append('<label for="can-indent">Indenting?</label>')
  indentingContainer.append(
    `<input id="can-indent" type="checkbox" ${canIndent || canIndent === undefined ? 'checked' : ''} />`
  )

  return indentingContainer
}

const renderIndentSize = (canIndent?: boolean, xIndent?: number): Cash => {
  const indentSizeContainer: Cash = $('<div class="indent-size-container fieldset"></div>')

  indentSizeContainer.append('<label for="indent-size">Indent Size</label>')
  indentSizeContainer.append(
    `<input id="indent-size" type="text" value="${
      xIndent !== undefined ? xIndent : 50
    }" ${canIndent === false ? 'disabled' : ''} />`
  )

  return indentSizeContainer
}

const renderExecLimit = (execLimit?: number): Cash => {
  const draggingContainer: Cash = $('<div class="exec-limit-container fieldset"></div>')

  draggingContainer.append('<label for="exec-limit">Exec Limit</label>')
  draggingContainer.append(
    `<input id="exec-limit" type="text" value="${execLimit !== undefined ? execLimit : 2500}" />`
  )

  return draggingContainer
}

const renderCommonSettings = (options: ParsonsOptions): Cash => {
  const commonSettingsContainer: Cash = $('<div class="common-settings-container"></div>')

  commonSettingsContainer.append(renderGraderSelect(options.grader))
  commonSettingsContainer.append(renderRequireDragging(options.trashId))
  commonSettingsContainer.append(renderIndenting(options.can_indent))
  commonSettingsContainer.append(renderIndentSize(options.can_indent, options.x_indent))
  commonSettingsContainer.append(renderExecLimit(options.exec_limit))

  return commonSettingsContainer
}

export const renderVarTest = (test?: VariableTest | undefined): Cash => {
  const testContainer: Cash = $('<li class="test-container"></li>')

  const actionsContainer = $('<div class="action-container"></div>')
  actionsContainer.append('<button type="button" class="action duplicate">clone</button>')
  actionsContainer.append('<button type="button" class="action small remove">remove</button>')
  testContainer.append(actionsContainer)

  const testInfoContainer = $('<div class="test-info-container"></div>')
  const column1 = $('<div class="column"></div>')

  const variablesContainer = $('<div class="fieldset"></div>')
  variablesContainer.append('<label>Expected variable values*</label>')
  const taVariables = $(
    `<textarea rows="2" name="variables">${test ? convertTestVariablesToString(test.variables) : ''}</textarea>`
  )
  taVariables.attr('placeholder', '"var_Name_1": value\n"var_Name_2": value')
  variablesContainer.append(taVariables)
  column1.append(variablesContainer)

  const descriptionContainer = $('<div class="fieldset"></div>')
  descriptionContainer.append('<label>Test Description*</label>')
  const taDescription = $(`<textarea rows="2" name="description">${test ? test.message : ''}</textarea>`)
  taDescription.attr('placeholder', 'Description of test that is shown to learner')
  descriptionContainer.append(taDescription)
  column1.append(descriptionContainer)

  const column2 = $('<div class="column"></div>')

  const preCodeContainer = $('<div class="fieldset"></div>')
  preCodeContainer.append('<label>Pre Code</label>')
  const taPreCode = $(`<textarea rows="2" name="pre-code">${test ? test.initcode : ''}</textarea>`)
  taPreCode.attr('placeholder', 'Code prepended before student code')
  preCodeContainer.append(taPreCode)
  column2.append(preCodeContainer)

  const postCodeContainer = $('<div class="fieldset"></div>')
  postCodeContainer.append('<label>Post Code</label>')
  const taPostCode = $(`<textarea rows="2" name="post-code">${test ? test.code : ''}</textarea>`)
  taPostCode.attr('placeholder', 'Code appended after student code')
  postCodeContainer.append(taPostCode)
  column2.append(postCodeContainer)

  testInfoContainer.append(column1)
  testInfoContainer.append(column2)
  testContainer.append(testInfoContainer)
  return testContainer
}

const renderVariableCheckGrader = (options?: ParsonsOptions, additionalGraderClass?: string): Cash => {
  const classes: string[] = [
    'grader-form-container',
    'variable-check-grader-container',
    additionalGraderClass || ''
  ]
  const graderFormContainer = $(`<div class="${classes.join(' ')}"></div>`)

  graderFormContainer.append(
    '<div class="add-test-container"><button id="add-test" type="button">New Test</button></div>'
  )
  const testsContainer: Cash = $('<div class="tests-container"></div>')
  const testsList: Cash = $('<ul class="tests-list"></ul>')

  if (options && options.vartests) {
    options.vartests.forEach((test: VariableTest) => testsList.append(renderVarTest(test)))
  } else {
    testsList.append(renderVarTest())
  }
  testsContainer.append(testsList)
  graderFormContainer.append(testsContainer)

  return graderFormContainer
}

const renderUnitTestCodePrepend = (code?: string): Cash => {
  const codePrependContainer: Cash = $('<div class="code-prepend-container"></div>')

  const taContainer: Cash = $('<div class="code-prepend-ta-container fieldset"></div>')
  taContainer.append('<label for="code-prepend">Code prepended before student code</label>')
  const taCode: Cash = $(`<textarea id="code-prepend" rows="4">${code || ''}</textarea>`)
  taCode.attr('placeholder', 'Code prepended before student code')
  taContainer.append(taCode)
  codePrependContainer.append(taContainer)

  return codePrependContainer
}

export const renderUnitTest = (test?: UnitTest | undefined): Cash => {
  const testContainer: Cash = $('<li class="test-container"></li>')

  const actionsContainer = $('<div class="action-container"></div>')
  actionsContainer.append('<button type="button" class="action duplicate">clone</button>')
  actionsContainer.append('<button type="button" class="action small remove">remove</button>')
  testContainer.append(actionsContainer)

  const testInfoContainer = $('<div class="test-info-container"></div>')
  const column1 = $('<div class="column"></div>')

  const methodsContainer = $('<div class="fieldset"></div>')
  methodsContainer.append('<label>Method Call(s)*</label>')
  const taMethods = $(
    `<textarea rows="2" name="method-call">${test ? test.methodCall : ''}</textarea>`
  )
  taMethods.attr('placeholder', 'Write method call with arguments')
  methodsContainer.append(taMethods)
  column1.append(methodsContainer)

  const messageContainer = $('<div class="fieldset"></div>')
  messageContainer.append('<label>Error Message (optional)</label>')
  const taMessage = $(`<textarea rows="2" name="error-message">${test ? test.errorMessage : ''}</textarea>`)
  taMessage.attr('placeholder', 'What student sees if this test fails')
  messageContainer.append(taMessage)
  column1.append(messageContainer)

  const column2 = $('<div class="column"></div>')

  const expectedOutputContainer = $('<div class="fieldset"></div>')
  expectedOutputContainer.append('<label>Expected Output(s)*</label>')
  const taExpectedOutput = $(`<textarea rows="2" name="expected-output">${test ? test.expectedOutput : ''}</textarea>`)
  taExpectedOutput.attr('placeholder', 'Expected output of method call')
  expectedOutputContainer.append(taExpectedOutput)
  column2.append(expectedOutputContainer)

  testInfoContainer.append(column1)
  testInfoContainer.append(column2)
  testContainer.append(testInfoContainer)
  return testContainer
}

const renderUnitTestGrader = (options?: ParsonsOptions): Cash => {
  const graderFormContainer = $('<div class="grader-form-container unit-test-grader-container"></div>')

  graderFormContainer.append(renderUnitTestCodePrepend(options ? options.unittest_code_prepend : ''))

  const tests: UnitTest[] | null = options ? convertUnitTestsFromString(/* options.unittests */) : null

  graderFormContainer.append(
    '<div class="add-test-container"><button id="add-test" type="button">New Test</button></div>'
  )
  const testsContainer: Cash = $('<div class="tests-container"></div>')
  const testsList: Cash = $('<ul class="tests-list"></ul>')

  if (tests) {
    tests.forEach((test: UnitTest) => testsList.append(renderUnitTest(test)))
  } else {
    testsList.append(renderUnitTest())
  }
  testsContainer.append(testsList)
  graderFormContainer.append(testsContainer)

  return graderFormContainer
}

const renderProgrammingLang = (lang?: string): Cash => {
  const programmingLangContainer: Cash = $('<div class="programming-lang-container fieldset"></div>')

  programmingLangContainer.append('<label for="programming-lang">Programming Language</label>')
  const programmingLangSelect: Cash = $('<select id="programming-lang"></select>')
  programmingLangSelect.append('<option value="pseudo">pseudocode</option>')
  programmingLangSelect.append('<option value="java">java</option>')
  programmingLangSelect.append('<option value="python">python</option>')

  if (lang) {
    programmingLangSelect.val(lang)
  }
  programmingLangContainer.append(programmingLangSelect)

  return programmingLangContainer
}

const renderExecutableCode = (code?: string): Cash => {
  const executableCodeContainer: Cash = $('<div class="executable-code-container"></div>')

  const taContainer: Cash = $('<div class="executable-code-ta-container fieldset"></div>')
  taContainer.append('<label for="code-prepend">Executable code</label>')
  const taCode: Cash = $(`<textarea id="executable-code" rows="4">${code || ''}</textarea>`)
  taCode.attr('placeholder', 'Executable code')
  taContainer.append(taCode)
  executableCodeContainer.append(taContainer)

  return executableCodeContainer
}

const renderTurtleModelCode = (code?: string): Cash => {
  const turtleModelCodeContainer: Cash = $('<div class="turtle-model-code-container"></div>')

  const taContainer: Cash = $('<div class="turtle-model-code-ta-container fieldset"></div>')
  taContainer.append('<label for="turtle-model-code">Turtle Model Code</label>')
  const taCode: Cash = $(`<textarea id="turtle-model-code" rows="4">${code || ''}</textarea>`)
  taCode.attr('placeholder', 'Turtle Model Code')
  taContainer.append(taCode)
  turtleModelCodeContainer.append(taContainer)

  return turtleModelCodeContainer
}

const renderLanguageTranslationGrader = (options?: ParsonsOptions): Cash => {
  const grader: Cash = renderVariableCheckGrader(options, 'language-translation-grader-container')
  grader.prepend(renderExecutableCode(options ? options.executable_code : ''))
  grader.prepend(renderProgrammingLang(options ? options.programmingLang : ''))
  return grader
}

const renderTurtleGrader = (options?: ParsonsOptions): Cash => {
  const graderFormContainer = $('<div class="grader-form-container turtle-grader-container"></div>')

  graderFormContainer.append(renderProgrammingLang(options ? options.programmingLang : ''))
  graderFormContainer.append(renderExecutableCode(options ? options.executable_code : ''))
  graderFormContainer.append(renderTurtleModelCode(options ? options.turtleModelCode : ''))

  return graderFormContainer
}

const renderGraderForm = (container: Cash, grader: ParsonsGrader, options?: ParsonsOptions): void => {
  container.closest('.ParsonsUI').removeClass().addClass(`ParsonsUI ${grader.toString()}`)
  container.find('.grader-form-container').remove()

  switch (grader) {
    case ParsonsGrader.VariableCheck:
      container.append(renderVariableCheckGrader(options))
      break
    case ParsonsGrader.UnitTest:
      container.append(renderUnitTestGrader(options))
      break
    case ParsonsGrader.LanguageTranslation:
      container.append(renderLanguageTranslationGrader(options))
      break
    case ParsonsGrader.Turtle:
      container.append(renderTurtleGrader(options))
      break
    default:
      break
  }
}

export const renderGrader = (container: Cash, grader: ParsonsGrader): void => {
  renderGraderForm(container.find('.ParsonsUI'), grader)
}

export const render = (container: Cash, settings: ParsonsSettings): void => {
  container.empty()

  const uiContainer: Cash = $('<div class="ParsonsUI"></div>')

  uiContainer.append(renderInitialCodeBlock(settings.initial))
  uiContainer.append(renderDistractorBlocks(settings))
  uiContainer.append(renderCommonSettings(settings.options))

  renderGraderForm(uiContainer, convertParsonsGraderFuncToEnum(settings.options.grader), settings.options)

  container.append(uiContainer)
}

export default {
  render
}
