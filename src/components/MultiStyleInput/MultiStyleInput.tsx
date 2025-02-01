import React from 'react';
import { EnhancedInput } from '../EnhancedInput';
import { StateProvider } from '../../state/StateProvider';
import { MultiStyleInputProps } from '@/types';

export const MultiStyleInput = React.memo((props: MultiStyleInputProps) => (
  <StateProvider props={props}>
    <EnhancedInput />
  </StateProvider>
));
