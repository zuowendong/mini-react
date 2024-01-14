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
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };
  // const dom =
  //   el.type === "TEXT_ELEMENT"
  //     ? document.createTextNode("")
  //     : document.createElement(el.type);
  // Object.keys(el.props).forEach((key) => {
  //   if (key !== "children") {
  //     dom[key] = el.props[key];
  //   }
  // });
  // const children = el.props.children;
  // children.forEach((child) => {
  //   render(child, dom);
  // });
  // container.append(dom);
}

let nextWorkOfUnit = null;
function workLoop(IdleDeadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = preformWorkOfUnit(nextWorkOfUnit);

    shouldYield = IdleDeadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function preformWorkOfUnit(work) {
  // 1. 创建dom
  if (!work.dom) {
    const dom = (work.dom =
      work.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(work.type));

    work.parent.dom.append(dom);

    // 2. 处理props
    Object.keys(work.props).forEach((key) => {
      if (key !== "children") {
        dom[key] = work.props[key];
      }
    });
  }
  // 3. 转化链表，确定指针
  const children = work.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null,
    };

    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });

  // 4. 返回下一个
  if (work.child) {
    return work.child;
  }
  if (work.sibling) {
    return work.sibling;
  }
  return work.parent?.sibling;
}

export default {
  render,
  createElement,
};
