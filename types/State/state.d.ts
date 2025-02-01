import { StoreApi, UseBoundStore } from 'zustand';
import { ConfigState } from './config';
import { DecoratedBlockState } from './decoratedBlock';
import { ViewPortState } from './viewPort';
import { ManagedState } from './managed';
import { DropDownOptionsState } from './dropDownOptions';

export interface State {
    configStore: UseBoundStore<StoreApi<ConfigState>>;
    decoratedBlockStore: UseBoundStore<StoreApi<DecoratedBlockState>>;
    viewPortStore: UseBoundStore<StoreApi<ViewPortState>>;
    managedStore: UseBoundStore<StoreApi<ManagedState>>;
    optionsStore: UseBoundStore<StoreApi<DropDownOptionsState>>;
}
