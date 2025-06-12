import type { Meta, StoryObj } from '@storybook/react';
import DropdownSelect from '../common/DropDownSelect';

const meta: Meta<typeof DropdownSelect> = {
  title: 'Components/DropdownSelect',
  component: DropdownSelect,
  tags: ['autodocs'],
  args: {
    placeholder: '옵션을 선택하세요',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: 'Option 1',
    onSelect: (value: string) => alert(`Selected: ${value}`),
  },
  argTypes: {
    selected: { control: 'text' },
    placeholder: { control: 'text' },
    options: {
      control: { type: 'object' },
    },
    onSelect: { action: 'onSelect' },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownSelect>;

export const Default: Story = {
  args: {
    placeholder: '옵션을 선택하세요',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: 'Option 1',
  },
};
