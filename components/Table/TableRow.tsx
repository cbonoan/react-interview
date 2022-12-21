import React, {useState, useEffect} from 'react';
import { alpha, styled, TableCellProps, Button, Stack } from '@mui/material';
import MuiTableRow from '@mui/material/TableRow';
import { CoreTableProps } from '.';
import { DefaultTableCell } from './TableCell';
import { get } from 'lodash';
import EditModal from '../Modals/ModalEdit';

export const DefaultTableRow = styled(MuiTableRow)(({ theme: { palette } }) => `
  &:hover {
    td {
      background: rgba(44, 44, 44, 0.5);
    }
  }
`);

interface PropTypes<T = any> extends CoreTableProps<T> {
  rowKey: string;
  row: any;
  rowIndex: number,
}

const Row = <T extends any>({
  config,
  rowKey,
  row,
  components = {},
}: PropTypes<T>) => {
  const [editModalOpen, setEditModalIsOpen] = useState(false);
  const handleEditModalOpen = () => {
    setEditModalIsOpen(!editModalOpen);
  }

  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  useEffect(() => {
      for (const r in row) {
        if (r === "attendance") {
          setAttendanceRecord(row[r]);
        } else if (r === "totalHours") {
          setTotalHours(row[r]);
        }
      }
  }, [row])

  const {
    TableRow = DefaultTableRow,
    TableCell = DefaultTableCell,
  } = components;

  return (
    <>
    {/* Wanted to create another modal to view all student information, i.e. name, id, phone number. This modal would also show a table view of all attendance records */}
    {/* Would want to figure out a better way to show edit and view modals otherwise these would be created for each row in the table */}
    <EditModal 
    isOpen={editModalOpen}
    handleCloseEditModal={() => setEditModalIsOpen(false)}
    attendanceRecord={attendanceRecord}/>

      <TableRow role="row" key={get(row, rowKey)}>
        {config.map(({ key, align, transformValue, render }) => {
          const data = get(row, key, '');
          const value = transformValue?.(data) || data;
          if (key !== 'buttons') {
            return (
              <TableCell key={key} align={align as TableCellProps['align']}>
                {render ? render(value, row) : value}
              </TableCell>
            );
          } else {
            return(
              <TableCell key={key} align={align as TableCellProps['align']}>
                  <Stack spacing={2} direction="row">
                    <Button variant='outlined' onClick={() => handleEditModalOpen()}>Edit</Button>
                    <Button variant='outlined'>View</Button>
                  </Stack>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </>
  );
};

export default Row;
