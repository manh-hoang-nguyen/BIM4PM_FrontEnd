import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
  withStyles,
  TableHead,
  TableRow,
  Button,
  Modal,
} from '@material-ui/core';
import styles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TablePagination from '@material-ui/core/TablePagination';
import uppercaseFirstLetter from '../../../utils/uppercaseFirstLetterString';
import { useParams } from 'react-router-dom';
import CreateScheduleForm from './CreateScheduleForm/CreateScheduleForm';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
];
const rows = [];
const Schedules = props => {
  const { loading, revitElements, classes, parameters } = props;
  const { projectId } = useParams();

  const col = parameters.map(param => ({
    id: param.name,
    label: uppercaseFirstLetter(param.name),
    align: 'left',
    format: value => value.toFixed(2),
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>Create Project</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <CreateScheduleForm />
          </div>
        </Modal>
      </div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
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
      />
    </div>
  );
};

Schedules.propTypes = {
  loading: PropTypes.bool.isRequired,
  revitElements: PropTypes.array.isRequired,
  parameters: PropTypes.array.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.schedule.loading,
  revitElements: state.schedule.revitElements,
  parameters: state.schedule.parameters,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Schedules));
