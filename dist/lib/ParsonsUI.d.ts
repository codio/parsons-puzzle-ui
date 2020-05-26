import { ParsonsSettings } from '../@types/types';
declare class ParsonsUI {
    private readonly initialSettings;
    private readonly container;
    constructor(selector: string, initialSettings: ParsonsSettings);
    private render;
    private bindEvents;
    export(): ParsonsSettings;
}
export { ParsonsUI };
export default ParsonsUI;
//# sourceMappingURL=ParsonsUI.d.ts.map