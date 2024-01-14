let taskId = 1;

function workLoop(IdleDeadline) {
  console.log(IdleDeadline.timeRemaining());
  taskId++;

  let shouldYield = false;
  while (!shouldYield) {
    console.log(`taskId: ${taskId} run task`);

    shouldYield = IdleDeadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
