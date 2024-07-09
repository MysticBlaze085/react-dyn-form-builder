// @ts-nocheck
import React, { Suspense, useRef } from 'react';
import { dragDrop, dragStart, setHeaders, setSelectedRows, setTableDataSource, sortDataSource, toggleSelectedAllRows } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

const Checkbox = React.lazy(() => import('@material-tailwind/react/components/Checkbox'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const ChevronUpDownIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronUpDownIcon'));

interface TableRow {
    [key: string]: any; // Interface for table rows, allowing any properties
}

interface DefaultTableProps {
    headers: string[];
    rows: TableRow[];
    isDraggable?: boolean;
    isSortable?: boolean;
    isSelectable?: boolean;
    [key: string]: any; // Props allowing any additional custom properties
}

const DefaultTable: React.FC<DefaultTableProps> = ({ ...props }) => {
    const dispatch = useDispatch(); // Redux dispatch function
    const dataSource = useSelector((state) => state['tableDataSource']['dataSource']); // Selecting data source from Redux state
    const sortConfig = useSelector((state) => state['tableDataSource']['sortDataSource']); // Selecting sort configuration from Redux state
    const headers = useSelector((state) => state['tableDataSource']['headers']); // Selecting headers from Redux state
    const selectedRows = useSelector((state) => state['tableDataSource']['selectedRows']); // Selecting selected rows from Redux state

    const [isDraggable, setIsDraggable] = React.useState(props.isDraggable); // State for draggable flag
    const [isSortable, setIsSortable] = React.useState(props.isSortable); // State for sortable flag
    const [isSelectable, setIsSelectable] = React.useState(props.isSelectable); // State for selectable flag
    const selectAllRef = useRef<HTMLInputElement>(null); // Ref for select all checkbox

    // Handler for drag start on headers
    const handleDragStart = (index: number) => (event: React.DragEvent<HTMLTableCellElement>) => {
        const action = dragStart(index); // Dispatch drag start action
        dispatch(action);
    };

    // Handler for drag over events
    const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
        event.preventDefault(); // Prevent default behavior
    };

    // Handler for drop events
    const handleDrop = (targetIndex: number) => (event: React.DragEvent<HTMLTableCellElement>) => {
        event.preventDefault(); // Prevent default behavior
        const action = dragDrop(targetIndex); // Dispatch drag drop action with target index
        dispatch(action);
    };

    // Handler to set headers in Redux state
    const handleHeaders = (headers: string[]) => {
        const action = setHeaders(headers); // Dispatch set headers action
        dispatch(action);
    };

    // Handler to set data source in Redux state
    const handleDataSource = (rows: TableRow[]) => {
        const action = setTableDataSource(rows); // Dispatch set table data source action
        dispatch(action);
    };

    // Handler to sort rows based on header key
    const sortRows = (key: string) => {
        const action = sortDataSource({ key, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' }); // Dispatch sort data source action with key and direction
        dispatch(action);
    };

    // Handler to toggle selection of a single row
    const toggleRowSelection = (row: TableRow) => {
        const action = setSelectedRows(row); // Dispatch set selected rows action with row data
        dispatch(action);
    };

    // Handler to toggle selection of all rows
    const toggleSelectAll = () => {
        const action = toggleSelectedAllRows(); // Dispatch toggle selected all rows action
        dispatch(action);
    };

    // Handler to handle pagination changes
    const handlePagination = (page: number, limit: number) => {
        // Handle pagination changes
        setPagination({ page, limit });
    };

    // Effect to update component state based on props changes
    React.useEffect(() => {
        handleHeaders(props.headers); // Update headers in Redux state
        handleDataSource(props.rows); // Update data source in Redux state
        setIsDraggable(props.isDraggable); // Update draggable flag
        setIsSortable(props.isSortable); // Update sortable flag
        setIsSelectable(props.isSelectable); // Update selectable flag
    }, [props.isDraggable, props.isSortable, props.isSelectable]); // Dependencies for effect

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
                                    onChange={toggleSelectAll} // Toggle select all handler
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
                                onClick={() => (isSortable ? sortRows(head) : null)} // Sort rows handler if sortable
                                draggable={isDraggable} // Draggable attribute based on flag
                                onDragStart={handleDragStart(index)} // Drag start handler
                                onDragOver={handleDragOver} // Drag over handler
                                onDrop={handleDrop(index)} // Drop handler
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
                        <tr key={index}>
                            {isSelectable && ( // Render checkbox for row selection if selectable
                                <td className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[38px]`}>
                                    <Checkbox
                                        checked={selectedRows.some(selectedRow => JSON.stringify(selectedRow) === JSON.stringify(row))} // Check if row is selected
                                        onChange={() => toggleRowSelection(row)} // Toggle row selection handler
                                        className='w-4 h-4'
                                        onPointerEnterCapture={undefined} // Pointer enter capture handler
                                        onPointerLeaveCapture={undefined} // Pointer leave capture handler
                                        crossOrigin={undefined} // Cross origin attribute
                                    />
                                </td>
                            )}
                            {headers.map((key) => (
                                <td key={key} className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[40px]`}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {row[key.toLowerCase()]} {/* Render cell data */}
                                    </Typography>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Suspense>
    );
};

export default DefaultTable;
