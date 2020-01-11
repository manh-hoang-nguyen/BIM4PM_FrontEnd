/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { fetchCatAndParam } from '../../../../store/actions/schedule';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import {
  Checkbox,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
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
} from '@material-ui/core';
import styles from './styles';

const CreateScheduleForm = props => {
  const { fetchCatAndParam, paramCategories, loading, classes } = props;
  const { projectId } = useParams();
  useEffect(() => {
    fetchCatAndParam(projectId);
  }, [fetchCatAndParam]);

  const [items, setItems] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleChange = category => event => {
    let checkedCategory;
    let xx = [];
    if (event.target.checked) {
      checkedCategory = paramCategories.filter(e => e.category === category);
      setSelectedCategory([...selectedCategory, category]);
      setItems([...items, checkedCategory[0]]);
      xx = [...items, checkedCategory[0]];
    } else {
      checkedCategory = items.filter(e => e.category !== category);
      setSelectedCategory(selectedCategory.filter(e => e !== category));
      setItems(checkedCategory);
      xx = checkedCategory;
    }
    const para1 = xx.map(item => {
      return item.parameters.map(parameter => parameter.name);
    });

    const parameterList = [].concat(...para1);
    setLeft([...new Set(parameterList)]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeaderStep2}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
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
                  checked={checked.indexOf(value) !== -1}
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

  let selectCategoryStep;
  if (loading) {
    selectCategoryStep = <Spinner />;
  } else {
    selectCategoryStep = paramCategories.map(item => {
      return (
        <FormControlLabel
          key={item.category}
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox onChange={handleChange(item.category)} />
          }
          label={item.category}
        />
      );
    });
  }

  const steps = getSteps();
  const getStepContent = step => {
    switch (step) {
      case 0:
        return selectCategoryStep;
      case 1:
        return (
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.rootStep2}
          >
            <Grid item>{customList('Parameters', left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.buttonStep2}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.buttonStep2}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList('Chosen', right)}</Grid>
          </Grid>
        );
      case 2:
        return <p>Finish</p>;
      default:
        return 'unknown step';
    }
  };
  const getNumberOfSteps = () => {
    return 3;
  };
  const handleNext = () => setActiveStep(activeStep + 1);

  const handleBack = () => setActiveStep(activeStep - 1);

  const handleReset = () => setActiveStep(0);

  // return (
  //   <Grid container className={classes.root} spacing={2}>
  //     <Grid item>
  //       <FormControl>
  //         <FormLabel>Category</FormLabel>
  //         <FormGroup> {selectCategoryStep} </FormGroup>
  //       </FormControl>
  //     </Grid>
  //     <Grid item>{customList('Parameters', left)}</Grid>
  //     <Grid item>
  //       <Grid container direction="column" alignItems="center">
  //         <Button
  //           variant="outlined"
  //           size="small"
  //           className={classes.button}
  //           onClick={handleCheckedRight}
  //           disabled={leftChecked.length === 0}
  //           aria-label="move selected right"
  //         >
  //           &gt;
  //         </Button>
  //         <Button
  //           variant="outlined"
  //           size="small"
  //           className={classes.button}
  //           onClick={handleCheckedLeft}
  //           disabled={rightChecked.length === 0}
  //           aria-label="move selected left"
  //         >
  //           &lt;
  //         </Button>
  //       </Grid>
  //     </Grid>
  //     <Grid item>{customList('Chosen', right)}</Grid>
  //   </Grid>
  // );

  return (
    <div className={classes.root}>
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
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === getNumberOfSteps() - 1 ? 'Finish' : 'Next'}
              </Button>
              <div> {getStepContent(activeStep)} </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CreateScheduleForm.propTypes = {
  classes: PropTypes.object,
  fetchCatAndParam: PropTypes.func.isRequired,
  paramCategories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    paramCategories: state.schedule.paramCategories,
    loading: state.schedule.loading,
  };
};

const mapDispatchToProps = { fetchCatAndParam };

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
