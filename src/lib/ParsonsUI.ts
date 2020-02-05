import $, { Cash } from 'cash-dom'

import * as render from './render'

export default class ParsonsUI {
  private readonly initialSettings: ParsonsSettings

  private readonly container: Cash

  constructor(selector: string, settings: ParsonsSettings) {
    this.initialSettings = settings
    this.container = $(selector)

    this.render()
  }

  private render(): void {
    render.render(this.container, this.initialSettings)
  }

  export(): ParsonsSettings {
    return this.initialSettings
  }
}
