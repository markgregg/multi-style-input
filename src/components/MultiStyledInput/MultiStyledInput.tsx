import React from 'react';
import { EnhancedInput } from '../EnhancedInput';
import { StateProvider } from '../../state/StateProvider';
import { MultiStyledInputProps } from '@/types';

export const MultiStyledInput = React.memo((props: MultiStyledInputProps) => (
  <StateProvider props={props}>
    <EnhancedInput />
  </StateProvider>
));
