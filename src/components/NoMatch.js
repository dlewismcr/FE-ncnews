import React from "react";

const NoMatch = ({ location }) => {
  return (
    <div>
      <h2 className="nomatch">
        404 Error: No match found for <code>{location.pathname}</code>
      </h2>
    </div>
  );
};

export default NoMatch;
