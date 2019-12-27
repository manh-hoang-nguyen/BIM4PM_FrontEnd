import React from "react";

export const Comment = props => {
  return (
    <div>
      <p>type={props.type}</p>
      <p>{props.text}</p>
    </div>
  );
};
