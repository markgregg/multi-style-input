import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MultiStyleInput } from './MultiStyleInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Examples/MultiStyleInput',
  component: MultiStyleInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    exampleWidth: {
      control: 'number',
      description: 'The width of the example',
    },
    exampleHeight: {
      control: 'number',
      description: 'The height of the example',
    },
    size: {
      options: ['compact', 'normal', 'large'],
    },
    className: {
      description: 'class name for custom class',
    },
    style: {
      description: 'custom styling',
    },
    uneditable: {
      control: 'boolean',
      description: 'is the user allowed to modify the textf',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onItemSelected: fn(),
    onChange: fn(),
    onCaretPositionChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    onDoubleClick: fn(),
    onMouseDown: fn(),
    onMouseUp: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onMouseOver: fn(),
    onKeyDown: fn(),
    onKeyUp: fn(),
  },
} satisfies Meta<typeof MultiStyleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    exampleHeight: 600,
    exampleWidth: 1000,
  },
};
