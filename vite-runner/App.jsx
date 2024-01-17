import React from "./core/react.js";

// const App = React.createElement("div", { id: "app" }, "App");

let countNum = 10;
function Counter() {
  function handleClick() {
    console.log("click");
    countNum++;
    React.update();
  }
  return (
    <div>
      count: {countNum}
      <button onClick={handleClick}>按钮</button>
    </div>
  );
}

const App = (
  <div>
    hi, mini-react
    <Counter></Counter>
  </div>
);

export default App;
