import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

import { categoriesSelected } from '../../../../../store/actions/schedule';

const SelectCategory = props => {
  const { schedule, paramCategories, categoriesSelected } = props;
  const [items, setItems] = useState([]);
  useEffect(() => {
    categoriesSelected(items);
  }, [items]);
  const handleChange = category => event => {
    let checkedCategory;

    if (event.target.checked) {
      checkedCategory = paramCategories.filter(e => e.category === category);
      setItems([...items, checkedCategory[0]]);
    } else {
      checkedCategory = items.filter(e => e.category !== category);
      setItems(checkedCategory);
    }
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
