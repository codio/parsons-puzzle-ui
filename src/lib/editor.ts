// eslint-disable-next-line
/// <reference path="../@custom-types/monaco.d.ts" />
import $, { Cash } from 'cash-dom'

import { Dictionary } from '../@types/types'

declare global {
  interface Window {
    monaco: typeof monaco
  }
}

const editorCache: Dictionary<monaco.editor.IStandaloneCodeEditor> = {}

const defaultMonacoOptions = {
  automaticLayout: true,
  fontSize: 12,
  minimap: { enabled: false },
  quickSuggestions: {
    other: false,
    comments: false,
    strings: false,
  },
  parameterHints: {
    enabled: false,
  },
  suggestOnTriggerCharacters: false,
  acceptSuggestionOnEnter: 'off',
  tabCompletion: 'off',
  wordBasedSuggestions: false,
}

export const setValueToEditor = (el: Cash, value: string): void => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const editor = editorCache[editorId]
    editor.setValue(value)
  } else {
    el.find('textarea').val(value)
  }
}

export const getValueFromEditor = (el: Cash): string => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const editor = editorCache[editorId]
    return editor.getValue()
  }
  return el.find('textarea').val() as string
}

export const createEditor = (
  container: Cash,
  options: monaco.editor.IStandaloneEditorConstructionOptions,
): string | null => {
  if (window.monaco) {
    const optionsToApply = { ...options, ...defaultMonacoOptions }

    const editor: monaco.editor.IStandaloneCodeEditor = window.monaco.editor.create(
      container.get(0) as HTMLElement,
      optionsToApply as monaco.editor.IStandaloneEditorConstructionOptions,
    )
    setTimeout(() => { editor.layout() }, 0)
    editorCache[editor.getId()] = editor
    return editor.getId()
  }
  container.append($(`<textarea class="editor-ta">${options.value || ''}</textarea>`))
  return null
}

export const bindChangeEventToEditor = (el: Cash, callback: () => void): void => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const editor = editorCache[editorId]
    editor.onDidChangeModelContent(callback)
  } else {
    el.on('change', callback)
  }
}
