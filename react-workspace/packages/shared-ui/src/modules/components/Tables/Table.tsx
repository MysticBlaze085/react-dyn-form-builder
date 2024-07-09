// @ts-nocheck
import React, { Suspense, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableHandlers from './Table.handlers';

const Checkbox = React.lazy(() => import('@material-tailwind/react/components/Checkbox'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const ChevronUpDownIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronUpDownIcon'));

export interface TableRow {
    [key: string]: any;
}

export interface DefaultTableProps {
    headers: string[];
    rows: TableRow[];
    isDraggable?: boolean;
    isSortable?: boolean;
    isSelectable?: boolean;
    [key: string]: any;
}

const DefaultTable: React.FC<DefaultTableProps> = ({ ...props }) => {
    const dispatch = useDispatch();
    const dataSource = useSelector((state) => state['tableDataSource']['dataSource']);
    const sortConfig = useSelector((state) => state['tableDataSource']['sortDataSource']);
    const headers = useSelector((state) => state['tableDataSource']['headers']);
    const selectedRows = useSelector((state) => state['tableDataSource']['selectedRows']);

    const [isDraggable, setIsDraggable] = React.useState(props.isDraggable);
    const [isSortable, setIsSortable] = React.useState(props.isSortable);
    const [isSelectable, setIsSelectable] = React.useState(props.isSelectable);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const selectAllRef = useRef<HTMLInputElement>(null);

    const handlers = new TableHandlers(dispatch, sortConfig);
    
    const onRowClick = (identifier) => {
        setSelectedRow(identifier);
    };

    const renderRow = (rowData, rowIndex) => {
        const rowIdentifier = rowData;
        const isSelected = selectedRow === rowIdentifier;
        const rowClasses = isSelected ? "bg-light-blue-500" : "";

        return (
            <tr key={rowIndex} className={`${rowClasses}`} onClick={() => onRowClick(rowIdentifier)}>
                {isSelectable && (
                    <td className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[38px]`}>
                        <Checkbox
                            checked={selectedRows.some(selectedRow => JSON.stringify(selectedRow) === JSON.stringify(rowData))}
                            onChange={() => handlers.toggleRowSelection(rowData)}
                            className='w-4 h-4'
                        />
                    </td>
                )}
                {headers.map((key) => (
                    <td key={key} className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[40px]`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {rowData[key.toLowerCase()]}
                        </Typography>
                    </td>
                ))}
            </tr>
        );
    };

    // Effect to update component state based on props changes
    React.useEffect(() => {
        handlers.handleHeaders(props.headers);
        handlers.handleDataSource(props.rows);
        setIsDraggable(props.isDraggable);
        setIsSortable(props.isSortable);
        setIsSelectable(props.isSelectable);
    }, [props.isDraggable, props.isSortable, props.isSelectable]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {isSelectable && ( // Render checkbox for select all if selectable
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-1">
                                <Checkbox
                                    ref={selectAllRef}
                                    checked={selectedRows.length === dataSource.length} // Check if all rows are selected
                                    onChange={handlers.toggleSelectAll} // Toggle select all handler
                                    className='w-4 h-4'
                                    onPointerEnterCapture={undefined} // Pointer enter capture handler
                                    onPointerLeaveCapture={undefined} // Pointer leave capture handler
                                    crossOrigin={undefined} // Cross origin attribute
                                />
                            </th>
                        )}
                        {headers.map((head, index) => (
                            <th
                                key={head}
                                className={`border-b border-blue-gray-100 bg-blue-gray-50 p-3 cursor-pointer`}
                                onClick={() => (isSortable ? handlers.sortRows(head) : null)} // Sort rows handler if sortable
                                draggable={isDraggable} // Draggable attribute based on flag
                                onDragStart={handlers.handleDragStart(index)} // Drag start handler
                                onDragOver={handlers.handleDragOver} // Drag over handler
                                onDrop={handlers.handleDrop(index)} // Drop handler
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head}{' '}
                                    {index !== headers.length - 1 && isSortable && ( // Render sort icon if sortable
                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                    )}
                                    {sortConfig?.key === head && isSortable && ( // Render sort direction indicator
                                        <span>{sortConfig.direction === 'ascending' ? '🔼' : '🔽'}</span>
                                    )}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map((row, index) => (
                        renderRow(row, index)
                    ))}
                </tbody>
            </table>
        </Suspense>
    );
};

export default DefaultTable;
