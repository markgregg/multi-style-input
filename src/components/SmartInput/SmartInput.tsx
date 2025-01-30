import React from 'react';
import { EnhancedInput } from '../EnhancedInput';
import { StateProvider } from '../../state/StateProvider';
import { SmartInputProps } from '@/types';

export const SmartInput = React.memo((props: SmartInputProps) => (
  <StateProvider props={props}>
    <EnhancedInput />
  </StateProvider>
));
