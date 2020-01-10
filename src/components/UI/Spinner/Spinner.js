import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Spinner = () => {
  return (
    <SyncLoader
      css={override}
      size={10}
      // size={"150px"} this also works
      color="#50E3C2"
    />
  );
};

export default Spinner;
