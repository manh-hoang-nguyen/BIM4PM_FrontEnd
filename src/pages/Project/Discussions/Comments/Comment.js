import React from 'react';
import PropTypes from 'prop-types';

export const Comment = props => {
  const { type, text } = props;
  return (
    <div>
      <p>type={type}</p>
      <p>{text}</p>
    </div>
  );
};

Comment.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
