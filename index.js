// 声明构造函数
function Promise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;
  this.callback = {};

  const _this = this;

  function resolve(data) {
    if (_this.PromiseState !== "pending") return;
    // 1. 修改对象状态 [[promiseState]]
    _this.PromiseState = "fulfilled";
    // 2. 设置对象结果值 [[promiseResult]]
    _this.PromiseResult = data;

    if (_this.callback.onResolved) {
      _this.callback.onResolved(data);
    }
  }
  function reject(data) {
    if (_this.PromiseState !== "pending") return;
    _this.PromiseState = "rejected";
    _this.PromiseResult = data;

    if (_this.callback.onReject) {
      _this.callback.onReject(data);
    }
  }

  try {
    // 执行器函数，同步调用
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onResolved, onReject) {
  // 调用回调函数
  if (this.PromiseState === "fulfilled") {
    onResolved(this.PromiseResult);
  }

  if (this.PromiseState === "rejected") {
    onReject(this.PromiseResult);
  }
  // 判断pending状态
  if (this.PromiseState === "pending") {
    // 保存回调函数
    this.callback = {
      onResolved,
      onReject,
    };
  }
};
