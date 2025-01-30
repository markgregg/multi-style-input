import { StoreApi, UseBoundStore, create } from 'zustand';
import { DecoratedBlockState, DecoratedElement, DropDownListElement } from '@/types/State';
import { BlockEventProps, DecoratedBlock, SmartElementMouseEvent } from '@/types';
import { findEndOfChange, setCursorPosition } from '@/components/EnhancedInput/EditElement/functions';

interface HtmlBase {
  start: number;
  end: number;
  text: string;
}

interface HtmlText extends HtmlBase {
  type: 't';
}

interface HtmlStyledText extends HtmlBase {
  type: 's';
  id: string;
  style?: string;
  existingStyle?: string;
}

type HtmlTextElement = HtmlText | HtmlStyledText;

export const createDecoratedBlockStore = ({
  onBlockClick,
  onBlockDblClick,
  onBlockMouseDown,
  onBlockMouseUp,
  onBlockMouseEnter,
  onBlockMouseLeave,
  onBlockMouseOver,
}: BlockEventProps): UseBoundStore<StoreApi<DecoratedBlockState>> => {

  const createHtmlText = (start: number, end: number, text: string): HtmlText =>
    ({ type: 't', start, end, text });

  const createHtmlStyledText = (start: number, end: number, text: string, id: string, style?: string, existingStyle?: string): HtmlStyledText =>
    ({ type: 's', start, end, text, id, style, existingStyle });

  const extractHtmlElements = (text: string, textBlocks: DecoratedBlock[], existingTextBlocks: DecoratedBlock[]): HtmlTextElement[][] => {
    let position = 0;
    textBlocks.sort((a, b) => a.start - b.start);
    const divElements = text
      .split('\n')
      .map((line) => {
        let lastPos = position;
        const lineElements = textBlocks
          .filter(({ start, length }) => start >= position && start + length <= position + line.length)
          .flatMap(({ id, start, length, style }) => {
            const previousBlock = existingTextBlocks.find((b) => b.id === id);
            const blockElements: HtmlTextElement[] = [
              ...(start > lastPos
                ? [createHtmlText(lastPos, start - lastPos - 1, line.substring(lastPos - position, start - position))]
                : []
              ),
              createHtmlStyledText(start, start + length - 1, line.substring(start - position, (start - position) + length), id, style, previousBlock?.style),
            ];
            lastPos = start + length;
            return blockElements;
          });
        if (lastPos < position + line.length) {

          lineElements.push(createHtmlText(lastPos, lastPos + (line.length - (lastPos - position)) - 1, line.substring(lastPos - position)))
        }
        position += line.length + 1;
        return lineElements;
      });
    return divElements;
  }

  const updateDom = (
    parentElement: HTMLPreElement,
    text: string,
    textBlocks: DecoratedBlock[],
    existingTextBlocks: DecoratedBlock[]
  ) => {
    const divElements = extractHtmlElements(text, textBlocks, existingTextBlocks,);
    let divCnt = 0;
    while (divCnt < divElements.length) {
      const div = divElements[divCnt];
      const domDiv = divCnt < parentElement.childNodes.length ? parentElement.childNodes[divCnt] as HTMLDivElement : null;
      if (
        divCnt === 0 &&
        parentElement.childNodes.length > 0 &&
        domDiv &&
        domDiv.nodeName === '#text'
      ) {
        if (div.length === 1 &&
          div[0].type === 't') {
          if (domDiv.textContent !== div[0].text) {
            domDiv.textContent = div[0].text;
          }
        } else {
          createDivElement(parentElement, div, domDiv);
          parentElement.removeChild(domDiv);
        }
      } else if (!domDiv) {
        createDivElement(parentElement, div);
      } else if (domDiv.nodeName !== 'DIV') {
        createDivElement(parentElement, div, domDiv);
        parentElement.removeChild(domDiv);
      } else {
        updateDivElement(div, domDiv);
      }
      divCnt += 1;
    }
    while (divCnt < parentElement.childNodes.length) {
      parentElement.removeChild(parentElement.childNodes[divCnt]); //remove excess elements
    }
  }

  const createDivElement = (
    parentElement: HTMLPreElement,
    elements: HtmlTextElement[],
    targetNode: ChildNode | null = null,
  ) => {
    const div = document.createElement('div');
    insertOrAppend(parentElement, div, targetNode);
    if (elements.length === 0) {
      createTextElement(div, '');
    } else {
      elements.forEach((element) => {
        if (element.type === 't') {
          createTextElement(div, element.text);
        } else {
          createStyledTextElement(div, element);
        }
      });
    }
  }

  const updateDivElement = (
    elements: HtmlTextElement[],
    domDiv: HTMLDivElement,
  ) => {
    if (elements.length === 1 &&
      elements[0].type === 't' &&
      domDiv.childNodes.length === 1 &&
      domDiv.childNodes[0].nodeName === '#text') {
      if (domDiv.childNodes[0].textContent !== elements[0].text) {
        domDiv.childNodes[0].textContent = elements[0].text;
      }
      return;
    }
    let cnt = 0;
    while (cnt < elements.length) {
      const element = elements[cnt];
      const domElement = cnt < domDiv.childNodes.length ? domDiv.childNodes[cnt] as HTMLElement : null;
      if (element.type === 's') {
        if (domElement && element.id !== domElement.id) {
          if (shouldRemoveElement(domDiv, cnt, element.id)) {
            domDiv.removeChild(domElement);
            updateElement(
              domDiv.childNodes[cnt] as HTMLElement,
              element
            );
          } else {
            createStyledTextElement(domDiv, element, domElement);
          }
        } else if (domElement && domElement.id === element.id) {
          updateElement(domElement as HTMLElement, element);
        } else {
          createStyledTextElement(domDiv, element, domElement);
        }
      } else if (domElement) {
        if (domDiv.nodeName !== '#text') {
          createTextElement(domDiv, element.text, domElement);
          domDiv.removeChild(domElement);
        } else if (domElement.textContent !== element.text) {
          domElement.textContent = element.text;
        }
      } else {
        createTextElement(domDiv, element.text, domElement);
      }
      cnt = cnt + 1;
    }
    if (cnt < domDiv.childNodes.length) {
      while (cnt < domDiv.childNodes.length) {
        domDiv.removeChild(domDiv.childNodes[cnt]); //remove excess elements
      }
      createTextElement(domDiv, '\n');
    }
  }

  const createTextElement = (
    parentElement: HTMLElement,
    elementText: string,
    targetNode: ChildNode | null = null,
  ) => {
    const text = document.createTextNode(elementText);
    insertOrAppend(parentElement, text, targetNode);
  }

  const createStyledTextElement = (
    parentElement: HTMLElement,
    { id, text, style }: HtmlStyledText,
    targetNode: ChildNode | null = null,
  ) => {
    const span = document.createElement('span');
    span.textContent = text;
    span.id = id;
    if (style) {
      span.style.cssText = style;
    }
    insertOrAppend(parentElement, span, targetNode);
    addListeners(span);
  };

  const shouldRemoveElement = (
    pre: HTMLElement,
    cnt: number,
    id: string,
  ) => {
    return pre.childNodes.length > cnt + 1 &&
      'id' in pre.childNodes[cnt + 1] &&
      id === (pre.childNodes[cnt + 1] as HTMLElement).id;
  }

  const updateElement = (
    html: HTMLElement,
    { text, style, existingStyle }: HtmlStyledText
  ) => {
    if (html.textContent !== text) {
      // eslint-disable-next-line no-param-reassign
      html.textContent = text;
    }
    if (style !== existingStyle) {
      // eslint-disable-next-line no-param-reassign
      html.style.cssText = style ?? '';
    }
  };

  const insertOrAppend = (
    pre: HTMLElement,
    newHtml: ChildNode,
    atHtml: ChildNode | null = null,
  ) => {
    if (atHtml) {
      pre.insertBefore(newHtml, atHtml);
    } else {
      pre.appendChild(newHtml);
    }
  };

  const addListeners = (element: HTMLElement) => {
    const eventParametrs = (event: MouseEvent): SmartElementMouseEvent => ({
      event,
      id: element.id,
      blockText: element.textContent ?? '',
    });
    const handleClick = (event: MouseEvent) => {
      onBlockClick?.(eventParametrs(event));
    }
    const handleDblClick = (event: MouseEvent) => {
      onBlockDblClick?.(eventParametrs(event));
    }
    const handleMouseDown = (event: MouseEvent) => {
      onBlockMouseDown?.(eventParametrs(event));
    }
    const handleMouseUp = (event: MouseEvent) => {
      onBlockMouseUp?.(eventParametrs(event));
    }
    const handleMouseEnter = (event: MouseEvent) => {
      onBlockMouseEnter?.(eventParametrs(event));
    }
    const handleMouseLeave = (event: MouseEvent) => {
      onBlockMouseLeave?.(eventParametrs(event));
    }
    const handleMouseOver = (event: MouseEvent) => {
      onBlockMouseOver?.(eventParametrs(event));
    }
    if (onBlockClick) {
      element.addEventListener('click', handleClick);
    }
    if (onBlockDblClick) {
      element.addEventListener('dblclick', handleDblClick);
    }
    if (onBlockMouseDown) {
      element.addEventListener('mousedown', handleMouseDown);
    }
    if (onBlockMouseUp) {
      element.addEventListener('mouseup', handleMouseUp);
    }
    if (onBlockMouseEnter) {
      element.addEventListener('mouseenter', handleMouseEnter);
    }
    if (onBlockMouseLeave) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    if (onBlockMouseOver) {
      element.addEventListener('mouseover', handleMouseOver);
    }
  };

  const closeSpan = (
    newText: string, newTextBlocks: DecoratedBlock[]
  ) => {
    if (newTextBlocks.length === 0) {
      return false;
    }
    const { start, length } = newTextBlocks.sort((a, b) => a.start - b.start)[newTextBlocks.length - 1];
    return start + length + 1 >= newText.length;
  }

  const getElementPosition = (
    htmlElement: HTMLElement,
    isDropDown?: boolean,
  ) => ({
    top:
      htmlElement.offsetTop + (isDropDown ? htmlElement.offsetHeight + 2 : 0),
    left: htmlElement.offsetLeft,
    width: htmlElement.offsetWidth,
    height: htmlElement.offsetHeight,
  });

  return create<DecoratedBlockState>((set) => ({
    text: '',
    textBlocks: [],
    parentElement: null,
    customElements: [],
    dropDown: null,
    caretPosition: 0,
    setParantElement: (parentElement: HTMLPreElement) => set(() => ({ parentElement })),
    updateText: (text: string) => set(() => ({ text })),
    updateCaretPosition: (caretPosition: number) => set(() => ({ caretPosition })),
    update: (newText: string, newTextBlocks: DecoratedBlock[]) => set((state) => {
      const { parentElement, text, textBlocks, caretPosition } = state;
      if (!parentElement ||
        (text.length > 1 &&
          text === newText &&
          JSON.stringify(textBlocks) === JSON.stringify(newTextBlocks)
          && !closeSpan(text, textBlocks)
          && text[text.length - 1] !== '\n')
      ) {
        return {};
      }
      updateDom(parentElement, newText, newTextBlocks, textBlocks);
      const newPosition = findEndOfChange(text, newText) ?? caretPosition;
      setCursorPosition(parentElement, newPosition);

      const customElements = newTextBlocks.filter((block) => 'Decorator' in block).map((block) => {
        const { id, start, length, Decorator, clasName, decoratorStyle, customProps } = block;
        const elementText = text.substring(start, length);
        const textElement = document.getElementById(id);
        if (!textElement) {
          return null;
        }
        return {
          id,
          text: elementText,
          start,
          end: start + elementText.length,
          length,
          Decorator,
          textElement,
          clasName,
          decoratorStyle,
          customProps,
          ...getElementPosition(textElement, false),
        };
      }).filter((block) => block !== null) as DecoratedElement[];
      const {
        id: dropDownId,
        dropDown,
      } = newTextBlocks.find((block) => 'dropDown' in block) ?? {};
      return {
        text: newText,
        textBlocks: newTextBlocks,
        customElements,
        dropDown: dropDownId
          ? {
            id: dropDownId,
            dropDown,
            ...getElementPosition(document.getElementById(dropDownId) as HTMLElement, true),
          } as DropDownListElement
          : null,
      };
    }),
  }));
}
