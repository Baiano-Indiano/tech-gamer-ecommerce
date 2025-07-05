import { FiSearch, FiMail } from 'react-icons/fi';
import InputGroup from './InputGroup';
import { Input } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Input/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    children: <Input placeholder="Enter your username" label="" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email',
    children: (
      <Input 
        placeholder="Enter your email"
        type="email"
        icon={<FiMail />}
        label=""
      />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'This field is required',
    children: (
      <Input 
        placeholder="Enter your email"
        type="email"
        icon={<FiMail />}
        label=""
      />
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    helperText: 'Enter a valid email address',
    children: (
      <Input 
        placeholder="Enter your email"
        type="email"
        icon={<FiMail />}
        label=""
      />
    ),
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Search',
    fullWidth: true,
    children: (
      <Input 
        placeholder="Search..."
        icon={<FiSearch />}
        label=""
      />
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
