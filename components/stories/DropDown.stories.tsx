import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DropdownMenu from '../common/DropDown'; // 경로는 프로젝트에 따라 조정

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const options = ['Option 1', 'Option 2', 'Option 3'];

const Wrapper = () => {
  const [selected, setSelected] = useState('Option 1');

  return (
    <div className="p-8 space-y-4">
      <p className="text-sm">
        Selected: <strong>{selected}</strong>
      </p>
      <DropdownMenu
        options={options}
        onSelect={setSelected}
        trigger={
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Select Option</button>
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
