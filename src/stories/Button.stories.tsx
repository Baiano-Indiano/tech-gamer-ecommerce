import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { FiShoppingCart } from 'react-icons/fi';

const meta = {
  title: 'Components/Button',
  component: AnimatedButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof AnimatedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  args: {
    ...Primary.args,
    children: (
      <>
        <FiShoppingCart />
        Add to Cart
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
    children: 'Disabled',
  },
};
