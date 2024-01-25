# 手摸手带你实现最简单的mini-react

## vite创建react

先来看一下 Vite 脚手架创建的 React 项目，终端里输入创建指令，

```shell
pnpm create vite
```

选择 React，然后选择最简单的 JavaScript 即可。

进入项目，src 下查看入口文件 main.jsx，代码如下：

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

以上代码中，react 的入口文件，`ReactDOM`有一个`createRoot`方法接收一个根节点作为参数，在根节点上渲染`App`视图。

修改 App.jsx 代码如下：

```js
function App() {
  return <div>hi, mini-react</div>;
}
export default App;
```

最终在页面上呈现`hi, mini-react`，这就是本篇文章需要实现的效果，同时需要实现满足 React 相同的API。

## 原生JS实现页面渲染

框架的能力最底层的实现还是依托 JS，那通过原生 JS 如何实现在页面上显示`hi, mini-react`

首先在 index.html 中确定一个`id`为`root`的`div`作为根节点。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>mini-react</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

### 创建div容器

通过`document.createElement`创建 dom 节点，

```js
const dom = document.createElement("div");
dom.id = "app";
document.querySelector("#root").append(dom);
```

### 创建文本节点

通过`document.createTextNode`创建文本节点，

```js
const textNode = document.createTextNode("");
textNode.nodeValue = "hi,mini-react";
dom.append(textNode);
```

在页面中就可以看到文本显示`hi,mini-react`

## 抽离虚拟节点

无论是 React 还是 Vue，其内部实现都有借助虚拟节点的技术。所谓虚拟节点就是 JS 对象，是对 dom节点的数据抽象。

### 直接定义

例如，上面创建的`id`为`app`的`dom`，抽离的虚拟节点可以是：

```js
const textEl = {
  type: "TEXT_ELEMENT",
  props: {
    nodeValue: "hi,mini-react",
    children: [],
  },
};
const el = {
  type: "div",
  props: {
    id: "app",
    children: [textEl],
  },
};
```

虚拟节点结合上面原生 JS 实现的代码，进行关键信息的替换，

```js
const dom = document.createElement(el.type);
dom.id = el.props.id;
document.querySelector("#root").append(dom);

const textNode = document.createTextNode("");
textNode.nodeValue = textEl.props.nodeValue;
dom.append(textNode);
```

这算是进行了一次小重构，再次来到页面中进行验证，文本正常显示。

###  函数创建

虚拟节点的实现不会是这样直接定义的，一般是通过函数创建生成的，根据两种类型的虚拟节点封装对应的函数。

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    },
  };
}
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

有了对应的创建虚拟节点的函数方法，之前直接定义的虚拟节点`el`, `textEl`就可以删除，换成函数调用的形式生成。

```js
const textEl = createTextNode('hi,mini-react')
const el = createElement('div', {id: 'app'}, textEl)
```

## 渲染函数

查看整个 main.js 的代码，在创建 dom 和文本节点这儿，有重复地方，可以尝试将这儿的逻辑抽离，单独封装成一个 `render` 函数，

```js
function render(el, container) {
  const dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(el.type);

  Object.keys(el.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = el.props[key];
    }
  });

  const children = el.props.children;
  children.forEach((child) => {
    render(child, dom);
  });

  container.append(dom);
}
```

render函数中处理 3 件事：
1. 创建 dom
2. 处理 props
3. 递归处理子节点

## 模拟React API

再次回到 Vite 创建的 React 应用中，入口文件代码如下：

```js
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

按照对象格式进行创建`ReactDOM`，

```js
const ReactDOM = {
  createRoot(container) {
    return {
      render(el) {
        render(el, container);
      },
    };
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(el)
```
以上代码中，可以发现已经和原本的 React 入口文件很相似了，唯一不同就是`App`，是因为还没有实现function component，该功能在后续文章会介绍实现。

按照原本 React 的文件导入，进行代码抽离到不同文件中。

新建 core 文件夹，core/react-dom.js 代码如下：

```js
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
```

core/react.js 代码如下：

```js
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}
function render(el, container) {
  const dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(el.type);
  Object.keys(el.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = el.props[key];
    }
  });
  const children = el.props.children;
  children.forEach((child) => {
    render(child, dom);
  });
  container.append(dom);
}
export default {
  render,
  createElement,
};
```

App.js 代码如下：

```js
import React from "./core/react.js";
const App = React.createElement("div", { id: "app" }, "App");
export default App;
```

入口文件 main.js 代码如下：

```js
import ReactDOM from "./core/react-dom.js";
import App from "./App.js";

ReactDOM.createRoot(document.querySelector("#root")).render(App);
```

至此，查看页面中文本渲染正常，最后的入口文件代码和最初的预期一致。