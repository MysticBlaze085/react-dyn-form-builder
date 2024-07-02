import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import React from 'react';
import { Typography } from "@material-tailwind/react";

// Define props interfaces
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

  const [tableProps, setTableProps] = React.useState(props);
  const [headers, setHeaders] = React.useState(props.headers);
  const [rows, setRows] = React.useState(props.rows);
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
  const [draggedColIndex, setDraggedColIndex] = React.useState(null);

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
    setTableProps(props);
    setHeaders(props.headers);
    setRows(props.rows);
  }, [props.headers, props.rows, props.isDraggable, props.isSortable]);

  const isDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  };
  

  const sortedRows = React.useMemo(() => {
    if (!sortConfig.key) return rows;
  
    const lowerCaseSortKey = sortConfig.key.toLowerCase();
  
    return [...rows].sort((a, b) => {
      const aValue = String(a[lowerCaseSortKey]).toLowerCase();
      const bValue = String(b[lowerCaseSortKey]).toLowerCase();
  
      // Check if the values are dates
      if (isDate(aValue) && isDate(bValue)) {
        const dateA = new Date(aValue) as any;
        const dateB = new Date(bValue) as any;
        return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
      } else {
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? Number(-1) : Number(1);
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
      }
      return 0;
    });
  }, [rows, sortConfig]);

  const sortRows = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {headers.map((head, index) => (
            <th
              key={head}
              className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer`}
              onClick={() => isSortable ? sortRows(head): null}
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
        {sortedRows.map((row, index) => {
          const isLast = index === rows.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex} className={classes}>
                  {value}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DefaultTable;