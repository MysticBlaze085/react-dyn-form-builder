import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import ButtonDefault from './Button';

const meta = {
  title: 'Components/Button',
  component: ButtonDefault,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', overflow: 'hidden' }}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
  },
} satisfies Meta<typeof ButtonDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

// Wrapper Component with Debounce and Error Handling
const ButtonWrapper: React.FC<{ color: string; children: React.ReactNode; disabled: boolean }> = ({ color, children, disabled }) => {
  const [debouncedColor, setDebouncedColor] = useState(color);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedColor(color), 500); // Debounce for 500ms
    return () => clearTimeout(handler);
  }, [color, disabled]);

  return (
    <ErrorBoundary>
      <ButtonDefault color={debouncedColor} disabled={disabled}>
        {children}
      </ButtonDefault>
    </ErrorBoundary>
  );
};

export const Primary: Story = {
  render: (args: any) => <ButtonWrapper {...args} />,
  args: {
    disabled: true,
    color: 'blue',
    children: 'This is a button',
  },
};