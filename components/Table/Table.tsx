import { Box, CollapseProps, Skeleton, styled, TableProps } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { get, times } from 'lodash';
import React, { ForwardedRef, useMemo, useState } from 'react';
import { CoreTableProps } from '.';
import { DefaultTableCell } from './TableCell';
import { DefaultTableContainer } from './TableContainer';
import TableHeaderRow from './TableHeaderRow';
import TableRow, { DefaultTableRow } from './TableRow';

const DefaultTable = styled(MuiTable)``;

export interface PropTypes<T = any> extends CoreTableProps<T> {
  innerRef?: ForwardedRef<any>;
  rowKey: string;
  data: T[];
  loading?: boolean;
  error?: any;
  size?: TableProps['size'];
  role?: string;
  nowrap?: boolean;
  skeletonCount?: number;
  collapseTimeout?: CollapseProps['timeout'];
  autoSort?: boolean;
}

const Table = <T extends {}>({
  innerRef,
  config,
  rowKey,
  data,
  loading,
  error,
  components = {},
  size = 'medium',
  role,
  nowrap,
  skeletonCount = 10,
}: PropTypes<T>) => {

  const {
    TableContainer = DefaultTableContainer,
    Table = DefaultTable,
    TableCell = DefaultTableCell,
  } = components;

  const skeleton = useMemo(() => (
    times(skeletonCount).map((i) => (
      <DefaultTableRow key={i}>
        {config.map((col, idx) => (
          <TableCell key={idx} width={col.width}>
            <Skeleton />
          </TableCell>
        ))}
      </DefaultTableRow>
    ))
  ), [TableCell, config, skeletonCount]);

  const getTableContent = () => {
    if (loading) return skeleton;

    if (!data.length) return (
      <DefaultTableRow>
        <TableCell colSpan={config.length}>
          <Box textAlign="center">
            No Data
          </Box>
        </TableCell>
      </DefaultTableRow>
    );

    return (
      data.map((row: T, index: number) => {
        const rowId = get(row, rowKey);
        return (
          <TableRow
            key={rowId}
            config={config}
            rowKey={rowKey}
            row={row}
            rowIndex={index}
            components={components}
          />
        );
      })
    );
  };

  return (
    <>
      {error && (
        <Box sx={{ position: 'relative', top: 0, zIndex: 100, color: 'error.main' }}>
          {String(error)}
        </Box>
      )}
      <TableContainer ref={innerRef}>
        <Table stickyHeader aria-label="sticky table" size={size} role={role}>
          <TableHead>
            <TableHeaderRow
              config={config}
              components={components}
              nowrap={nowrap}
            />
          </TableHead>
          <TableBody>            
            {getTableContent()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Table;
