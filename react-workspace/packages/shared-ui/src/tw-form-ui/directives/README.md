## Table of Contents

- [Table of Contents](#table-of-contents)
  - [AdkFieldListContext](#adkfieldlistcontext)
    - [Key Concepts](#key-concepts)
    - [Functionality](#functionality)
    - [Usage](#usage)
  - [AdkFormGroupContext](#adkformgroupcontext)
    - [Key Concepts](#key-concepts-1)
    - [Functionality](#functionality-1)
    - [Usage](#usage-1)
  - [AdkSelectionContext Component](#adkselectioncontext-component)
    - [Overview](#overview)
    - [Types and Interfaces](#types-and-interfaces)
    - [Reducer Logic](#reducer-logic)
    - [Provider Component](#provider-component)
    - [Usage](#usage-2)
  - [HttpClientContext Component](#httpclientcontext-component)
    - [Overview](#overview-1)
    - [Reducer Actions](#reducer-actions)
    - [Custom Hook](#custom-hook)
    - [Key Features](#key-features)
    - [Usage](#usage-3)

### AdkFieldListContext

The `AdkFieldListContext` is a React functional component that utilizes the Context API to provide a global state for managing a list of fields. It allows adding, updating, removing, clearing, and resetting fields within the application.

#### Key Concepts

- **useReducer Hook**: Used for state management of fields. It allows for more complex state logic that can be outsourced to a reducer function.
- **useRef Hook**: Utilized to keep a reference to the initial state. This is useful for the reset functionality, allowing the state to be reset to its initial value.
- **useMemo Hook**: Optimizes performance by memoizing the context value. This ensures that the value only changes when `fields` change, preventing unnecessary re-renders.

#### Functionality

- **Add**: Allows adding one or more new fields to the state. The new fields are also added to the `initialStateRef` to ensure they are included when the state is reset.
- **Update**: Updates a specific field within the state.
- **Remove**: Removes a specific field from the state.
- **Clear**: Clears all fields from the state.
- **Reset**: Resets the state to its initial value, using the `initialStateRef`.

#### Usage

The component wraps its children with the `AdkFieldListContext.Provider`, passing down the `contextValue` which contains the state and the functions to manipulate it. This allows any child component to access and modify the list of fields through the context.

```tsx
<AdkFieldListProvider>
  {/* Child components can access the fields context here */}
</AdkFieldListProvider>
```

### AdkFormGroupContext

The `AdkFormGroupContext` is a React component designed to manage the state of form groups within an application. It leverages React's Context API, `useReducer`, and `useRef` hooks to provide a flexible and efficient way to handle form state and actions.

#### Key Concepts

- **Context API**: Utilizes React's Context API to provide a global state that can be accessed by any component within the context provider.
- **useReducer Hook**: Manages the form group state. It allows for complex state logic that is handled by a reducer function, making state transitions predictable.
- **useRef Hook**: Used to store the initial state of the form group. This is particularly useful for resetting the form to its initial state.

#### Functionality

- **SET**: Updates the `generatedForm` state with a new form configuration and sets it to disabled.
- **EDIT**: Enables the form by setting the `disabled` property of `generatedForm` to false.
- **CANCEL**: Resets the form to its initial state by setting the `disabled` property of `generatedForm` to true.
- **SUBMIT**: Placeholder for submit logic. The current implementation does not alter the state, indicating that the submit logic should be implemented as needed.

#### Usage

To use the `AdkFormGroupContext`, wrap your component tree with the `AdkFormGroupProvider`. This makes the form group context available to any child components, allowing them to interact with the form group state and actions.

```tsx
<AdkFormGroupProvider>
  {/* Child components that need access to the form group context go here */}
</AdkFormGroupProvider>
```

### AdkSelectionContext Component

The `AdkSelectionContext` component is designed to manage selection states within a React application, utilizing the Context API for global state management and a reducer for state transitions.

#### Overview

- **Context Creation**: Utilizes React's `createContext` to create a new context for selection states.
- **Reducer Function**: Implements a reducer, `selectionReducer`, to manage selection states based on actions such as select, deselect, clear, and reset.

#### Types and Interfaces

- **AdkSelectionContextType**: Defines the shape of the context, including functions for selecting, deselecting, clearing selections, and resetting the selection state.
- **Action**: A type definition for actions that can be dispatched to the reducer, including 'SELECT', 'DESELECT', 'CLEAR', and 'RESET'.

#### Reducer Logic

- **SELECT**: Adds one or more IDs to the selection state, marking them as selected.
- **DESELECT**: Removes an ID from the selection state.
- **CLEAR**: Clears all selections.
- **RESET**: Resets the selection state. Currently, it behaves the same as CLEAR, but can be customized for different reset logic.

#### Provider Component

- **AdkSelectionProvider**: A provider component that wraps the application or component tree to provide access to the selection context. It initializes the selection state and provides functions to manipulate this state.

#### Usage

To use the `AdkSelectionContext`, wrap your component tree with the `AdkSelectionProvider`. Within the provider's children, use the context to access selection state and manipulation functions.

```tsx
const MyComponent = () => {
  const { select, deselect, clear, selected, reset } = useContext(AdkSelectionContext);

  // Component logic here
};
```

### HttpClientContext Component

The `HttpClientContext` component is designed to manage HTTP requests within a React application, leveraging the Context API for state management and Axios for making HTTP requests.

#### Overview

- **Context Creation**: Utilizes React's `createContext` and `useContext` hooks to create and consume a context for HTTP client state and operations.
- **Axios**: Uses Axios for performing HTTP `GET` and `POST` requests, handling both success and failure cases.
- **Reducer**: Implements a reducer to manage the state of HTTP requests, including initializing, success, failure, and reset actions.

#### Reducer Actions

- **POST_INIT**: Dispatched before a POST request is made, to set the state indicating that a request is in progress.
- **POST_SUCCESS**: Dispatched when a POST request successfully returns a response, updating the state with the response data.
- **POST_FAILURE**: Dispatched when a POST request fails, updating the state with the error.
- **RESET**: Resets the HTTP client state, typically used to clear any data or errors from previous requests.

#### Custom Hook

- **useHttpClient**: A custom hook that allows components to consume the `HttpClientContext`. It ensures that the context is used within a provider and throws an error if it is used outside of the `HttpClientProvider`.

#### Key Features

- **State Management for HTTP Requests**: Centralizes the state management for HTTP requests, making it easier to handle loading states, responses, and errors.
- **Reusable HTTP Client Logic**: Encapsulates the logic for making HTTP requests and managing their state, allowing for reuse across components.
- **Error Handling**: Provides a structured way to handle errors from HTTP requests, improving the robustness of the application.

#### Usage

To use the `HttpClientContext`, wrap your component tree with the `HttpClientProvider`. Within the provider's children, use the `useHttpClient` hook to access the HTTP client's state and operations.

```tsx
const MyComponent = () => {
  const { state, fetch, post, reset } = useHttpClient();

  // Component logic here, such as making a POST request or resetting the state
};
```