import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

import { categoriesSelected } from '../../../../../store/actions/schedule';

const SelectCategory = props => {
  const { schedule, paramCategories, categoriesSelected } = props;

  const [selectedCategory, setSelectedCategory] = useState(schedule.categories);

  const handleChange = category => event => {
    if (event.target.checked) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(selectedCategory.filter(e => e !== category));
    }
    categoriesSelected(selectedCategory);
  };
  return (
    <>
      {paramCategories.map(item => (
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
      ))}
    </>
  );
};

SelectCategory.propTypes = {
  paramCategories: PropTypes.array.isRequired,
  schedule: PropTypes.object.isRequired,
  categoriesSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paramCategories: state.schedule.paramCategories,
  schedule: state.schedule.schedule,
});

const mapDispatchToProps = { categoriesSelected };

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
