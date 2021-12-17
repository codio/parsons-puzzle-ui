// eslint-disable-next-line
/// <reference path="../../@custom-types/monaco.d.ts" />

import ContentWidget from './placeholder/content-widget'

class MonacoPlaceholder {
  private editor: monaco.editor.IStandaloneCodeEditor | null

  private text: string

  private toDispose: monaco.IDisposable[] | null

  private widget: ContentWidget | null | undefined

  constructor(editor: monaco.editor.IStandaloneCodeEditor, text: string) {
    this.editor = editor
    this.text = text
    this.toDispose = [
      this.editor.onDidChangeModelContent(() => this.redrawPlaceholder()),
      this.editor.onDidChangeConfiguration((e) => {
        if (this.widget && e.hasChanged(monaco.editor.EditorOption.fontInfo)) {
          this.redrawPlaceholder()
        }
      }),
    ]
    this.redrawPlaceholder()
  }

  private redrawPlaceholder() {
    this.removePlaceholder()
    if (!this.editor?.getValue()) {
      this.addPlaceholder()
    }
  }

  private addPlaceholder() {
    if (!this.text) {
      return
    }
    const fontSize = this.editor?.getOption(
      monaco.editor.EditorOption.fontSize,
    )
    const lineHeight = this.editor?.getOption(
      monaco.editor.EditorOption.lineHeight,
    )
    this.widget = new ContentWidget(this.text, fontSize || 15, lineHeight || 18)
    this.editor?.addContentWidget(this.widget)
  }

  private removePlaceholder() {
    this.widget && this.editor?.removeContentWidget(this.widget)
    this.widget = null
  }

  setText(text: string): void {
    this.text = text
    this.redrawPlaceholder()
  }

  dispose(): void {
    this.removePlaceholder()
    if (this.toDispose) {
      this.toDispose.forEach((disposable) => disposable.dispose())
      this.toDispose = null
    }
    this.editor = null
  }
}

export default MonacoPlaceholder
