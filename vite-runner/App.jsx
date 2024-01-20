import React from "./core/react.js";

function Foo() {
  console.log("run foo");

  const [count, setCount] = React.useState(1);
  const [bar, setBar] = React.useState("bar");
  function handleClick() {
    setCount((c) => c + 1);
    setBar((b) => b + ",bar");
    // setBar("bar");
  }

  React.useEffect(() => {
    console.log("init");
    return () => {
      console.log(0);
    };
  }, []);
  React.useEffect(() => {
    console.log("update", count);
    return () => {
      console.log(1);
    };
  }, [count]);
  React.useEffect(() => {
    console.log("update", bar);
    return () => {
      console.log(2);
    };
  }, [bar]);

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
