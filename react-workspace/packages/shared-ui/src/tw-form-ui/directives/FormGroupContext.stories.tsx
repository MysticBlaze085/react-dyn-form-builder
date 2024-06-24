import { FormGroup, FormGroupProvider, useFormGroup } from "./FormGroupContext";
import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useEffect, useState } from "react";

interface MyFormGroup extends FormGroup {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
}

const MyComponent: React.FC = () => {
  const { edit, cancel, submit, set } = useFormGroup<MyFormGroup>();
  const [formState, setFormState] = useState({ firstName: '', lastName: '', fullName: '' });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(formState);
    alert(`You submitted \n ${JSON.stringify(formState, null, 2)}`);
  };

  const handleEditMode = () => {
    edit();
    setIsDisabled(false);
  };

  const handleCancelMode = () => {
    cancel();
    setFormState({ firstName: '', lastName: '', fullName: '' });
    setIsDisabled(true);
  };

  const setForm = useCallback(() => {
    set(formState);
  }, [formState, set]);

  useEffect(() => {
    setForm();
  }, [setForm]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={formState.firstName}
              onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
              disabled={isDisabled}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={formState.lastName}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
              disabled={isDisabled}
            />
          </label>
        </div>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              disabled={isDisabled}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
        <span style={{ margin: '5px' }}></span>
        <button type="button" onClick={handleEditMode}>
          Edit
        </button>
        <span style={{ margin: '5px' }}></span>
        <button type="button" onClick={handleCancelMode}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const App: React.FC = () => (
  <FormGroupProvider>
    <MyComponent />
  </FormGroupProvider>
);

const meta: Meta<typeof App> = {
  title: "Directives/FormGroupProvider",
  component: App,
  decorators: [
    (Story) => (
      <FormGroupProvider>
        <Story />
      </FormGroupProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};