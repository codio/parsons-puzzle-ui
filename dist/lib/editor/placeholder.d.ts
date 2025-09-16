declare class MonacoPlaceholder {
    private editor;
    private text;
    private toDispose;
    private widget;
    constructor(editor: monaco.editor.IStandaloneCodeEditor, text: string);
    private redrawPlaceholder;
    private addPlaceholder;
    private removePlaceholder;
    setText(text: string): void;
    dispose(): void;
}
export default MonacoPlaceholder;
//# sourceMappingURL=placeholder.d.ts.map