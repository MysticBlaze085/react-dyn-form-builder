import { AdkTableFilterProvider, useTableFilter } from './AdkTableFilterContext';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const SampleTableComponent: React.FC = () => {
  const { filteredRows, addFilter, clearFilters } = useTableFilter();
  const [column, setColumn] = useState('');
  const [value, setValue] = useState('');

  const handleAddFilter = () => {
    if (column && value) {
      addFilter({ column, value });
    }
  };

  const handleClearFilters = () => {
    clearFilters();
    setColumn('');
    setValue('');
  };

  return (
    <div>
      <h2>Sample Table Component</h2>
      <div style={{margin: '1rem 0'}}>
        <label>Column:</label>
        <input type="text" value={column} onChange={(e) => setColumn(e.target.value)} />
      </div>
      <div style={{marginBottom: '1rem'}}>
        <label>Value:</label>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <button style={{marginRight: '2rem'}} onClick={handleAddFilter}>Add Filter</button>
      <button onClick={handleClearFilters}>Clear Filters</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default {
    title: 'Directives/AdkTableFilterContext',
    component: SampleTableComponent,
    decorators: [
        (Story) => (
            <AdkTableFilterProvider initialRows={initialRows}>
                <Story />
            </AdkTableFilterProvider>
        ),
    ],
    tags: ['autodocs'],
} as Meta;

// Mock data for the table
const initialRows = [
    { id: '1', name: 'John Doe', date: '2021-01-01' },
    { id: '2', name: 'Jane Doe', date: '2021-01-02' },
    { id: '3', name: 'John Smith', date: '2021-01-03' },
    { id: '4', name: 'Jane Smith', date: '2021-01-04' },
];

export const Default: StoryObj<typeof SampleTableComponent> = {
  render: () => <SampleTableComponent  />,
};