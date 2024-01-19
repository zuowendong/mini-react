import React from "./core/react.js";

function Foo() {
  const [count, setCount] = React.useState(1);
  const [bar, setBar] = React.useState("bar");
  function handleClick() {
    setCount((c) => c + 1);
    // setBar((b) => b + ",bar");
    setBar("bar,bar");
  }

  return (
    <div>
      foo: {count}
      <div>{bar}</div>
      <button onClick={handleClick}>change foo</button>
    </div>
  );
}

function App() {
  return (
    <div>
      app
      <Foo></Foo>
    </div>
  );
}

export default App;
