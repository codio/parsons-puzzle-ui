declare class ContentWidget implements monaco.editor.IContentWidget {
    private text;
    private fontSize;
    private lineHeight;
    private domNode;
    constructor(text: string, fontSize: number, lineHeight: number);
    getId(): string;
    getDomNode(): HTMLElement;
    getPosition(): monaco.editor.IContentWidgetPosition;
}
export default ContentWidget;
//# sourceMappingURL=content-widget.d.ts.map