import { Cash } from 'cash-dom'
/* eslint-disable */
declare const CodeMirror: any

export interface HTMLElementWithCodeMirror extends HTMLElement {
  CodeMirror?: any;
}

export const setValueToEditor = (el: Cash, value: string): void => {
  const codeMirrorEl: HTMLElementWithCodeMirror = el.siblings('.CodeMirror').get(0) as HTMLElement
  if (codeMirrorEl && codeMirrorEl.CodeMirror) {
    codeMirrorEl.CodeMirror.setValue(value)
  }
}

export const getValueFromEditor = (el: Cash): string => {
  const codeMirrorEl: HTMLElementWithCodeMirror = el.siblings('.CodeMirror').get(0) as HTMLElement
  if (codeMirrorEl && codeMirrorEl.CodeMirror) {
    return codeMirrorEl.CodeMirror.getValue()
  }
  return (el.val() as string)
}

export const tryToCreateEditorFromTextarea = (ta: Cash): void => {
  try {
    const editor = CodeMirror.fromTextArea(ta.get(0) as HTMLTextAreaElement, { lineNumbers: true })
    setTimeout(() => { editor.refresh() }, 0)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export const bindEventToEditor = (el: Cash, event: string, callback: () => void): void => {
  const codeMirrorEl: HTMLElementWithCodeMirror = el.siblings('.CodeMirror').get(0) as HTMLElement
  if (codeMirrorEl && codeMirrorEl.CodeMirror) {
    // @ts-ignore
    codeMirrorEl.CodeMirror.on(event, callback)
  }
  el.on(event, callback)
}
/* eslint-enable */
