import React from 'react';
import { StoreApi, UseBoundStore, useStore } from 'zustand';
import { StateContext } from '@/state/state';
import {
  ConfigState,
  DecoratedBlockState,
  DropDownOptionsState,
  State,
  ViewPortState,
} from '@/types/State';
import { ManagedState } from '@/types/State/managed';

const useState = <T, U>(
  storeSelector: (state: State) => UseBoundStore<StoreApi<T>>,
  selector: (state: T) => U,
) => {
  const store = storeSelector(React.useContext(StateContext));

  if (store === null) {
    throw new Error('useState must be used within StateProvider');
  }
  return useStore<UseBoundStore<StoreApi<T>>, U>(store, selector);
};

export const useConfig = <U>(selector: (state: ConfigState) => U) =>
  useState((s) => s.configStore, selector);

export const useBlockStore = <U>(selector: (state: DecoratedBlockState) => U) =>
  useState((s) => s.decoratedBlockStore, selector);

export const useViewPort = <U>(selector: (state: ViewPortState) => U) =>
  useState((s) => s.viewPortStore, selector);

export const useManaged = <U>(selector: (state: ManagedState) => U) =>
  useState((s) => s.managedStore, selector);

export const useOptions = <U>(selector: (state: DropDownOptionsState) => U) =>
  useState((s) => s.optionsStore, selector);
