/// <reference path="../../src/@custom-types/monaco.d.ts" />
import { Cash } from 'cash-dom';
declare global {
    interface Window {
        monaco: typeof monaco;
    }
}
export declare const setValueToEditor: (el: Cash, value: string) => void;
export declare const getValueFromEditor: (el: Cash) => string;
export declare const createEditor: (container: Cash, options: monaco.editor.IStandaloneEditorConstructionOptions) => string | null;
export declare const bindChangeEventToEditor: (el: Cash, callback: () => void) => void;
//# sourceMappingURL=editor.d.ts.map