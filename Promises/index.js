// Promises

// Fulfilled Promise
const fulfilledPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved Promise after 3s!");
  }, 3000);
});

fulfilledPromise.then((value) => {
  console.log("This code block is run if and when the promise is fulfilled");
  console.log(value);
});

// Pending Promise
const pendingPromise = new Promise((resolve, reject) => {
  console.log("This code block runs indefinetely since it is pending");
});

console.log(pendingPromise);

// Rejected Promise
const rejectedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Rejected Promise after 1s!");
  }, 1000);
});

rejectedPromise
  .then((value) => {
    console.log("This code block is run if and when the promise is fulfilled");
    console.log(value);
  })
  .catch((err) => {
    console.log("This code block is run if and when the promise is rejected");
    console.log(err);
  });

// Chained Promises
const chainedPromise = new Promise((resolve, reject) => {
  const randomlyResolveOrReject = Math.floor(Math.random() * 100) % 2 === 0;
  setTimeout(() => {
    if (randomlyResolveOrReject) {
      resolve("Resolve");
    }
    reject("Reject");
  }, 300);
});

const handleFulfilled = () => {
  console.log("chainedPromise");
  return chainedPromise;
};

const handleRejected = (err) => {
  console.log(err);
};

chainedPromise
  .then(handleFulfilled, handleFulfilled)
  .then(handleFulfilled, handleFulfilled)
  .then(handleFulfilled, handleFulfilled)
  .catch((err) => {
    console.log("chainedPromise: %o", err);
  })
  .finally(() => {
    console.log("ChainedPromise reached finally clause");
  });

// Promise.all ->  Runs an iterable of promises and returns all of them when fulfilled
const promiseA = new Promise((resolve) => {
  resolve(42);
});
const promiseB = new Promise((resolve) => setTimeout(resolve(true), 500));
const promiseC = 15;

Promise.all([promiseA, promiseB, promiseC]).then((values) => {
  console.log(values);
});

// Promise.race -> Runs an iterable of promises and returns the first fulfilled promise
Promise.race([promiseA, promiseB, promiseC]).then((value) => {
  console.log(value);
});

// Promise.any -> Runs an iterable of promises and returns a single promise
const promiseD = Promise.reject(0);
const promiseE = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promiseF = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

Promise.any([promiseD, promiseE, promiseF]).then((value) => {
  console.log(value);
});
