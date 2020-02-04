import $ from 'cash-dom'

export default class ParsonsUI {
  constructor(selector: string, json: object) {
    const container = $(selector)
    console.log(container)
    console.log(selector)
    console.log(json)
  }

  export(): any {
    return {
      demo: true
    }
  }
}