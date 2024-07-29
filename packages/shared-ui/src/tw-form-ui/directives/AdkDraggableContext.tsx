import React, { createContext, useState } from 'react';

// Assuming headers and rows are of these types for demonstration
type HeaderType = string; // Adjust according to your actual header type
type RowType = Record<string, any>; // Adjust according to your actual row type

// Context creation with default values
const DraggableTableContext = createContext({
    draggedColIndex: null,
    handleDragStart: (index: number) => {},
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => {},
    handleDrop: (targetIndex: number) => {},
});

export const DraggableTableProvider: React.FC<{ children: React.ReactNode; initialHeaders: string[] }> = ({ children, initialHeaders }) => {
    const initialHeadersState: string[] = initialHeaders || []; // Initialize according to your needs

    const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
    const [headers, setHeaders] = useState<HeaderType[]>([]); // Initialize according to your needs
    const [rows, setRows] = useState<RowType[]>([]); // Initialize according to your needs

    

    const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
        setDraggedColIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (targetIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (draggedColIndex === null || draggedColIndex === targetIndex) return;

        // Reorder headers
        const newHeaders = [...headers];
        const draggedHeader = newHeaders.splice(draggedColIndex, 1)[0];
        newHeaders.splice(targetIndex, 0, draggedHeader);

        // Reorder each row's data accordingly
        const newRows = rows.map((row) => {
            const entries = Object.entries(row);
            const draggedEntry = entries.splice(draggedColIndex, 1)[0];
            entries.splice(targetIndex, 0, draggedEntry);
            return Object.fromEntries(entries);
        });

        setHeaders(newHeaders);
        setRows(newRows);
        setDraggedColIndex(null); // Reset dragged column index
    };

    return (
        <DraggableTableContext.Provider value={{ draggedColIndex, handleDragStart, handleDragOver, handleDrop }}>
            {children}
        </DraggableTableContext.Provider>
    );
};