import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper, Button } from '@material-ui/core';

import MaterialTable from 'material-table';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getSchedule } from '../../../../store/actions/schedule';

import ExportExcel from '../../../../utils/exportExcel';

const Schedule = props => {
  const { loading, getSchedule, parameters, revitElements, schedule } = props;
  const { projectId, scheduleId } = useParams();

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
        <ExportExcel
          csvData={revitElements.map(el => {
            const object = {};
            parameters.forEach(para => {
              object[para] = el[para];
            });
            return object;
          })}
          fileName={schedule.name}
        />
      </div>

      <Paper>
        <MaterialTable
          title={schedule.name}
          columns={parameters.map(para => ({
            title: para,
            field: para,
          }))}
          data={revitElements}
          options={{
            search: true,
            filtering: true,
            sorting: true,
            grouping: true,
            exportButton: true,
            pageSize: 5,
            pageSizeOptions: [10, 20, 50],
          }}
        />
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
