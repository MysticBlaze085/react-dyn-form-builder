//@ts-nocheck
import React, { Suspense, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableHandlers from './Table.handlers';

const Checkbox = React.lazy(() => import('@material-tailwind/react/components/Checkbox'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const ChevronUpIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronUpIcon'));
const ChevronDownIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronDownIcon'));

export interface TableRow {
    [key: string]: any;
}

export interface DefaultTableProps {
    headers: string[];
    rows: TableRow[];
    isDraggable?: boolean;
    isSortable?: boolean;
    isSelectable?: boolean;
    groupBy?: string;
    nestedHeaders?: string[];
    [key: string]: any;
}

const DefaultTable: React.FC<DefaultTableProps> = ({ nestedHeaders = [], groupBy, ...props }) => {
    const dispatch = useDispatch();
    const dataSource = useSelector((state) => state['tableDataSource']['dataSource']);
    const sortConfig = useSelector((state) => state['tableDataSource']['sortDataSource']);
    const headers = useSelector((state) => state['tableDataSource']['headers']);
    const selectedRows = useSelector((state) => state['tableDataSource']['selectedRows']);

    const [isDraggable, setIsDraggable] = React.useState(props.isDraggable);
    const [isSortable, setIsSortable] = React.useState(props.isSortable);
    const [isSelectable, setIsSelectable] = React.useState(props.isSelectable);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [expandedRows, setExpandedRows] = useState({});
    const selectAllRef = useRef<HTMLInputElement>(null);

    const handlers = new TableHandlers(dispatch, sortConfig);

    const onRowClick = (identifier) => {
        setSelectedRow(identifier);
    };

    const groupByData = (array, key) => {
        return array.reduce((result, currentValue) => {
            const groupKey = currentValue[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(currentValue);
            return result;
        }, {});
    };

    const groupedData = groupBy ? groupByData(dataSource, groupBy) : { '': dataSource };

    const hasNestedData = (rowData) => {
        return Object.values(rowData).some(
            (value) => Array.isArray(value) && value.length > 0 && typeof value[0] === 'object'
        );
    };

    const toggleRowExpansion = (rowIndex) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [rowIndex]: !prevState[rowIndex],
        }));
    };

    const renderNestedRows = (nestedData, nestedHeaders) => {
        return (
            <tr>
                <td colSpan={headers.length + (isSelectable ? 1 : 0)} className="p-0">
                    <table className="w-full min-w-max table-auto text-left bg-blue-100">
                        {/* <thead>
                            <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"></th>
                                {nestedHeaders.map((nestedHeader) => (
                                    <th key={nestedHeader} className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {nestedHeader}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead> */}
                        <tbody>
                            {nestedData.map((nestedRow, nestedIndex) => (
                                <tr key={nestedIndex}>
                                    <td className="border-b border-blue-gray-50 p-2 max-h-[40px] min-w-[60px] max-w-[60px]"></td>
                                    {nestedHeaders.map((key) => (
                                        <td
                                            key={key}
                                            className='border-b border-blue-gray-50 p-2 max-h-[40px] min-w-[60px] max-w-[60px]'
                                        >
                                            <Typography variant="small" color="blue-gray" className="font-normal ml-2">
                                                {nestedRow[key.toLowerCase()]}
                                            </Typography>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    };

    const renderRow = (rowData, rowIndex) => {
        const rowIdentifier = rowData;
        const isSelected = selectedRow === rowIdentifier;
        const isExpanded = expandedRows[rowIndex];
        const rowClasses = isSelected ? "bg-light-blue-50" : "";

        const nestedDataKey = Object.keys(rowData).find((key) => Array.isArray(rowData[key]) && rowData[key].length > 0);

        return (
            <React.Fragment key={rowIndex}>
                <tr className={`${rowClasses}`} onClick={() => onRowClick(rowIdentifier)}>
                    {isSelectable && (
                        <td className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[38px] max-w-[15px]`}>
                            <Checkbox
                                checked={selectedRows.some(selectedRow => JSON.stringify(selectedRow) === JSON.stringify(rowData))}
                                onChange={() => handlers.toggleRowSelection(rowData)}
                                className="w-4 h-4"
                            />
                        </td>
                    )}
                    {headers.map((key, index) => (
                        <td key={key} className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[40px] min-w-[60px] max-w-[60px]`} onClick={() => toggleRowExpansion(rowIndex)}>
                            <Typography variant="small" color="blue-gray" className="font-normal ml-2 flex items-center">
                                {rowData[key.toLowerCase()]}
                                {hasNestedData && nestedDataKey && index === headers.length - 1 && (
                                    isExpanded ? (
                                        <ChevronUpIcon
                                            strokeWidth={2}
                                            className="h-4 w-4 cursor-pointer mr-2 ml-auto"
                                            onClick={() => toggleRowExpansion(rowIndex)}
                                        />
                                    ) : (
                                        <ChevronDownIcon
                                            strokeWidth={2}
                                            className="h-4 w-4 cursor-pointer mr-2 ml-auto"
                                            onClick={() => toggleRowExpansion(rowIndex)}
                                        />
                                    )
                                )}
                            </Typography>
                        </td>
                    ))}
                </tr>
                {hasNestedData && isExpanded && nestedDataKey && renderNestedRows(rowData[nestedDataKey], nestedHeaders)}
            </React.Fragment>
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
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-1 max-w-[10px]">
                                <Checkbox
                                    ref={selectAllRef}
                                    checked={selectedRows.length === dataSource.length} // Check if all rows are selected
                                    onChange={handlers.toggleSelectAll} // Toggle select all handler
                                    className="w-4 h-4"
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
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 max-w-[15px]"
                                >
                                    {head}{' '}
                                    {index !== headers.length - 1 && isSortable && ( // Render sort icon if sortable
                                        <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
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
                    {Object.keys(groupedData).map((groupKey, groupIndex) => (
                        <React.Fragment key={groupKey}>
                            {groupBy ? (
                                <tr>
                                    <td colSpan={headers.length + (isSelectable ? 1 : 0)} className="p-0">
                                        {groupedData[groupKey].map((row, rowIndex) =>
                                            renderRow(row, `${groupKey}-${rowIndex}`)
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                groupedData[groupKey].map((row, rowIndex) =>
                                    renderRow(row, `${groupKey}-${rowIndex}`)
                                )
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </Suspense>
    );
};

export default DefaultTable;
