import ParsonsUI from './lib/ParsonsUI';

export const build = (selector: string, settings: ParsonsSettings): ParsonsUI => new ParsonsUI(selector, settings);

export default build;
