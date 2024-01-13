import React from "./react.js";

const ReactDOM = {
  createRoot(container) {
    return {
      render(el) {
        React.render(el, container);
      },
    };
  },
};

export default ReactDOM;
