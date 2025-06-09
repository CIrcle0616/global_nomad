import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from '../common/DatePicker'; // ← 실제 경로에 맞게 조정

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const Wrapper = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  return <DatePicker selected={selected} onSelect={setSelected} />;
};

export const Default: Story = {
  render: () => <Wrapper />,
};
