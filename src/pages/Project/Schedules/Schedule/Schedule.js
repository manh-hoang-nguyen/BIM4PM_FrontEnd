import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';

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

const Schedule = props => {
  const {
    loading,
    getSchedule,
    parameters,
    revitElements,
    paramCategories,
  } = props;
  const { projectId, scheduleId } = useParams();

  const [pageSizes] = React.useState([5, 10, 15, 0]);
  const [columnOrder, setColumnOrder] = React.useState();
  const [hiddenColumnNames, setHiddenColumnNames] = useState([]);
  const [columnWidths, setColumnWidths] = useState();

  useEffect(() => {
    getSchedule(projectId, scheduleId);
  }, [getSchedule]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Paper>
        <Grid
          rows={revitElements}
          columns={parameters.map(para => ({ name: para, title: para }))}
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
          <TableColumnResizing
            defaultColumnWidths={parameters.map(para => ({
              columnName: para,
              width: 100,
            }))}
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
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
};

const mapStateToProps = state => {
  return {
    loading: state.schedule.loading,
    revitElements: state.schedule.revitElements,
    parameters: state.schedule.parameters,
    paramCategories: state.schedule.paramCategories,
  };
};

const mapDispatchToProps = { getSchedule };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
