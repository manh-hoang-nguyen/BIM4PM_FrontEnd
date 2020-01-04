import React from 'react';

export const Layout = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <>
      <div>Layout</div>
      <main>{children}</main>
    </>
  );
};
