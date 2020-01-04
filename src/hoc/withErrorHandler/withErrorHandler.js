import React from 'react';

import httpErrorHandler from '../../hooks/http-error-handler';
import { Modal } from '@material-ui/core';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = httpErrorHandler(axios);

    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
