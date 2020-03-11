import $, { Cash } from 'cash-dom'
import { ParsonsSettings, ParsonsGrader } from '../@types/types'
import * as render from './render'
import {
  collectData, collectUnitTest, collectVariableTest, getValueFromEditor
} from './data-helper'

export default class ParsonsUI {
  private readonly container: Cash

  constructor(selector: string, private readonly initialSettings: ParsonsSettings) {
    this.container = $(selector)
    this.render()
    this.bindEvents()
  }

  private render(): void {
    render.render(this.container, this.initialSettings)
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
    this.container.on('change', '#can-indent', (event: Event) => {
      event.preventDefault()
      const $this: Cash = $(event.currentTarget as HTMLElement)
      const isIndentingEnabled: boolean = $this.is(':checked')
      const commonSettingsContainer: Cash = $this.closest('.common-settings-container')
      if (isIndentingEnabled) {
        commonSettingsContainer.find('#indent-size').removeAttr('disabled')
      } else {
        commonSettingsContainer.find('#indent-size').attr('disabled', 'disabled')
      }
    })
    this.container.on('click', '#require-dragging', (event: Event) => {
      event.stopPropagation()
      const distractorsTa: Cash = this.container.find('#distractors')
      const hasDistractors = /.*?[^\s]/.test(getValueFromEditor(distractorsTa))
      const isDraggingChecked = this.container.find('#require-dragging').is(':checked')
      if (hasDistractors && !isDraggingChecked) {
        alert('Dragging is necessary to work distractors')
      }
    })
  }

  export(): ParsonsSettings {
    return collectData(this.container, this.initialSettings.options)
  }
}
