// eslint-disable-next-line
/// <reference path="../@custom-types/monaco.d.ts" />
import $, { Cash } from 'cash-dom'

import { convertParsonsGraderFuncToEnum, convertTestVariablesToString, convertUnitTestsFromString } from './converters'
import {
  ParsonsGrader, ParsonsOptions, ParsonsSettings, VariableTest, UnitTest,
} from '../@types/types'
import { createEditor } from './editor'

interface CodeBlocks {
  codeBlocks: string;
  distractorBlocks: string;
}

const getCodeBlocks = (code: string): CodeBlocks => {
  const codeBlocks: string[] = []
  const distractorsBlocks: string[] = []
  const lines = code.split('\n')
  const pattern = /(.*?)\s*#distractor\s*$/

  lines.forEach((line: string) => {
    if (!line) {
      return
    }
    if (line.search(pattern) !== -1) {
      distractorsBlocks.push(line.replace(/#distractor\s*$/, ''))
    } else {
      codeBlocks.push(line)
    }
  })
  return {
    codeBlocks: codeBlocks.join('\n'),
    distractorBlocks: distractorsBlocks.join('\n'),
  }
}

const renderCodeContainHtmlCheckbox = (): Cash => {
  const containHtmlContainer: Cash = $('<div class="contain-html-container fieldset"></div>')

  containHtmlContainer.append('<input id="code-contain-html" type="checkbox" />')
  containHtmlContainer.append(
    '<label for="code-contain-html" class="code-contain-html-label">Code blocks contain HTML?</label>',
  )

  return containHtmlContainer
}

const renderInitialCodeBlock = (codeBlocks: string): Cash => {
  const codeBlocksContainer: Cash = $('<div class="code-blocks-container"></div>')

  const editorControlsContainer: Cash = $('<div class="code-blocks-controls-container fieldset"></div>')
  editorControlsContainer.append('<label for="initial">Code to Become Blocks</label>')
  const editorContainer: Cash = $('<div class="code-blocks-editor code-editor-container" id="initial" />')

  const editorId = createEditor(
    editorContainer,
    { value: codeBlocks },
    'Type solution with expected indentation here',
  )
  editorContainer.data('editor-id', editorId)

  editorControlsContainer.append(editorContainer)
  codeBlocksContainer.append(editorControlsContainer)

  codeBlocksContainer.append(renderCodeContainHtmlCheckbox())

  const hintText1 = '$$toggle::value1::value2::valuen$$'
  const hintText2 = 'new line \\n in same block'
  codeBlocksContainer.append(`<div class="code-blocks-hint">${hintText1}<br/>${hintText2}</div>`)

  return codeBlocksContainer
}

const renderDistractorBlocks = (distractors: string, maxWrongLines?: number): Cash => {
  const distractorBlockContainer: Cash = $('<div class="distractor-blocks-container"></div>')
  const distractorBlockControlsContainer: Cash = $('<div class="distractor-blocks-controls-container fieldset"></div>')

  distractorBlockControlsContainer.append('<label for="distractors">Code to Become Distractor Blocks</label>')
  const editorContainer: Cash = $('<div class="distractor-blocks-editor code-editor-container" id="distractors" />')
  const editorId = createEditor(
    editorContainer,
    { value: distractors },
    'Code blocks that serve as distractions (incorrect options)',
  )
  editorContainer.data('editor-id', editorId)

  distractorBlockControlsContainer.append(editorContainer)
  distractorBlockContainer.append(distractorBlockControlsContainer)

  const maxDistractorsTitle = 'The maximum number of distractor blocks added to the solution blocks when a student sees'
      + 'the problem. Use this if you, for example, have 4 distractor options but want only 2 to randomly display.'

  const maxDistractors: number = maxWrongLines || 10
  const maxDistractorsContainer: Cash = $('<div class="distractor-blocks-max-container fieldset"></div>')
  maxDistractorsContainer.append('<label for="max-distractors">Max Distractors</label>')
  maxDistractorsContainer.append(
    `<input id="max-distractors" type="number" title="${maxDistractorsTitle}" value="${maxDistractors}" />`,
  )
  distractorBlockContainer.append(maxDistractorsContainer)

  return distractorBlockContainer
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

const renderShowFeedback = (showFeedback?: boolean): Cash => {
  const showFeedbackContainer: Cash = $('<div class="show-feedback-container fieldset"></div>')

  showFeedbackContainer.append('<label for="show-feedback">Show feedback</label>')
  showFeedbackContainer.append(`<input id="show-feedback" type="checkbox" ${showFeedback === false ? '' : 'checked'} />`)

  return showFeedbackContainer
}

const renderRequireDragging = (requireDragging: boolean): Cash => {
  const draggingContainer: Cash = $('<div class="dragging-container fieldset"></div>')

  draggingContainer.append('<label for="require-dragging">Require dragging?</label>')
  draggingContainer.append(`<input id="require-dragging" type="checkbox" ${requireDragging ? 'checked' : ''} />`)

  return draggingContainer
}

const renderIndenting = (canIndent?: boolean): Cash => {
  const indentingContainer: Cash = $('<div class="indenting-container fieldset"></div>')

  indentingContainer.append('<label for="disable-indent">Disable indentation?</label>')
  indentingContainer.append(
    `<input id="disable-indent" type="checkbox" ${canIndent === false ? 'checked' : ''} />`,
  )

  return indentingContainer
}

const renderIndentSize = (canIndent?: boolean, xIndent?: number): Cash => {
  const indentSizeContainer: Cash = $('<div class="indent-size-container fieldset"></div>')

  indentSizeContainer.append('<label for="indent-size">Indent Size(px)</label>')
  indentSizeContainer.append(
    `<input id="indent-size" type="text" value="${
      xIndent !== undefined ? xIndent : 50
    }" ${canIndent === false ? 'disabled' : ''} />`,
  )

  return indentSizeContainer
}

const renderExecLimit = (execLimit?: number): Cash => {
  const draggingContainer: Cash = $('<div class="exec-limit-container fieldset"></div>')

  draggingContainer.append('<label for="exec-limit">Exec Limit(ms)</label>')
  draggingContainer.append(
    `<input id="exec-limit" type="text" value="${execLimit !== undefined ? execLimit : 2500}" />`,
  )

  return draggingContainer
}

const renderCommonSettings = (hasDistractors: boolean, options: ParsonsOptions): Cash => {
  const commonSettingsContainer: Cash = $('<div class="common-settings-container"></div>')

  commonSettingsContainer.append(renderGraderSelect(options.grader))

  const requireDragging: boolean = hasDistractors || !!options.trashId
  commonSettingsContainer.append(renderShowFeedback(options.show_feedback))
  commonSettingsContainer.append(renderRequireDragging(requireDragging))
  commonSettingsContainer.append(renderIndenting(options.can_indent))
  commonSettingsContainer.append(renderIndentSize(options.can_indent, options.x_indent))
  commonSettingsContainer.append(renderExecLimit(options.exec_limit))

  return commonSettingsContainer
}

export const renderVarTest = (test?: VariableTest | undefined): Cash => {
  const testContainer: Cash = $('<li class="test-container"></li>')

  const actionsContainer = $('<div class="action-container"></div>')
  actionsContainer.append('<a class="btn action duplicate">clone</a>')
  actionsContainer.append('<a class="btn action remove">remove</a>')
  testContainer.append(actionsContainer)

  const testInfoContainer = $('<div class="test-info-container"></div>')
  const column1 = $('<div class="column"></div>')

  const variablesControlsContainer = $('<div class="fieldset"></div>')
  variablesControlsContainer.append('<label>Expected variable values*</label>')

  const varEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-variables"/>')
  const varEditorId = createEditor(varEditorContainer,
    { value: test ? convertTestVariablesToString(test.variables) : '' },
    '"var_Name_1": value\n"var_Name_2": value')
  varEditorContainer.data('editor-id', varEditorId)

  variablesControlsContainer.append(varEditorContainer)
  column1.append(variablesControlsContainer)

  const descriptionControlsContainer = $('<div class="fieldset"></div>')
  descriptionControlsContainer.append('<label>Test Description*</label>')

  const descEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-description"/>')
  const descEditorId = createEditor(
    descEditorContainer,
    { value: test ? test.message : '' },
    'Description of test that is shown to learner',
  )
  descEditorContainer.data('editor-id', descEditorId)

  descriptionControlsContainer.append(descEditorContainer)
  column1.append(descriptionControlsContainer)

  const column2 = $('<div class="column"></div>')

  const preCodeControlsContainer = $('<div class="fieldset"></div>')
  preCodeControlsContainer.append('<label>Pre Code</label>')

  const preEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-pre-code"/>')
  const preEditorId = createEditor(
    preEditorContainer,
    { value: test && test.initcode ? test.initcode : '' },
    'Code prepended before student code',
  )
  preEditorContainer.data('editor-id', preEditorId)

  preCodeControlsContainer.append(preEditorContainer)
  column2.append(preCodeControlsContainer)

  const postCodeControlsContainer = $('<div class="fieldset"></div>')
  postCodeControlsContainer.append('<label>Post Code</label>')

  const postEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-post-code"/>')
  const postEditorId = createEditor(
    postEditorContainer,
    { value: test && test.code ? test.code : '' },
    'Code appended after student code',
  )
  postEditorContainer.data('editor-id', postEditorId)

  postCodeControlsContainer.append(postEditorContainer)
  column2.append(postCodeControlsContainer)

  testInfoContainer.append(column1)
  testInfoContainer.append(column2)
  testContainer.append(testInfoContainer)
  return testContainer
}

const renderVariableCheckGrader = (
  showHint: boolean,
  options?: ParsonsOptions,
  additionalGraderClass?: string,
): Cash => {
  const classes: string[] = [
    'grader-form-container',
    'variable-check-grader-container',
    additionalGraderClass || '',
  ]
  const graderFormContainer = $(`<div class="${classes.join(' ')}"></div>`)

  const hint: string = showHint ? '<span class="grader-hint">This Grader only supports Python. For other languages, '
      + 'try the Language Translation Grader.</span>' : ''
  graderFormContainer.append(
    `<div class="add-test-container"><a id="add-test" class="btn btn--primary">New Test</a>${hint}</div>`,
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

  const codePrependControlsContainer: Cash = $('<div class="code-prepend-controls-container fieldset"></div>')
  codePrependControlsContainer.append('<label for="code-prepend">Code prepended before student code</label>')

  const editorContainer: Cash = $('<div class="additional-code-editor code-editor-container" id="code-prepend" />')
  const editorId = createEditor(
    editorContainer,
    { value: code || '' },
    'Code prepended before student code',
  )
  editorContainer.data('editor-id', editorId)

  codePrependControlsContainer.append(editorContainer)
  codePrependContainer.append(codePrependControlsContainer)

  return codePrependContainer
}

export const renderUnitTest = (test?: UnitTest | undefined): Cash => {
  const testContainer: Cash = $('<li class="test-container"></li>')
  $(testContainer).data('test-name', test ? test.name : '')

  const actionsContainer = $('<div class="action-container"></div>')
  actionsContainer.append('<a class="btn action duplicate">clone</a>')
  actionsContainer.append('<a class="btn action remove">remove</a>')
  testContainer.append(actionsContainer)

  const testInfoContainer = $('<div class="test-info-container"></div>')
  const column1 = $('<div class="column"></div>')

  const methodsContainer = $('<div class="fieldset"></div>')
  methodsContainer.append('<label>Method Call(s)*</label>')

  const methodCall = test ? test.assertEquals.methodCall : ''

  const methodCallEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-method-call"/>')
  const methodCallEditorId = createEditor(
    methodCallEditorContainer,
    { value: methodCall },
    'Write method call with arguments',
  )
  methodCallEditorContainer.data('editor-id', methodCallEditorId)

  methodsContainer.append(methodCallEditorContainer)
  column1.append(methodsContainer)

  const messageContainer = $('<div class="fieldset"></div>')
  messageContainer.append('<label>Error Message (optional)</label>')
  const errorMessage = test && test.assertEquals.errorMessage ? test.assertEquals.errorMessage : ''

  const messageEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-error-message"/>')
  const messageCallEditorId = createEditor(
    messageEditorContainer,
    { value: errorMessage },
    'What student sees if this test fails',
  )
  messageEditorContainer.data('editor-id', messageCallEditorId)

  messageContainer.append(messageEditorContainer)
  column1.append(messageContainer)

  const column2 = $('<div class="column"></div>')

  const expectedOutputContainer = $('<div class="fieldset"></div>')
  expectedOutputContainer.append('<label>Expected Output(s)*</label>')
  const expectedOutput = test ? test.assertEquals.expectedOutput : ''

  const expectedEditorContainer: Cash = $('<div class="test-param-editor code-editor-container js-expected-output"/>')
  const expectedEditorId = createEditor(
    expectedEditorContainer,
    { value: expectedOutput },
    'Expected output of method call',
  )
  expectedEditorContainer.data('editor-id', expectedEditorId)

  expectedOutputContainer.append(expectedEditorContainer)
  column2.append(expectedOutputContainer)

  testInfoContainer.append(column1)
  testInfoContainer.append(column2)
  testContainer.append(testInfoContainer)
  return testContainer
}

const renderUnitTestGrader = (options?: ParsonsOptions): Cash => {
  const graderFormContainer = $('<div class="grader-form-container unit-test-grader-container"></div>')

  graderFormContainer.append(renderUnitTestCodePrepend(options ? options.unittest_code_prepend : ''))

  const tests: UnitTest[] | null = options ? convertUnitTestsFromString(options.unittests) : null

  graderFormContainer.append(
    '<div class="add-test-container">'
    + '<a id="add-test" class="btn btn--primary">New Test</a>'
    + '<span class="grader-hint">This Grader only supports Python.</span>'
    + '</div>',
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

const renderProgrammingLang = (grader: ParsonsGrader, lang?: string): Cash => {
  const programmingLangContainer: Cash = $('<div class="programming-lang-container fieldset"></div>')

  const labelSuffix = grader === ParsonsGrader.Turtle ? '(if solution code above is not python)' : ''
  programmingLangContainer.append(`<label for="programming-lang">Programming Language ${labelSuffix}</label>`)
  const programmingLangSelect: Cash = $('<select id="programming-lang"></select>')
  programmingLangSelect.append('<option value="pseudo">pseudocode</option>')
  programmingLangSelect.append('<option value="java">java</option>')

  if (lang) {
    programmingLangSelect.val(lang)
  }
  programmingLangContainer.append(programmingLangSelect)

  return programmingLangContainer
}

const renderExecutableCode = (grader: ParsonsGrader, code?: string): Cash => {
  const executableCodeContainer: Cash = $('<div class="executable-code-container"></div>')

  const executableCodeControlsContainer: Cash = $('<div class="executable-code-controls-container fieldset"></div>')
  const labelSuffix = grader === ParsonsGrader.Turtle ? '(if solution code above is not python)' : ''
  executableCodeControlsContainer.append(`<label for="executable-code">Executable code ${labelSuffix}</label>`)

  const editorContainer: Cash = $('<div class="additional-code-editor code-editor-container" id="executable-code" />')
  const placeholderSuffix = grader === ParsonsGrader.Turtle ? '\nimport turtle\n'
    + 'myTurtle = turtle.Turtle() -- are done for you' : ''
  const editorId = createEditor(
    editorContainer,
    { value: code || '' },
    `Executable Python code to map to solution blocks${placeholderSuffix}`,
  )
  editorContainer.data('editor-id', editorId)

  executableCodeControlsContainer.append(editorContainer)
  executableCodeContainer.append(executableCodeControlsContainer)

  return executableCodeContainer
}

const renderTurtleModelCode = (code?: string): Cash => {
  const turtleModelCodeContainer: Cash = $('<div class="turtle-model-code-container"></div>')

  const turtleModelCodeControlsContainer: Cash = $('<div class="turtle-model-code-controls-container fieldset"></div>')
  turtleModelCodeControlsContainer.append(
    '<label for="turtle-model-code">Turtle Model Code ('
    + 'Uses <a href="https://docs.python.org/3.3/library/turtle.html" target="_blank">Python turtle library</a>'
    + ')</label>',
  )

  const editorContainer: Cash = $('<div class="additional-code-editor code-editor-container" id="turtle-model-code" />')
  const editorId = createEditor(
    editorContainer,
    { value: code || '' },
    'import turtle\nmodelTurtle = turtle.Turtle() -- are done for you',
  )
  editorContainer.data('editor-id', editorId)

  turtleModelCodeControlsContainer.append(editorContainer)
  turtleModelCodeContainer.append(turtleModelCodeControlsContainer)

  // createEditor(taCode)

  return turtleModelCodeContainer
}

const renderLanguageTranslationGrader = (options?: ParsonsOptions): Cash => {
  const grader: Cash = renderVariableCheckGrader(false, options, 'language-translation-grader-container')
  grader.prepend(renderExecutableCode(ParsonsGrader.LanguageTranslation, options ? options.executable_code : ''))
  grader.prepend(renderProgrammingLang(ParsonsGrader.LanguageTranslation, options ? options.programmingLang : ''))
  return grader
}

const renderTurtleGrader = (options?: ParsonsOptions): Cash => {
  const graderFormContainer = $('<div class="grader-form-container turtle-grader-container"></div>')

  const executableOptionsContainer: Cash = $('<div class="executable-options-container"></div>')

  const generateBtnContainer: Cash = $('<div class="generate-btn-container"></div>')
  generateBtnContainer.append(
    '<div class="generate-btn-hint">'
    + 'Use executable code (or if not specified, solution code) to generate modelTurtle code</div>',
  )
  generateBtnContainer.append(
    '<a id="generate-model-turtle" class="btn btn--primary">Generate<br/>modelTurtle Code</a>',
  )
  executableOptionsContainer.append(generateBtnContainer)

  const codeProgrammingLanguageContainer: Cash = $('<div class="code-programming-language-container"></div>')
  codeProgrammingLanguageContainer
    .append(renderProgrammingLang(ParsonsGrader.Turtle, options ? options.programmingLang : ''))
  codeProgrammingLanguageContainer
    .append(renderExecutableCode(ParsonsGrader.Turtle, options ? options.executable_code : ''))
  executableOptionsContainer.append(codeProgrammingLanguageContainer)

  graderFormContainer.append(executableOptionsContainer)
  graderFormContainer.append(renderTurtleModelCode(options ? options.turtleModelCode : ''))

  return graderFormContainer
}

const renderGraderForm = (container: Cash, grader: ParsonsGrader, options?: ParsonsOptions): void => {
  container.closest('.ParsonsUI').removeClass()
    .addClass(`ParsonsUI ${grader.toString().replace('ParsonsWidget._graders.', '')}`)
  container.find('.grader-form-container').remove()

  switch (grader) {
    case ParsonsGrader.VariableCheck:
      container.append(renderVariableCheckGrader(true, options))
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

  const codeBlocks: CodeBlocks = getCodeBlocks(settings.initial)

  uiContainer.append(renderInitialCodeBlock(codeBlocks.codeBlocks))
  uiContainer.append(renderDistractorBlocks(codeBlocks.distractorBlocks, settings.options.max_wrong_lines))
  uiContainer.append(renderCommonSettings(!!codeBlocks.distractorBlocks, settings.options))

  renderGraderForm(uiContainer, convertParsonsGraderFuncToEnum(settings.options.grader), settings.options)

  container.append(uiContainer)
}

export default {
  render,
}
