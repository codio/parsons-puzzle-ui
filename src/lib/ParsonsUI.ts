import $, { Cash } from 'cash-dom'
import { ParsonsSettings, ParsonsGrader } from '../@types/types'
import * as render from './render'
import {
  collectData, collectUnitTest, collectVariableTest
} from './data-helper'
import { setValueToEditor, getValueFromEditor, bindEventToEditor } from './editor'

class ParsonsUI {
  private readonly container: Cash

  constructor(selector: string, private readonly initialSettings: ParsonsSettings) {
    this.container = $(selector)
    this.render()
    this.bindEvents()
  }

  private render(): void {
    render.render(this.container, this.initialSettings)
  }

  private updateRequireDragging(): void {
    const distractorsTa: Cash = this.container.find('#distractors')
    const hasDistractors = /.*?[^\s]/.test(getValueFromEditor(distractorsTa))
    const maxDistractors: number = parseInt(this.container.find('#max-distractors').val() as string, 10)
    const maxDistractorsVal: number = !Number.isNaN(maxDistractors) ? maxDistractors : 10
    if (hasDistractors && maxDistractorsVal > 0) {
      this.container.find('#require-dragging').prop('checked', true)
    }
  }

  private bindEvents(): void {
    this.container.on('change', '#grader', (event: Event) => {
      event.preventDefault()
      const grader: string = ($(event.currentTarget as HTMLElement).val() as string)
      render.renderGrader(this.container, grader as ParsonsGrader)
    })
    this.container.on('click', '#add-test', (event: Event) => {
      event.preventDefault()
      const graderContainer: Cash = $(event.currentTarget as HTMLElement).closest('.grader-form-container')
      const isVarTests: boolean = graderContainer.hasClass('variable-check-grader-container')
      const testList: Cash = graderContainer.find('.tests-list')
      testList.append(isVarTests ? render.renderVarTest() : render.renderUnitTest())
    })
    this.container.on('click', '.action.duplicate', (event: Event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      const $this = $(event.currentTarget as HTMLElement)
      const isUnitTest = $this.closest('.grader-form-container').hasClass('unit-test-grader-container')
      const currentTest: Cash = $(event.currentTarget as HTMLElement).closest('.test-container')
      if (isUnitTest) {
        render.renderUnitTest(collectUnitTest(currentTest)).insertAfter(currentTest)
      } else {
        render.renderVarTest(collectVariableTest(currentTest)).insertAfter(currentTest)
      }
    })
    this.container.on('click', '.action.remove', (event: Event) => {
      event.preventDefault()
      $(event.currentTarget as HTMLElement).closest('.test-container').remove()
    })
    this.container.on('change', '#disable-indent', (event: Event) => {
      event.preventDefault()
      const $this: Cash = $(event.currentTarget as HTMLElement)
      const isIndentingDisabled: boolean = $this.is(':checked')
      const commonSettingsContainer: Cash = $this.closest('.common-settings-container')
      if (isIndentingDisabled) {
        commonSettingsContainer.find('#indent-size').attr('disabled', 'disabled')
      } else {
        commonSettingsContainer.find('#indent-size').removeAttr('disabled')
      }
    })
    this.container.on('click', '#generate-model-turtle', (event: Event) => {
      event.preventDefault()

      const solutionCode = getValueFromEditor(this.container.find('#initial'))
      const executableCode = getValueFromEditor(this.container.find('#executable-code'))

      const code = executableCode || solutionCode
      setValueToEditor(this.container.find('#turtle-model-code'), code.replace(/myTurtle/g, 'modelTurtle'))
    })
    this.container.on('change', '#max-distractors', (event: Event) => {
      event.preventDefault()
      this.updateRequireDragging()
    })
    const distractorsTa: Cash = this.container.find('#distractors')
    bindEventToEditor(distractorsTa, 'change', () => {
      this.updateRequireDragging()
    })
    this.container.on('click', '#require-dragging', (event: Event) => {
      event.stopPropagation()
      const hasDistractors = /.*?[^\s]/.test(getValueFromEditor(distractorsTa))
      const isDraggingChecked = this.container.find('#require-dragging').is(':checked')
      const maxDistractors: number = parseInt(this.container.find('#max-distractors').val() as string, 10)
      const maxDistractorsVal: number = !Number.isNaN(maxDistractors) ? maxDistractors : 10
      if (hasDistractors && !isDraggingChecked && maxDistractorsVal > 0) {
        alert('Dragging is needed to make this solvable')
      }
    })
  }

  export(): ParsonsSettings {
    return collectData(this.container, this.initialSettings.options)
  }
}

export { ParsonsUI }
export default ParsonsUI
