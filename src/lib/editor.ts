// eslint-disable-next-line
/// <reference path="../@custom-types/monaco.d.ts" />
import $, { Cash } from 'cash-dom'

import { Dictionary } from '../@types/types'
import MonacoPlaceholder from './editor/placeholder'

declare global {
  interface Window {
    monaco: typeof monaco
  }
}

interface IEditorCacheItem {
  editor: monaco.editor.IStandaloneCodeEditor,
  placeholder: MonacoPlaceholder
}

const editorCache: Dictionary<IEditorCacheItem> = {}

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
    const { editor } = editorCache[editorId]
    editor.setValue(value)
  } else {
    el.find('textarea').val(value)
  }
}

export const getValueFromEditor = (el: Cash): string => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const { editor } = editorCache[editorId]
    return editor.getValue()
  }
  return el.find('textarea').val() as string
}

export const createEditor = (
  container: Cash,
  options: monaco.editor.IStandaloneEditorConstructionOptions,
  placeholder?: string,
): string | null => {
  if (window.monaco) {
    const optionsToApply = { ...options, ...defaultMonacoOptions }

    const editor: monaco.editor.IStandaloneCodeEditor = window.monaco.editor.create(
      container.get(0) as HTMLElement,
      optionsToApply as monaco.editor.IStandaloneEditorConstructionOptions,
    )
    const editorPlaceholder = new MonacoPlaceholder(editor, placeholder || '')
    setTimeout(() => { editor.layout() }, 0)
    editorCache[editor.getId()] = { editor, placeholder: editorPlaceholder }
    return editor.getId()
  }
  const ta: Cash = $(`<textarea class="editor-ta">${options.value || ''}</textarea>`)
  placeholder && ta.attr('placeholder', placeholder)
  container.append(ta)
  return null
}

export const destroyEditor = (el: Cash): void => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const cacheItem: IEditorCacheItem = editorCache[editorId]
    cacheItem.editor.dispose()
    cacheItem.placeholder.dispose()
    delete editorCache[editorId]
  }
}

export const bindChangeEventToEditor = (el: Cash, callback: () => void): void => {
  const editorId = el.data('editor-id') as string
  if (editorId) {
    const { editor } = editorCache[editorId]
    editor.onDidChangeModelContent(callback)
  } else {
    el.on('change', callback)
  }
}
