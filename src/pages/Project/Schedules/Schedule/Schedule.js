import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Table, TableHead, TableRow, TablePagination } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import {
  getSchedule,
  getRevitElements,
} from '../../../../store/actions/schedule';

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
const rows = [];
const Schedule = props => {
  const {
    loading,
    getSchedule,
    schedule: { name, parameters, categories },
    getRevitElements,
  } = props;
  const { projectId, scheduleId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getSchedule(projectId, scheduleId);
    getRevitElements(projectId, categories);
  }, [getSchedule, getRevitElements]);

  let xhtml;
  if (parameters !== undefined) {
    xhtml = parameters.map(para => (
      <TableCell key={Math.random()}>{para}</TableCell>
    ));
  }
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
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>{xhtml}</TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {/* {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
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
      />
    </div>
  );
};

Schedule.propTypes = {
  loading: PropTypes.bool,
  getSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
  parameters: PropTypes.array,
  getRevitElements: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    loading: state.schedule.loading,
    schedule: state.schedule.schedule,
  };
};

const mapDispatchToProps = { getSchedule, getRevitElements };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
