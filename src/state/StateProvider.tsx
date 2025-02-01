import React from 'react';
import { createConfigStore } from './configStore';
import { StateContext } from '@/state/state';
import { MultiStyleInputProps } from '@/types';
import { createDecoratedBlockStore } from './decoratedBlockStore';
import { createViewPortStore } from './viewPortStore';
import { createManagedStore } from './managedState';
import { createDropDownOptionsStore } from './dropDownOptions';

export interface ProviderProps {
  props: MultiStyleInputProps;
  children: JSX.Element | JSX.Element[];
}

export const StateProvider = React.memo(
  ({ props, children }: ProviderProps) => {
    const {
      onBlockClick,
      onBlockDblClick,
      onBlockMouseDown,
      onBlockMouseUp,
      onBlockMouseEnter,
      onBlockMouseLeave,
      onBlockMouseOver,
      onChange,
      text,
      textBlocks,
    } = props;
    const configStore = React.useMemo(
      () => createConfigStore(props),
      [onChange],
    );

    const decoratedBlockStore = React.useMemo(
      () => createDecoratedBlockStore(props),
      [
        onBlockClick,
        onBlockDblClick,
        onBlockMouseDown,
        onBlockMouseUp,
        onBlockMouseEnter,
        onBlockMouseLeave,
        onBlockMouseOver,
      ],
    );
    const viewPortStore = React.useMemo(createViewPortStore, []);
    const managedStore = React.useMemo(
      () => createManagedStore(props),
      [text, textBlocks],
    );
    const optionsStore = React.useMemo(createDropDownOptionsStore, []);

    const stateValue = React.useMemo(
      () => ({
        configStore,
        decoratedBlockStore,
        viewPortStore,
        managedStore,
        optionsStore,
      }),
      [
        configStore,
        decoratedBlockStore,
        viewPortStore,
        managedStore,
        optionsStore,
      ],
    );

    return (
      <StateContext.Provider value={stateValue}>
        {children}
      </StateContext.Provider>
    );
  },
);
