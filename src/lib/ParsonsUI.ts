import $, { Cash } from 'cash-dom'

import * as render from './render'
import { ParsonsSettings } from '../@types/ParsonsSettingsInterface'

export default class ParsonsUI {
  private readonly container: Cash

  constructor(selector: string, private readonly initialSettings: ParsonsSettings) {
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
