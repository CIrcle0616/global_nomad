import type { Meta, StoryObj } from '@storybook/react';
import Input from '../common/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    value: '',
    placeholder: '입력해 주세요',
    onChange: () => {},
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    readOnly: { control: 'boolean' },
    icon: { control: false }, // 아이콘은 실제로 Storybook에 표시하기 어려우므로 제외
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: '',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    placeholder: '이메일을 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    value: '잘못된 입력',
    error: '이 필드는 필수입니다.',
  },
};

export const WithHint: Story = {
  args: {
    value: '정상 입력',
    hint: '올바른 입력입니다.',
  },
};

export const ReadOnly: Story = {
  args: {
    value: '읽기 전용 텍스트',
    readOnly: true,
  },
};
