import React from 'react';
import {
  useBlockStore,
  useConfig,
  useOptions,
  useViewPort,
} from '@/state/useState';
import s from './style.module.less';
import { useSizeWatcher } from '@/hooks/useSizeWatcher';
import { findChangePosition, getCursorPosition, trimCR } from './functions';
import { KeyBoardkeys } from '@/util/constants';

export const EditElement = React.memo(() => {
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const {
    className,
    style,
    onItemSelected,
    onChange,
    onCaretPositionChange,
    onFocus,
    onBlur,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onKeyDown,
    onKeyUp,
  } = useConfig((state) => state);
  const { setPosition, setSize } = useViewPort((state) => state);
  const {
    parentElement,
    text,
    caretPosition,
    dropDown,
    setParantElement,
    updateText,
    updateCaretPosition,
  } = useBlockStore((state) => state);
  const { activeOption, next, prev } = useOptions((state) => state);

  useSizeWatcher(preRef.current, setSize);

  React.useEffect(() => {
    if (!parentElement && preRef.current) {
      setParantElement(preRef.current);
    }
  }, [parentElement]);

  const setReference = React.useCallback((ref: HTMLPreElement | null) => {
    if (ref) {
      setParantElement(ref);
    }
    preRef.current = ref;
  }, []);

  const handleChange = React.useCallback(() => {
    if (onChange) {
      const newText = trimCR(preRef.current?.textContent ?? '');
      const position = findChangePosition(text, newText);
      const pos = getCursorPosition(preRef.current);
      updateCaretPosition(pos);
      updateText(newText);
      onChange(newText, position);
    }
  }, [onChange, updateText]);

  const handleScroll = React.useCallback(() => {
    if (preRef.current) {
      setPosition(preRef.current.scrollTop, preRef.current.scrollLeft);
    }
  }, [setPosition]);

  const handlePaste = React.useCallback((event: React.ClipboardEvent) => {
    if (event.clipboardData.types.includes('text/html')) {
      event.preventDefault();
    }
  }, []);

  const handleCopy = React.useCallback((event: React.ClipboardEvent) => {
    const selection = document.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      if (
        range.startContainer !== range.endContainer ||
        range.startOffset !== range.endOffset
      ) {
        event.clipboardData.setData('text/plain', selection.toString());
        event.preventDefault();
        return;
      }
    }
    if (preRef.current) {
      event.clipboardData.setData(
        'text/plain',
        preRef.current.textContent ?? '',
      );
      event.preventDefault();
    }
  }, []);

  const handleCut = React.useCallback(
    (event: React.ClipboardEvent) => {
      const selection = document.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (
          range.startContainer !== range.endContainer ||
          range.startOffset !== range.endOffset
        ) {
          const cutText = selection.toString();
          event.clipboardData.setData('text/plain', cutText);
          const newText = text.replace(cutText, '');
          updateText(newText);
          if (onChange) {
            const position = findChangePosition(text, newText);
            onChange(newText, position);
          }
          event.preventDefault();
        }
      }
    },
    [text, onChange],
  );

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLPreElement>) => {
      if (
        event.key === KeyBoardkeys.ArrowLeft ||
        event.key === KeyBoardkeys.ArrowRight ||
        event.key === KeyBoardkeys.ArrowUp ||
        event.key === KeyBoardkeys.ArrowDown ||
        event.key === KeyBoardkeys.Home ||
        event.key === KeyBoardkeys.End ||
        event.key === KeyBoardkeys.PageDown ||
        event.key === KeyBoardkeys.PageUp
      ) {
        if (onCaretPositionChange) {
          const pos = getCursorPosition(preRef.current);
          if (pos !== caretPosition) {
            updateCaretPosition(pos);
          }
        }
      }
      if (onKeyUp) {
        onKeyUp(event);
      }
    },
    [],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      let handled = false;
      switch (event.key) {
        case KeyBoardkeys.Escape:
          // setActiveDropDown(null);
          break;
        case KeyBoardkeys.Z:
        case KeyBoardkeys.z:
          /* if (event.ctrlKey) {
          const prev = undo();
          if (prev) {
            if (onChange) {
              onChange(prev.text, prev.position);
            }
          }
          event.preventDefault();
          event.stopPropagation();
        } */
          break;
        case KeyBoardkeys.ArrowUp:
          if (dropDown) {
            prev();
            handled = true;
          }
          break;
        case KeyBoardkeys.ArrowDown:
          if (dropDown) {
            next();
            handled = true;
          }
          break;
        case KeyBoardkeys.Space:
        case KeyBoardkeys.Enter:
          if (dropDown) {
            if (onItemSelected) {
              onItemSelected(dropDown.id ?? '', activeOption);
              handled = true;
            }
          }
          break;
        default:
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      } else if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [dropDown, activeOption, onKeyDown, next, prev, onItemSelected],
  );

  return (
    <pre
      id="si-edit-element"
      className={[s.editElement, className].join(' ')}
      style={style}
      contentEditable="true"
      ref={setReference}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck="false"
      onInput={handleChange}
      onScroll={handleScroll}
      onPaste={handlePaste}
      onCopy={handleCopy}
      onCut={handleCut}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    />
  );
});
