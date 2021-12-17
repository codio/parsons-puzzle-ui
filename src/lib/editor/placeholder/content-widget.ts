class ContentWidget implements monaco.editor.IContentWidget {
  private domNode: HTMLElement | undefined

  constructor(private text: string, private fontSize: number, private lineHeight: number) {}

  getId(): string {
    return 'monaco.editor.placeholder'
  }

  getDomNode(): HTMLElement {
    if (!this.domNode) {
      this.domNode = document.createElement('div')
      this.domNode.style.width = 'max-content'
      this.domNode.style.pointerEvents = 'none'
      this.domNode.style.opacity = '0.5'
      this.domNode.style.fontSize = `${this.fontSize}px`
      this.domNode.style.lineHeight = `${this.lineHeight}px`
      this.domNode.innerHTML = this.text
    }
    return this.domNode
  }

  getPosition(): monaco.editor.IContentWidgetPosition {
    return {
      position: { lineNumber: 1, column: 1 },
      preference: [0],
    }
  }
}

export default ContentWidget
