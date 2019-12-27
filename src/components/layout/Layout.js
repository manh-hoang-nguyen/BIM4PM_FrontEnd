import React from "react";

export const Layout = (props) => {
  return (
    <React.Fragment>
      <div>Layout</div>
      <main>
          {props.children}
      </main>
    </React.Fragment>
  );
};
