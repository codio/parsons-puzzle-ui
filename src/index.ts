import ParsonsUI from './lib/ParsonsUI'

export function build (selector: string, jsonData: object): ParsonsUI {
  return new ParsonsUI(selector, jsonData)
}