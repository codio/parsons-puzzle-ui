import $, { Cash } from 'cash-dom'

import { convertParsonsGraderFuncToEnum, convertTestVariablesToString } from './converters'
import { ParsonsOptions, ParsonsSettings, VariableTest } from '../@types/ParsonsSettingsInterface'
import ParsonsGrader from '../@types/GraderEnum'

const renderInitialCodeBlock = (code: string): Cash => {
  const codeBlocksContainer: Cash = $('<div class="code-blocks-container"></div>')

  // todo remove distractors from code
  const taContainer: Cash = $('<div class="code-blocks-ta-container fieldset"></div>')
  taContainer.append('<label for="initial">Code to Become Blocks</label>')
  const taCode: Cash = $(`<textarea id="initial" rows="8">${code}</textarea>`)
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
  // todo extract distractors from code
  const distractors: string = settings.initial
  taContainer.append('<label for="distractors">Code to Become Distractor Blocks</label>')
  const taDistractors: Cash = $(`<textarea id="distractors" rows="4">${distractors}</textarea>`)
  taDistractors.attr('placeholder', 'Code blocks that serve as distractions (incorrect options)')
  taContainer.append(taDistractors)
  distractorBlockContainer.append(taContainer)

  const maxDistractorsContainer: Cash = $('<div class="distractor-blocks-max-container fieldset"></div>')
  maxDistractorsContainer.append('<label for="max-distractors">Max Distractors</label>')
  maxDistractorsContainer.append(`<input id="max-distractors" type="number" value="${distractors}" />`)
  distractorBlockContainer.append(maxDistractorsContainer)

  return distractorBlockContainer
}

const renderGraderSelect = (grader?: (() => void) | undefined): Cash => {
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
  indentingContainer.append(`<input id="can-indent" type="checkbox" ${canIndent ? 'checked' : ''} />`)

  return indentingContainer
}

const renderIndentSize = (xIndent?: number): Cash => {
  const indentSizeContainer: Cash = $('<div class="indent-size-container fieldset"></div>')

  indentSizeContainer.append('<label for="indent-size">Indent Size</label>')
  indentSizeContainer.append(`<input id="indent-size" type="text" value="${xIndent !== undefined ? xIndent : 50}" />`)

  return indentSizeContainer
}

const renderExecLimit = (execLimit?: number): Cash => {
  const draggingContainer: Cash = $('<div class="exec-limit-container fieldset"></div>')

  draggingContainer.append('<label for="exec-limit">Exec Limit</label>')
  draggingContainer.append(
    `<input id="can-indent" type="text" value="${execLimit !== undefined ? execLimit : 2500}" />`
  )

  return draggingContainer
}

const renderCommonSettings = (options: ParsonsOptions): Cash => {
  const commonSettingsContainer: Cash = $('<div class="common-settings-container"></div>')

  commonSettingsContainer.append(renderGraderSelect(options.grader))
  commonSettingsContainer.append(renderRequireDragging(options.trashId))
  commonSettingsContainer.append(renderIndenting(options.can_indent))
  commonSettingsContainer.append(renderIndentSize(options.x_indent))
  commonSettingsContainer.append(renderExecLimit(options.exec_limit))

  return commonSettingsContainer
}

const renderVarTest = (test?: VariableTest | undefined): Cash => {
  const testContainer: Cash = $('<li class="test-container"></li>')

  const actionsContainer = $('<div class="action-container"></div>')
  actionsContainer.append('<button type="button" class="action duplicate">++</button>')
  actionsContainer.append('<button type="button" class="action small remove">-</button>')
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

const renderVariableCheckGrader = (options?: ParsonsOptions): Cash => {
  const graderFormContainer = $('<div class="grader-form-container variable-check-grader-container"></div>')

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

const renderGraderForm = (container: Cash, grader: ParsonsGrader, options?: ParsonsOptions): void => {
  container.closest('.ParsonsUI').removeClass().addClass(`ParsonsUI ${grader.toString()}`)
  container.find('.grader-form-container').remove()

  switch (grader) {
    case ParsonsGrader.VariableCheck:
      container.append(renderVariableCheckGrader(options))
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

  renderGraderForm(uiContainer, ParsonsGrader.LineBased, settings.options)

  container.append(uiContainer)
}

export default {
  render,
  renderGrader
}
