//@ts-nocheck
import { IconButton, Tooltip } from '@material-tailwind/react';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonDefault from '../Button';
import TableHandlers from './Table.handlers';

const Checkbox = React.lazy(() => import('@material-tailwind/react/components/Checkbox'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const Accordion = React.lazy(() => import('@material-tailwind/react/components/Accordion'));
const AccordionHeader = React.lazy(() => import('@material-tailwind/react/components/Accordion/AccordionHeader'));
const AccordionBody = React.lazy(() => import('@material-tailwind/react/components/Accordion/AccordionBody'));
const ChevronUpDownIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronUpDownIcon'));
const ChevronDownIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronDownIcon'));
const ChevronUpIcon = React.lazy(() => import('@heroicons/react/24/outline/ChevronUpIcon'));

export interface TableRow {
    [key: string]: any;
}

export interface DefaultTableProps {
    headers: string[];
    rows: TableRow[];
    isDraggable?: boolean;
    isSortable?: boolean;
    isSelectable?: boolean;
    groupBy?: string; // Add groupBy property
    [key: string]: any;
}

const DefaultTable: React.FC<DefaultTableProps> = ({ ...props }) => {
    const dispatch = useDispatch();
    const dataSource = useSelector((state) => state['tableDataSource']['dataSource']);
    const sortConfig = useSelector((state) => state['tableDataSource']['sortDataSource']);
    const headers = useSelector((state) => state['tableDataSource']['headers']);
    const selectedRows = useSelector((state) => state['tableDataSource']['selectedRows']);
    const groupByDs = useSelector((state) => state['tableDataSource']['preferences']['groupBy']);

    const [isDraggable, setIsDraggable] = useState(props.isDraggable);
    const [isSortable, setIsSortable] = useState(props.isSortable);
    const [isSelectable, setIsSelectable] = useState(props.isSelectable);
    const [selectedRow, setSelectedRow] = useState(null);
    const [groupBy, setGroupBy] = useState(props.groupBy ?? '');
    const [groupedData, setGroupedData] = useState({ '': dataSource });
    const [openGroups, setOpenGroups] = useState([]);
    const selectAllRef = useRef<HTMLInputElement>(null);

    const handlers = new TableHandlers(dispatch, sortConfig);

    const onRowClick = (identifier) => {
        setSelectedRow(identifier);
    };

    // Handler to expand all groups
    const expandAll = () => {
        setOpenGroups(Object.keys(groupedData));
    };

    // Handler to collapse all groups
    const collapseAll = () => {
        setOpenGroups([]);
    };

    const groupByData = (array, key) => {
        const gKey = key.toLowerCase();

        return array.reduce((result, currentValue) => {
            const normalizedCurrentValue = {};
            for (const k in currentValue) {
                if (currentValue.hasOwnProperty(k)) {
                    normalizedCurrentValue[k.toLowerCase()] = currentValue[k];
                }
            }

            const groupKey = normalizedCurrentValue[gKey];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(currentValue);
            return result;
        }, {});
    };

    const renderRow = (rowData, rowIndex) => {
        const rowIdentifier = rowData;
        const isSelected = selectedRow === rowIdentifier;
        const rowClasses = isSelected ? "bg-light-blue-50" : "";

        return (
            <tr key={rowIndex} className={`${rowClasses}`} onClick={() => onRowClick(rowIdentifier)}>
                {isSelectable && (
                    <td className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[38px] max-w-[15px]`}>
                        <Checkbox
                            checked={selectedRows.some(selectedRow => JSON.stringify(selectedRow) === JSON.stringify(rowData))}
                            onChange={() => handlers.toggleRowSelection(rowData)}
                            className='w-4 h-4'
                        />
                    </td>
                )}
                {headers.map((key) => (
                    <td key={key} className={`border-b border-blue-gray-50 ${isSelectable ? 'p-1' : 'p-2'} max-h-[40px] min-w-[60px] max-w-[60px]`}>
                        <Typography variant="small" color="blue-gray" className="font-normal ml-2">
                            {rowData[key.toLowerCase()]}
                        </Typography>
                    </td>
                ))}
            </tr>
        );
    };

    // Effect to update component state based on props changes
    useEffect(() => {
        setGroupBy(props.groupBy);
        handlers.handleHeaders(props.headers);
        handlers.handleDataSource(props.rows);
        handlers.handleGroupBy(groupBy);
        setIsDraggable(props.isDraggable);
        setIsSortable(props.isSortable);
        setIsSelectable(props.isSelectable);
    }, [props.isDraggable, props.isSortable, props.isSelectable, props.groupBy]);

    useEffect(() => {
        if (groupByDs) setGroupBy(groupByDs);
        setGroupedData(groupByDs && groupByDs !== '' ? groupByData(dataSource, groupByDs) : { '': dataSource });
    }, [groupByDs, groupBy, dataSource]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {groupBy ? (
                <div className="flex justify-end gap-2">
                    <Tooltip content="Expand All">
                        <IconButton size="sm" variant="text" className="rounded-full">
                            <ChevronDownIcon onClick={expandAll} className="w-6 h-6 cursor-pointer" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Collapse All">
                        <IconButton size="sm" variant="text" className="rounded-full">
                            <ChevronUpIcon onClick={collapseAll} className="w-6 h-6 cursor-pointer" />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : null}

            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {isSelectable && ( // Render checkbox for select all if selectable
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-1 max-w-[10px]">
                                <Checkbox
                                    ref={selectAllRef}
                                    checked={selectedRows.length === dataSource.length} // Check if all rows are selected
                                    onChange={handlers.toggleSelectAll} // Toggle select all handler
                                    className='w-4 h-4'
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
                    {Object.keys(groupedData).map((groupKey) => (
                        <React.Fragment key={groupKey}>
                            {groupBy ? (
                                <tr>
                                    <td colSpan={headers.length + (isSelectable ? 1 : 0)} className="p-0">
                                        <Accordion open={openGroups.includes(groupKey)} icon={<ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />}>
                                            <AccordionHeader className="pl-2 text-base" onClick={() => setOpenGroups(openGroups.includes(groupKey) ? openGroups.filter(key => key !== groupKey) : [...openGroups, groupKey])}>
                                                {groupKey}
                                            </AccordionHeader>
                                            <AccordionBody className="p-0">
                                                <table className="w-full min-w-max table-auto text-left">
                                                    <tbody>
                                                        {groupedData[groupKey].map((row, rowIndex) => (
                                                            renderRow(row, `${groupKey}-${rowIndex}`)
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </AccordionBody>
                                        </Accordion>
                                    </td>
                                </tr>
                            ) : (
                                groupedData[groupKey].map((row, rowIndex) => (
                                    renderRow(row, `${groupKey}-${rowIndex}`)
                                ))
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </Suspense>
    );
};

export default DefaultTable;
