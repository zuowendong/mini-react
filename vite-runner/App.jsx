import React from "./core/react.js";

let fooCount = 1;
function Foo() {
  console.log("run foo");
  const update = React.update();

  function handleClick() {
    fooCount++;
    update();
  }

  return (
    <div>
      foo: {fooCount}
      <button onClick={handleClick}>change foo</button>
    </div>
  );
}

let barCount = 1;
function Bar() {
  console.log("run bar");
  const update = React.update();

  function handleClick() {
    barCount++;
    update();
  }

  return (
    <div>
      bar: {barCount}
      <button onClick={handleClick}>change bar</button>
    </div>
  );
}

let appCount = 1;
function App() {
  console.log("run app");
  const update = React.update();

  function handleClick() {
    appCount++;
    update();
  }

  return (
    <div>
      app: {appCount}
      <button onClick={handleClick}>change app</button>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  );
}

export default App;
