import {Cash} from 'cash-dom'
import {ParsonsGrader, ParsonsOptions, ParsonsSettings} from '../@types/types'

interface CommonSettings {
  initial: string;
  maxDistractors: number;
  grader: ParsonsGrader;
  requireDragging: boolean;
  indenting: boolean;
  indentSize: number;
  execTime: number;
}

const collectCommonSettings = (container: Cash): CommonSettings => {
  // const codeBlocks: string = container.find('#initial').val()
  // const distractors: string = container.find('#distractors').val()
  // const max

  const commonSettings: CommonSettings = {
    execTime: 0,
    grader: ParsonsGrader.Turtle,
    indenting: true,
    indentSize: 50,
    initial: '',
    maxDistractors: 1,
    requireDragging: true
  }
  return commonSettings
}

export const collectData = (container: Cash, initialOptions: ParsonsOptions): ParsonsSettings => {
  const common: CommonSettings = collectCommonSettings(container)

  const options: ParsonsOptions = {
    sortableId: initialOptions.sortableId || 'sortable',
    max_wrong_lines: common.maxDistractors,
    exec_limit: common.execTime,
    can_indent: common.indenting,
    x_indent: common.indentSize,
    lang: 'en',

  }
  if (common.requireDragging) {
    options.trashId = initialOptions.trashId || 'sortableTrash'
  }

  return {
    initial: common.initial,
    options
  }
}

export default {
  collectData
}
