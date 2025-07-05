import { ComponentType, ReactNode } from 'react';

declare module '@storybook/react' {
  interface StoryObj<T = unknown> {
    args?: Partial<T>;
    parameters?: Record<string, unknown>;
    decorators?: ((Story: ComponentType) => JSX.Element)[];
    render?: (args: T) => ReactNode;
  }

  interface Meta<T = unknown> {
    title: string;
    component: ComponentType<T>;
    parameters?: Record<string, unknown>;
    tags?: string[];
    argTypes?: Record<string, unknown>;
    args?: Partial<T>;
  }

  export { Meta, StoryObj };
}
