import { AdkSelectionProvider, useAdkSelection } from "./AdkSelectionContext";
import { Meta, StoryObj } from '@storybook/react';

import React from 'react';

const meta: Meta = {
    title: 'Directives/AdkSelection',
    component: AdkSelectionProvider,
    decorators: [
        (Story) => (
            <AdkSelectionProvider>
                <Story />
            </AdkSelectionProvider>
        ),
    ],
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

interface Item {
    id: string;
    name: string;
}

const items: Item[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
];

const SelectionExample: React.FC = () => {
    const { select, deselect, selected, clear, reset } = useAdkSelection();

    const handleCheckboxChange = (id: string) => {
        if (selected(id)) {
            deselect(id);
        } else {
            select(id);
        }
    };

    const selectAll = () => {
        select(...items.map(item => item.id));
    };

    return (
        <div>
            <button onClick={selectAll}>Select All</button>
            <span style={{ margin: '5px' }}></span>
            <button onClick={clear}>Clear Selection</button>
            {items.map((item) => (
                <div key={item.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selected(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        {item.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export const Default: Story = {
    render: () => <SelectionExample />,
};