import { SortableTableProvider, useSortableTable } from "../../../../tw-form-ui/directives";

import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import React from 'react';
import { Typography } from "@material-tailwind/react";

interface TableRow {
  [key: string]: any;
}

interface DefaultTableProps {
  headers: string[];
  rows: TableRow[];
  isDraggable?: boolean;
  isSortable?: boolean;
}

const DefaultTable: React.FC<DefaultTableProps> = ({ ...props }) => {
  const [isDraggable, setIsDraggable] = React.useState(props.isDraggable);
  const [isSortable, setIsSortable] = React.useState(props.isSortable);
  const [headers, setHeaders] = React.useState(props.headers);
  const [rows, setRows] = React.useState(props.rows);
  const [draggedColIndex, setDraggedColIndex] = React.useState(null);

  const { rowData, sortRows, sortConfig } = useSortableTable();

  const handleDragStart = (index) => (event) => {
    setDraggedColIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (targetIndex) => (event) => {
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

  React.useEffect(() => {
    setIsDraggable(props.isDraggable);
    setIsSortable(props.isSortable);
    setHeaders(props.headers);
    setRows(props.rows);
  }, [props.headers, props.rows, props.isDraggable, props.isSortable]);

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {headers.map((head, index) => (
            <th
              key={head}
              className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer`}
              onClick={() => isSortable ? sortRows(head) : null}
              draggable={isDraggable}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={handleDrop(index)}
            >
              {
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}{" "}
                  {index !== headers.length - 1 && isSortable && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                  {sortConfig?.key === head && isSortable && (
                    <span>{sortConfig.direction === 'ascending' ? '🔼' : '🔽'}</span>
                  )}
                </Typography>
              }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row, index) => {
          const isLast = index === rows.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex} className={classes}>
                  {value as React.ReactNode}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// export default DefaultTable;
const TableDefault = ({ ...props }) => {
  return (
    <SortableTableProvider initialRows={props.rows}>
      <DefaultTable  {...props as any} />
    </SortableTableProvider>
  );
};

export default TableDefault;