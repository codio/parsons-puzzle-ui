import $, { Cash } from 'cash-dom';

const renderInitialCodeBlock = (code: string): Cash => {
  const codeBlocksContainer = $('<div class="code-blocks-container"></div>');

  // todo remove distractors from code
  const taContainer = $('<div class="code-blocks-ta-container"></div>');
  taContainer.append('<label for="initial">Code to Become Blocks</label>');
  taContainer.append(`<textarea id="initial" rows="4">${code}</textarea>`);
  codeBlocksContainer.append(taContainer);

  const hintText = '$$toggle::value1::value2::valuen$$&nbsp;&nbsp;&nbsp;&nbsp; new line \\n in same block';
  codeBlocksContainer.append(`<div class="code-blocks-hint">${hintText}</div>`);

  return codeBlocksContainer;
};

const renderDistractorBlocks = (settings: ParsonsSettings): Cash => {
  const distractorBlockContainer = $('<div class="distractor-blocks-container"></div>');

  const taContainer = $('<div class="distractor-blocks-ta-container"></div>');
  // todo extract distractors from code
  const distractors = settings.initial;
  taContainer.append('<label for="distractors">Code to Become Distractor Blocks</label>');
  taContainer.append(`<textarea id="distractors" rows="4">${distractors}</textarea>`);
  distractorBlockContainer.append(taContainer);

  const maxDistractorsContainer = $('<div class="distractor-blocks-max-container"></div>');
  maxDistractorsContainer.append('<label for="max-distractors">Code to Become Distractor Blocks</label>');
  maxDistractorsContainer.append(`<input id="max-distractors" type="number" value="${distractors}" />`);
  distractorBlockContainer.append(maxDistractorsContainer);

  return distractorBlockContainer;
};

const renderCommonSettings = (setting: ParsonsSettings): Cash => {
  const commonSettingsContainer = $('<div class="common-settings-container"></div>');
  return commonSettingsContainer;
};

export const render = (container: Cash, settings: ParsonsSettings): void => {
  container.empty();

  const uiContainer: Cash = $('<div class="ParsonsUI"></div>');

  uiContainer.append(renderInitialCodeBlock(settings.initial));
  uiContainer.append(renderDistractorBlocks(settings));
  uiContainer.append(renderCommonSettings(settings));

  container.append(uiContainer);
};

export default render;
