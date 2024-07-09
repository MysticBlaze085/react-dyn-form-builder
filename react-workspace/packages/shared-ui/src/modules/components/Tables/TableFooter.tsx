//@ts-nocheck
import { Option, Select } from '@material-tailwind/react';
import React, { Suspense } from 'react';
import { setCurrentPage, setPagination } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';

const CardFooter = React.lazy(() => import('@material-tailwind/react/components/Card/CardFooter'));
const Typography = React.lazy(() => import('@material-tailwind/react/components/Typography'));
const ButtonDefault = React.lazy(() => import('../Button'));

interface TableFooterProps {
  pageSizes: string[];
}

const TableFooter: React.FC<TableFooterProps> = ({ ...props }) => {
  const [pageSizes, setPageSizes] = React.useState(props.pageSizes ?? ['5', '10', '15', '20', '25']);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state['tableDataSource']['pagination']['currentPage']);
  const totalPages = useSelector((state) => state['tableDataSource']['pagination']['totalPages']);
  const pageSize = useSelector((state) => state['tableDataSource']['pagination']['pageSize']);

  const handleNextClick = () => {
    const action = setCurrentPage(currentPage + 1);
    dispatch(action);
  };

  const handlePreviousClick = () => {
    const action = setCurrentPage(currentPage - 1);
    dispatch(action);
  };

  const handleInitialPagination = () => {
    const action = setPagination({ currentPage: 1, pageSize: 5 });
    dispatch(action);
  }

  const handlePageSizeChange = (e) => {
    const action = setPagination({ currentPage: 1, pageSize: e });
    dispatch(action);
  };


  React.useEffect(() => {
    handleInitialPagination();
    setPageSizes(props.pageSizes ?? ['5', '10', '15', '20', '25']);
  }, [props.pageSizes]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="flex flex-row font-normal">
          <span className='flex flex-col justify-center mr-2' style={{ whiteSpace: 'nowrap' }}>Page {currentPage} of {totalPages}</span>
          <Select
            label="Items per page"
            value={`${pageSize}`}
            onChange={handlePageSizeChange}
            color="blue"
          >
            {
              pageSizes.map((size, index) => (
                <Option key={index} value={size}>{size}</Option>
              ))
            }
          </Select>
        </Typography>
        {
          totalPages > 1 && (
            <div className="flex gap-2">
              <ButtonDefault size="sm" onClick={handlePreviousClick} color="blue" disabled={currentPage <= 1}>
                Previous
              </ButtonDefault>
              <ButtonDefault size="sm" onClick={handleNextClick} color="blue" disabled={currentPage >= totalPages}>
                Next
              </ButtonDefault>
            </div>
          )
        }
      </CardFooter>
    </Suspense>
  );
};

export default TableFooter;