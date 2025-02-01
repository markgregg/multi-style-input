import { default as React } from '../../node_modules/react';
import { MultiStyleInputProps } from '../../../../../../src/types';

export interface ProviderProps {
    props: MultiStyleInputProps;
    children: JSX.Element | JSX.Element[];
}
export declare const StateProvider: React.MemoExoticComponent<({ props, children }: ProviderProps) => import("react/jsx-runtime").JSX.Element>;
