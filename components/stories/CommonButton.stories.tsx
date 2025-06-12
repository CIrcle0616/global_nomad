import type { Meta, StoryObj } from '@storybook/react';
import CommonButton from '../common/CommonButton';

const meta: Meta<typeof CommonButton> = {
  title: 'Components/CommonButton',
  component: CommonButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['L', 'M', 'S'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: '버튼',
    size: 'L',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof CommonButton>;

export const LargePrimary: Story = {
  args: {
    children: 'Primary Large',
    size: 'L',
    variant: 'primary',
  },
};

export const MediumSecondary: Story = {
  args: {
    children: 'Secondary Medium',
    size: 'M',
    variant: 'secondary',
  },
};

export const SmallDisabled: Story = {
  args: {
    children: 'Disabled Small',
    size: 'S',
    variant: 'primary',
    disabled: true,
  },
};

export const CustomWidth: Story = {
  args: {
    children: 'Custom Width',
    size: 'M',
    width: 'w-[300px]',
  },
};
