// src/stories/FieldList.stories.tsx

import { AdkFieldListProvider, useFieldList } from "./AdkFieldListProvider";
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Field } from '../models';
import React from "react";
import { expect } from '@storybook/jest';

interface MyField extends Field {
  name: string;
}

const MyComponent: React.FC = () => {
  const { fields, add, remove, clear, reset, update } = useFieldList<MyField>();

  React.useEffect(() => {
    add({
      id: 1, name: "Field 1",
      type: "checkbox",
      key: "",
      value: null
    } as MyField, { id: 2, name: "Field 2", type: "checkbox", key: "", value: null });
  }, []);

  const handleUpdate = (field: MyField) => {
    const updatedField = { ...field, name: `Updated Field ${field.id}` };
    update(updatedField);
  };

  return (
    <div>
      <h1>Fields:</h1>
      <ul>
        {fields.map((field) => (
          <li key={field.id}>
            {field.name}
            <span style={{ margin: '5px' }}></span>
            <button onClick={() => remove(field)}>Remove</button>
            <span style={{ margin: '5px' }}></span>
            <button onClick={() => handleUpdate(field)}>Update</button>
          </li>
        ))}
      </ul>
      <button onClick={clear}>Clear All</button>
      <span style={{ margin: '5px' }}></span>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

const App: React.FC = () => (
  <AdkFieldListProvider>
    <MyComponent />
  </AdkFieldListProvider>
);

const meta: Meta<typeof App> = {
  title: "Directives/AdkFieldListProvider",
  component: App,
  decorators: [
    (Story) => (
      <AdkFieldListProvider>
        <Story />
      </AdkFieldListProvider>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

// Assuming MyComponent is a component that interacts with FieldListContext
// and displays a list of fields or some interaction that can be tested.
export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for the list item containing "Field 1" text
    const listItem = await canvas.findByText(/field 1/i);

    // Within the list item, find the button with the text "Remove"
    const removeButton = await within(listItem).findByRole('button', { name: /remove/i });
    const updateButton = await within(listItem).findByRole('button', { name: /update/i });
    const resetButton = await canvas.findByRole('button', { name: /reset/i });
    const clearAllButton = await canvas.findByRole('button', { name: /clear all/i });

    // Click the remove button
    await userEvent.click(removeButton);

    // Assert that the "Field 1" text is no longer in the document
    expect(canvas.queryByText(/field 1/i)).not.toBeInTheDocument();

    // Click the clear all button
    await userEvent.click(clearAllButton);

    // Assert that the "Field 1" text is no longer in the document
    expect(canvas.queryByText(/field 1/i)).not.toBeInTheDocument();

    // Click the reset button
    await userEvent.click(resetButton);

    // Assert that the "Field 1" text is back in the document
    expect(canvas.queryByText(/field 1/i)).toBeInTheDocument();

    // Click the reset button
    await userEvent.click(resetButton);

    // Assert that the "Field 1" text is back in the document
    expect(canvas.queryByText(/field 1/i)).toBeInTheDocument();
  },
};

