import React from "./core/react.js";

let hasChange = false;
function Counter() {
  const Foo = (
    <div>
      foo
      <p>child1</p>
      <p>child2</p>
    </div>
  );

  // function Foo() {
  //   return (
  //     <div>
  //       <div>foo</div>
  //       <p>child1</p>
  //     </div>
  //   );
  // }

  const Bar = <div>bar</div>;

  function handleChange() {
    hasChange = !hasChange;
    React.update();
  }

  return (
    <div>
      <div> count: {hasChange ? Bar : Foo}</div>
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
