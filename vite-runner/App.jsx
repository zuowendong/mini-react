import React from "./core/react.js";

let hasChange = false;
function Counter() {
  // const Foo = <div>foo</div>;

  function Foo() {
    return <div>foo</div>;
  }

  const Bar = <p>bar</p>;

  function handleChange() {
    hasChange = !hasChange;
    React.update();
  }

  return (
    <div>
      <div> count: {hasChange ? Bar : <Foo></Foo>}</div>
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
