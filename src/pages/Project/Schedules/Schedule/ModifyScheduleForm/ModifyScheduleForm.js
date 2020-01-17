/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { fetchCatAndParam } from '../../../../../store/actions/schedule';
import { createSchedule } from '../../../../../store/actions/project';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import {
  Checkbox,
  Typography,
  FormControlLabel,
  Grid,
  withStyles,
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  FormControl,
} from '@material-ui/core';

import styles from './styles';
import SelectCategory from './SelectCategory';

const CreateScheduleForm = props => {
  const {
    fetchCatAndParam,
    paramCategories,
    loading,
    classes,
    createSchedule,
    schedule,
  } = props;
  const { projectId, scheduleId } = useParams();
  let textBtnFinish = 'Create';
  if (scheduleId) textBtnFinish = 'Update';
  const [items, setItems] = useState([]);
  const [nameSchedule, setNameSchedule] = useState();
  const [selectedCategory, setSelectedCategory] = useState(schedule.categories);
  const [selectedPara, setSelectedPara] = useState(schedule.parameters);
  const [parameterList, setParameterList] = useState([]);

  useEffect(() => {
    fetchCatAndParam(projectId);
    setParameterList([
      ...new Set(
        // eslint-disable-next-line prefer-spread
        [].concat
          .apply(
            [],
            paramCategories
              .filter(e => schedule.categories.includes(e.category))
              .map(item => item.parameters),
          )
          .map(item => item.name),
      ),
    ]);
  }, [fetchCatAndParam]);

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = category => event => {
    let checkedCategory;
    let arrParam = [];
    if (event.target.checked) {
      checkedCategory = paramCategories.filter(e => e.category === category);
      setSelectedCategory([...selectedCategory, category]);
      setItems([...items, checkedCategory[0]]);
      arrParam = [...items, checkedCategory[0]];
    } else {
      checkedCategory = items.filter(e => e.category !== category);
      setSelectedCategory(selectedCategory.filter(e => e !== category));
      setItems(checkedCategory);
      arrParam = checkedCategory;
    }
    const para1 = arrParam.map(item => {
      return item.parameters.map(parameter => parameter.name);
    });

    const parameterList = [].concat(...para1);

    setParameterList([...new Set(parameterList)]);
  };

  const handleToggle = value => () => {
    const currentIndex = selectedPara.indexOf(value);
    const newChecked = [...selectedPara];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedPara(newChecked);
  };

  const numberOfChecked = items => intersection(selectedPara, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setSelectedPara(not(selectedPara, items));
    } else {
      setSelectedPara(union(selectedPara, items));
    }
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeaderStep2}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            selectedPara={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.listStep2} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selectedPara.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const customSelectedList = (title, items) => (
    <Card>
      <CardHeader title={` ${title} ( ${items.length} ) `} />
      <Divider />
      <List dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem key={value} role="listitem" button>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  let step1;
  if (loading) {
    step1 = <Spinner />;
  } else {
    step1 = paramCategories.map(item => {
      return (
        <FormControl>
          <FormControlLabel
            key={item.category}
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                onChange={handleChange(item.category)}
                checked={selectedCategory.includes(item.category)}
              />
            }
            label={item.category}
          />
        </FormControl>
      );
    });
  }
  const getNumberOfSteps = () => {
    return 3;
  };
  const steps = getSteps();

  const getStepContent = step => {
    switch (step) {
      case 0:
        return step1;
      case 1:
        return (
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.rootStep2}
          >
            {' '}
            <div style={{ display: 'flex' }}>
              <Grid item>{customList('Parameters', parameterList)}</Grid>
            </div>
          </Grid>
        );
      case 2:
        return (
          <div>
            <p>{nameSchedule}</p>
            <Grid container classes={{ flexGrow: '1' }} spacing={2}>
              <Grid item xs={6}>
                {customSelectedList('Selected categories', selectedCategory)}
              </Grid>
              <Grid item xs={6}>
                {customSelectedList('Selected parameters', selectedPara)}
              </Grid>
            </Grid>
          </div>
        );
      default:
        return 'unknown step';
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === getNumberOfSteps() - 1) {
      createSchedule(
        projectId,
        nameSchedule,
        selectedCategory.join(','),
        selectedPara.join(','),
      );
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <div className={classes.root}>
      <SelectCategory />
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === getNumberOfSteps() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&quot;re finished
            </Typography>
            <Button
              size="small"
              onClick={handleReset}
              className={classes.button}
            >
              Create a new schedule?
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                size="small"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === getNumberOfSteps() - 1 ? textBtnFinish : 'Next'}
              </Button>
              <div> {getStepContent(activeStep)} </div>
            </div>
          </div>
        )}
      </div>
      {parameterList.map(item => (
        <p key={item}>item</p>
      ))}
    </div>
  );
};

CreateScheduleForm.propTypes = {
  classes: PropTypes.object,
  fetchCatAndParam: PropTypes.func.isRequired,
  paramCategories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  createSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    paramCategories: state.schedule.paramCategories,
    loading: state.schedule.loading,
    schedule: state.schedule.schedule,
  };
};

const mapDispatchToProps = { fetchCatAndParam, createSchedule };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CreateScheduleForm));

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}
function union(a, b) {
  return [...a, ...not(b, a)];
}
function getSteps() {
  return ['Select categories', 'Select parameters', 'Create a schedule'];
}
