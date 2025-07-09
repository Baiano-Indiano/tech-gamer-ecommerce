import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Feedback } from '../components/feedback';

const meta = {
  title: 'Components/Feedback',
  component: Feedback,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning'],
    },
    message: {
      control: 'text',
    },
    show: {
      control: 'boolean',
    },
    autoClose: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operação realizada com sucesso!',
    show: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Ocorreu um erro ao processar sua solicitação.',
    show: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Esta é uma mensagem informativa.',
    show: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Atenção: Esta ação não pode ser desfeita.',
    show: true,
  },
};

// Exemplo interativo com controle de estado
const InteractiveFeedback = () => {
  const [show, setShow] = useState(true);
  
  return (
    <div>
      <button 
        onClick={() => setShow(true)}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
      >
        Mostrar Feedback
      </button>
      <Feedback
        type="success"
        message="Esta é uma mensagem de feedback interativa!"
        show={show}
        onClose={() => setShow(false)}
        autoClose={3000}
      />
    </div>
  );
};

export const InteractiveExample: Story = {
  args: {
    type: 'info',
    message: 'This is an interactive example',
    show: true,
  },
  render: () => <InteractiveFeedback />,
};

// Exemplo com auto-fechamento
export const AutoClose: Story = {
  args: {
    type: 'success',
    message: 'Esta mensagem irá fechar automaticamente em 3 segundos',
    show: true,
    autoClose: 3000,
  },
};
