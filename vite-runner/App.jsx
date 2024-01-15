import React from "./core/react.js";

// const App = React.createElement("div", { id: "app" }, "App");

function Counter({ num }) {
  return <div>count: {num}</div>;
}

const App = (
  <div>
    hi, mini-react
    <Counter num={10}></Counter>
    <Counter num={20}></Counter>
    <div>
      A
      <div>
        B<div>D</div>
        <div>E</div>
      </div>
      <div>
        C<div>F</div>
        <div>G</div>
      </div>
    </div>
  </div>
);

export default App;
