import { ConfigState, DecoratedBlockState, DropDownOptionsState, ViewPortState } from '../../../../../../src/types/State';
import { ManagedState } from '../../../../../../src/types/State/managed';

export declare const useConfig: <U>(selector: (state: ConfigState) => U) => U;
export declare const useBlockStore: <U>(selector: (state: DecoratedBlockState) => U) => U;
export declare const useViewPort: <U>(selector: (state: ViewPortState) => U) => U;
export declare const useManaged: <U>(selector: (state: ManagedState) => U) => U;
export declare const useOptions: <U>(selector: (state: DropDownOptionsState) => U) => U;
