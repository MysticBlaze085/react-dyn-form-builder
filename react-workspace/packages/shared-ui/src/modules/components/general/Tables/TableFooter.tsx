// @ts-nocheck
import { CardFooter, Typography } from "@material-tailwind/react";

import ButtonDefault from "../Button";
import React from 'react';

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const TableFooter: React.FC<TableFooterProps> = ({ currentPage, totalPages, onPreviousClick, onNextClick }) => {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page {currentPage} of {totalPages}
      </Typography>
      <div className="flex gap-2">
        <ButtonDefault size="sm" onClick={onPreviousClick} color="blue" disabled={currentPage <= 1}>
          Previous
        </ButtonDefault>
        <ButtonDefault size="sm" onClick={onNextClick} color="blue" disabled={currentPage >= totalPages}>
          Next
        </ButtonDefault>
      </div>
    </CardFooter>
  );
};

export default TableFooter;