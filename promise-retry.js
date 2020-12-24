function PromiseRetry(fnOrFnList, times = 1, delay = 0) {
  function genPromise(fn) {
    return new Promise((resolve, reject) => {
      let error;
      function attempt() {
        if (times === -1) {
          reject(error);
        } else {
          fn()
            .then(resolve)
            .catch((e) => {
              times--;
              error = e;
              setTimeout(() => {
                attempt();
              }, delay);
            });
        }
      }
      attempt();
    });
  }
  if (Array.isArray(fnOrFnList)) {
    return fnOrFnList.map(fn => {
      return genPromise(fn);
    });
  }
  return genPromise(fnOrFnList);
}


let count = 0;
const fn1 = () => {
  return new Promise((resolve, reject) => {
    console.log('请求1');
    setTimeout(() => {
      if (count !== 3) {
        count++;
        reject(new Error('请求1失败'));
      } else {
        resolve({ code: '0', value: 1 });
      }
    }, 1000);
  });
};

const fn2 = () => {
  return new Promise((resolve, reject) => {
    console.log('请求2');
    setTimeout(() => {
      resolve({ code: '0', value: 2 });
    }, 1000);
  });
};

Promise.all(PromiseRetry([fn1, fn2], 2, 1000))
  .then((v) => {
    console.log(v);
  })
  .catch((err) => {
    console.log(err);
  });