# Promises

A Promise object models the eventual completition of an asynchronous task. 

## Promise States

Promises can have different states: 
* Fulfilled - When a promise is correctly completed
* Rejected - When a promise fails in its completition
* Pending - When a promise is still executing

### Fulfilled

May also be refferred as Resolved

```
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
```


### Rejected

Whenever a Promise implements a reject clause, a catch block is needed to handle the error case.
```
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
```

### Pending

Rarely used, but useful to know!
```
// Pending Promise
const pendingPromise = new Promise((resolve, reject) => {
  console.log("This code block runs indefinetely since it is pending");
});

console.log(pendingPromise); -> Promise { <pending> }
```

## Chaining Promises

Using promises stablishes that the code will be run asynchronously, this means that certain tasks will be completed depending on how they are processed. 

Usually a Promise returns another promise. A clear example of this is the ```fetch``` function in the Web Browser. After the promises handle said tasks, it is necessary to process the returned results. This can get achieved by using the ```.then()```, ```.catch()``` and ```.finally()``` methods, which themselves receive and return a promise. 

```
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
```

### ```.then()```
Executes another promise after the previous one resolves

### ```.catch()```
Executes another promise after any of the previous rejects. Useful to handle Errors.

### ```.finally()```
Executes a final promise after all of the previous promises resolve.

## ```Promise.all()```
Runs an iterable of promises and returns all of them when fulfilled
```
const promiseA = new Promise((resolve) => {
  resolve(42);
});
const promiseB = new Promise((resolve) => setTimeout(resolve(true), 500));
const promiseC = 15;

Promise.all([promiseA, promiseB, promiseC]).then((values) => {
  console.log(values);
});
```

## ```Promise.race()```
Runs an iterable of promises and returns the first fulfilled promise

```
Promise.race([promiseA, promiseB, promiseC]).then((value) => {
  console.log(value);
});
```

## ```Promise.any()```
Runs an iterable of promises and returns a single promise

```
const promiseD = Promise.reject(0);
const promiseE = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promiseF = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

Promise.any([promiseD, promiseE, promiseF]).then((value) => {
  console.log(value);
});

```