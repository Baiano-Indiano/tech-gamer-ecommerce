// Simple preview configuration
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

// Simple decorator
export const decorators = [
  // Using any to avoid TypeScript errors with Storybook types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (StoryFn: any) => {
    return StoryFn();
  },
];
