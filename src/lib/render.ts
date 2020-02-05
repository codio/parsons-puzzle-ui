import $, { Cash } from 'cash-dom'
import { convertParsonsGraderFuncToEnum, convertTestVariablesToString } from './converters'

const renderInitialCodeBlock = (code: string): Cash => {
  const codeBlocksContainer: Cash = $('<div class="code-blocks-container"></div>')

  // todo remove distractors from code
  const taContainer: Cash = $('<div class="code-blocks-ta-container"></div>')
  taContainer.append('<label for="initial">Code to Become Blocks</label>')
  taContainer.append(`<textarea id="initial" rows="4">${code}</textarea>`)
  codeBlocksContainer.append(taContainer)

  const hintText = '$$toggle::value1::value2::valuen$$&nbsp;&nbsp;&nbsp;&nbsp; new line \\n in same block'
  codeBlocksContainer.append(`<div class="code-blocks-hint">${hintText}</div>`)

  return codeBlocksContainer
}

const renderDistractorBlocks = (settings: ParsonsSettings): Cash => {
  const distractorBlockContainer: Cash = $('<div class="distractor-blocks-container"></div>')

  const taContainer: Cash = $('<div class="distractor-blocks-ta-container"></div>')
  // todo extract distractors from code
  const distractors: string = settings.initial
  taContainer.append('<label for="distractors">Code to Become Distractor Blocks</label>')
  taContainer.append(`<textarea id="distractors" rows="4">${distractors}</textarea>`)
  distractorBlockContainer.append(taContainer)

  const maxDistractorsContainer: Cash = $('<div class="distractor-blocks-max-container"></div>')
  maxDistractorsContainer.append('<label for="max-distractors">Code to Become Distractor Blocks</label>')
  maxDistractorsContainer.append(`<input id="max-distractors" type="number" value="${distractors}" />`)
  distractorBlockContainer.append(maxDistractorsContainer)

  return distractorBlockContainer
}

const renderGraderSelect = (grader?: (() => void) | undefined): Cash => {
  const graderContainer: Cash = $('<div class="grader-container"></div>')

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
  const draggingContainer: Cash = $('<div class="dragging-container"></div>')

  draggingContainer.append('<label for="require-dragging">Require dragging?</label>')
  draggingContainer.append(`<input id="require-dragging" type="checkbox" ${trashId ? 'checked' : ''} />`)

  return draggingContainer
}

const renderIndenting = (canIndent?: boolean): Cash => {
  const indentingContainer: Cash = $('<div class="indenting-container"></div>')

  indentingContainer.append('<label for="can-indent">Require dragging?</label>')
  indentingContainer.append(`<input id="can-indent" type="checkbox" ${canIndent ? 'checked' : ''} />`)

  return indentingContainer
}

const renderIndentSize = (xIndent?: number): Cash => {
  const indentSizeContainer: Cash = $('<div class="indent-size-container"></div>')

  indentSizeContainer.append('<label for="indent-size">Indent Size</label>')
  indentSizeContainer.append(`<input id="indent-size" type="text" value="${xIndent !== undefined ? xIndent : 50}" />`)

  return indentSizeContainer
}

const renderExecLimit = (execLimit?: number): Cash => {
  const draggingContainer: Cash = $('<div class="exec-limit-container"></div>')

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
  // todo render exec_limit only if needed
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

  const variablesContainer = $('<div></div>')
  variablesContainer.append('<label>Expected variable values*</label>')
  const taVariables = $(
    `<textarea rows="2" name="variables">${test ? convertTestVariablesToString(test.variables) : ''}</textarea>`
  )
  taVariables.attr('placeholder', '&quot;var_Name_1&quot;: value&#x0a;&quot;var_Name_2&quot;: value')
  variablesContainer.append(taVariables)
  column1.append(variablesContainer)

  const descriptionContainer = $('<div></div>')
  descriptionContainer.append('<label>Test Description*</label>')
  const taDescription = $(
    `<textarea rows="2" name="variables">${test ? test.message : ''}</textarea>`
  )
  descriptionContainer.append(taDescription)

  testInfoContainer.append(column1)
  testContainer.append(testInfoContainer)
  return testContainer
}

const renderVariableCheckGrader = (options?: ParsonsOptions): Cash => {
  const graderContainer = $('<div class="grader-container variable-check-grader-container"></div>')

  graderContainer.append('<div class="add-test-container"><button id="add-test" type="button">New Test</button></div>')
  const testsContainer: Cash = $('<div class="tests-container"></div>')
  const testsList: Cash = $('<ul class="tests-list"></ul>')

  if (options && options.vartests) {
    options.vartests.forEach((test: VariableTest) => testsList.append(renderVarTest(test)))
  } else {
    testsList.append(renderVarTest())
  }
  testsContainer.append(testsList)
  graderContainer.append(testsContainer)

  return graderContainer
}

export const renderGrader = (container: Cash, grader: ParsonsGrader, options?: ParsonsOptions): void => {
  container.remove('.grader-container')

  switch (grader) {
    case ParsonsGrader.VariableCheck:
      container.append(renderVariableCheckGrader(options))
      break
    default:
      break
  }
}

export const render = (container: Cash, settings: ParsonsSettings): void => {
  container.empty()

  const uiContainer: Cash = $('<div class="ParsonsUI"></div>')

  uiContainer.append(renderInitialCodeBlock(settings.initial))
  uiContainer.append(renderDistractorBlocks(settings))
  uiContainer.append(renderCommonSettings(settings.options))

  renderGrader(uiContainer, ParsonsGrader.LineBased, settings.options)

  container.append(uiContainer)
}

export default {
  render,
  renderGrader
}
