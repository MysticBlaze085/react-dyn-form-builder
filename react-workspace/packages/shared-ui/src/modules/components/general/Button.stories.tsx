import type { Meta, StoryObj } from '@storybook/react';
import ButtonDefault from './Button';
import React, { useEffect, useState } from 'react';

const meta = {
  title: 'Components/General/Button',
  component: ButtonDefault,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof ButtonDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    console.log('Props', props)
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
  console.log('Disabled', disabled);

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