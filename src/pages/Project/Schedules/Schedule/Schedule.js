import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper, Typography, Button } from '@material-ui/core';

import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  ColumnChooser,
  TableColumnVisibility,
  TableColumnResizing,
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
import uppercaseFirstLetterString from '../../../../utils/uppercaseFirstLetterString';
import ExportExcel from '../../../../utils/exportExcel';

const Schedule = props => {
  const {
    loading,
    getSchedule,
    parameters,
    revitElements,
    paramCategories,
    schedule,
  } = props;
  const { projectId, scheduleId } = useParams();

  const [pageSizes] = React.useState([5, 10, 15, 0]);
  const [columnOrder, setColumnOrder] = React.useState();
  const [hiddenColumnNames, setHiddenColumnNames] = useState([]);
  const [columnWidths, setColumnWidths] = useState();
  const location = useLocation();
  useEffect(() => {
    getSchedule(projectId, scheduleId);
  }, [getSchedule]);

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ margin: ' 3px 0' }}>
      <div>
        <Link
          to={`${location.pathname}/modify`}
          style={{ textDecoration: 'none' }}
        >
          <Button size="small" variant="outlined" color="primary">
            Modify
          </Button>
        </Link>
        <ExportExcel csvData={revitElements} fileName={schedule.name} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '3px' }}>
        <Typography variant="h5">{schedule.name}</Typography>
      </div>

      <Paper>
        <Grid
          rows={revitElements}
          columns={parameters.map(para => ({
            name: para,
            title: uppercaseFirstLetterString(para),
          }))}
        >
          <SearchState />
          <PagingState defaultCurrentPage={0} defaultPageSize={5} />
          <IntegratedPaging />
          <IntegratedFiltering />
          <DragDropProvider />
          <TableGrid />

          <TableColumnReordering
            defaultOrder={parameters}
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
  );
};

Schedule.propTypes = {
  loading: PropTypes.bool,
  getSchedule: PropTypes.func.isRequired,
  parameters: PropTypes.array.isRequired,
  revitElements: PropTypes.array.isRequired,
  paramCategories: PropTypes.array.isRequired,
  schedule: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    loading: state.schedule.loading,
    revitElements: state.schedule.revitElements,
    parameters: state.schedule.parameters,
    paramCategories: state.schedule.paramCategories,
    schedule: state.schedule.schedule,
  };
};

const mapDispatchToProps = { getSchedule };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
