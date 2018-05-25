const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log('I am about to run a query');

  const key = {
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  };

  console.log(key);

  return exec.apply(this, arguments);
}