import type { Meta, StoryObj } from '@storybook/react';
import { SortableTableProvider, useSortableTable } from './AdkSortableTableRow.Context'; // Adjust the import path according to your project structure

// AdkSortableTableContext.stories.tsx
import React from 'react';

// Mock component to demonstrate context usage
const MockSortableTable = () => {
  const { rowData, sortRows } = useSortableTable();
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortRows('name')} style={{cursor: "pointer"}}>Name</th>
          <th onClick={() => sortRows('date')} style={{cursor: "pointer"}}>Date</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default {
  title: 'Contexts/AdkSortableTableContext',
  component: MockSortableTable,
  decorators: [(Story) => (
    <SortableTableProvider initialRows={initialRows}>
      <Story />
    </SortableTableProvider>
  )],
} as Meta;

// Mock data for the table
const initialRows = [
  // Add your initial rows here
    { id: 1, name: 'John Doe', date: '2021-01-01' },
    { id: 2, name: 'Jane Doe', date: '2021-01-02' },
    { id: 3, name: 'John Smith', date: '2021-01-03' },
    { id: 4, name: 'Jane Smith', date: '2021-01-04' },
];

export const Default: StoryObj<typeof MockSortableTable> = {
  render: () => <MockSortableTable />,
};