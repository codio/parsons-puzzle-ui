import $, { Cash } from 'cash-dom'

import * as render from './render'
import { ParsonsSettings } from '../@types/ParsonsSettingsInterface'
import ParsonsGrader from '../@types/GraderEnum'

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
      const grader: string | string[] = $(event.currentTarget as HTMLElement).val()
      render.renderGrader(this.container, grader as ParsonsGrader)
    })
  }

  export(): ParsonsSettings {
    return this.initialSettings
  }
}
