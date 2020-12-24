// 防抖
function debounce(fn, delay) {
  let timer;
  return function() {
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      // 为什么不直接fn(arguments)，debounce和throttle常用在事件绑定里，需要修改this指向
      fn().applay(this, arguments)
    }, delay)
  }
}

// 节流
function throttle(fn, delay) {
  let waiting = false;
  return function() {
    if (waiting) return;
    waiting = true;
    setTimeout(() => {
      // 为什么不直接fn(arguments)，debounce和throttle常用在事件绑定里，需要修改this指向
      fn().applay(this, arguments);
      waiting = false;
    }, delay)
  }
}