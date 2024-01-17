import React from "./core/react.js";

// const App = React.createElement("div", { id: "app" }, "App");

function Counter({ num }) {
  return (
    <div>
      count: {num}
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}

function handleClick() {
  console.log("click");
}

const App = (
  <div>
    hi, mini-react
    <Counter num={10}></Counter>
  </div>
);

export default App;
