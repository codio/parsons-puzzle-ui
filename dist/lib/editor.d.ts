import { Cash } from 'cash-dom';
export interface HTMLElementWithCodeMirror extends HTMLElement {
    CodeMirror?: any;
}
export declare const setValueToEditor: (el: Cash, value: string) => void;
export declare const getValueFromEditor: (el: Cash) => string;
export declare const tryToCreateEditorFromTextarea: (ta: Cash) => void;
export declare const bindEventToEditor: (el: Cash, event: string, callback: () => void) => void;
//# sourceMappingURL=editor.d.ts.map