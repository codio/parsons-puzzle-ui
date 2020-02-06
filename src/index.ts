import ParsonsUI from './lib/ParsonsUI'
import { ParsonsSettings } from './@types/ParsonsSettingsInterface'
import './style.less'

export const build = (selector: string, settings: ParsonsSettings): ParsonsUI => new ParsonsUI(selector, settings)

export default build
