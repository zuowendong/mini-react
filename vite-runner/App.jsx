import React from "./core/react.js";

let hasChange = false;
function Counter() {
  const Foo = <div>foo</div>;

  function handleChange() {
    hasChange = !hasChange;
    React.update();
  }

  return (
    <div>
      Counter
      {hasChange && Foo}
      <button onClick={handleChange}>按钮</button>
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
