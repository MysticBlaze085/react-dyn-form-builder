// src/stories/FieldList.stories.tsx

import { FieldListProvider, useFieldList } from "./FieldListProvider";
import type { Meta, StoryObj } from '@storybook/react';

import {Field} from '../models';
import React from "react";

interface MyField extends Field {
  name: string;
}

const MyComponent: React.FC = () => {
  const { fields, add, remove, clear, reset } = useFieldList<MyField>();

  React.useEffect(() => {
    add({
      id: 1, name: "Field 1",
      type: "checkbox",
      key: "",
      value: null
    } as MyField, { id: 2, name: "Field 2", type: "checkbox", key: "", value: null });
  }, []);

  return (
    <div>
      <h1>Fields:</h1>
      <ul>
        {fields.map((field) => (
          <li key={field.id}>
            {field.name} <button onClick={() => remove(field)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clear}>Clear All</button>
      <span style={{margin: '5px'}}></span>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

const App: React.FC = () => (
  <FieldListProvider>
    <MyComponent />
  </FieldListProvider>
);

const meta: Meta<typeof App> = {
  title: "Directives/FieldListProvider",
  component: App,
  decorators: [
    (Story) => (
      <FieldListProvider>
        <Story />
      </FieldListProvider>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
