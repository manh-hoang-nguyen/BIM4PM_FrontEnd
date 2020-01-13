import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Table,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table as TableGrid,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
  DragDropProvider,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getSchedule } from '../../../../store/actions/schedule';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString(),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString(),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toFixed(2),
//   },
// ];

const Schedule = props => {
  const { loading, getSchedule, parameters, revitElements } = props;
  const { projectId, scheduleId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageSizes] = React.useState([5, 10, 15, 0]);
  const [columnOrder, setColumnOrder] = React.useState([]);

  useEffect(() => {
    getSchedule(projectId, scheduleId);
    setColumnOrder(parameters);
  }, [getSchedule]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {/* <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {parameters.map(para => (
                <TableCell key={Math.random()}>{para}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {revitElements
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {parameters.map(para => {
                      const value = row[para];
                      return <TableCell key={para}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
      <div>
        <Paper>
          <Grid
            rows={revitElements}
            columns={parameters.map(para => ({ name: para }))}
          >
            <SearchState defaultValue="" />
            <PagingState defaultCurrentPage={0} defaultPageSize={5} />
            <IntegratedPaging />
            <IntegratedFiltering />
            <DragDropProvider />
            <TableGrid />
            <TableColumnReordering
              order={columnOrder}
              onOrderChange={setColumnOrder}
            />
            <TableHeaderRow />
            <Toolbar />
            <PagingPanel pageSizes={pageSizes} />
            <SearchPanel />
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

Schedule.propTypes = {
  loading: PropTypes.bool,
  getSchedule: PropTypes.func.isRequired,
  parameters: PropTypes.array.isRequired,
  revitElements: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    loading: state.schedule.loading,
    revitElements: state.schedule.revitElements,
    parameters: state.schedule.parameters,
  };
};

const mapDispatchToProps = { getSchedule };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
