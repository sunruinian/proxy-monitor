const canvas = {
  getContext() {}
};
const FileStat = {
  isDirectory() {
    return {
      value: true
    };
  }
};
const FileSystemManager = {
  saveFile() {},
  moveFile() {},
  getFileStat() {
    return FileStat;
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

const SDK = {
  age: 12,
  Person,
  api() {
    return { name: 'folger' };
  },
  errorApi() {
    let a = b;
  },
  errorApiCbk(cbk) {
    cbk && cbk();
  },

  failCbk(options) {
    options.fail();
  },
  onError(cbk) {
    cbk();
  },
  argPropertyCallbackTimeout(options) {
    setTimeout(function () {
      options.success();
    }, 4000);
  },
  eventCallbackTimeout(cbk) {
    setTimeout(function () {
      cbk();
    }, 4000);
  },

  successAfterComplete(options) {
    options.complete();
    options.success();
  },

  failAfterComplete(options) {
    options.complete();
    options.fail();
  },
  argPropertyCallbackMultiCall(options) {
    options.success();
    setTimeout(function () {
      options.success();
    }, 100);
    setTimeout(function () {
      options.success();
    }, 200);
  },

  successOrFailCallbackMultiCall(options) {
    options.success();
    setTimeout(function () {
      options.fail();
    }, 100);
  },

  eventCallbackMultiCall(cbk) {
    cbk();
    setTimeout(function () {
      cbk();
    }, 100);
    setTimeout(function () {
      cbk();
    }, 200);
  },

  argCallbackSync(options) {
    options.fail();
  },
  argCallbackAsync(options) {
    setTimeout(function () {
      options.success();
    }, 10);
  },
  api1sync(cbk) {
    cbk &&
      cbk({
        errMsg: 'api1:ok'
      });
  },
  api2async(cbk) {
    setTimeout(function () {
      cbk &&
        cbk({
          errMsg: 'api2:ok'
        });
    }, 10);
  },
  api3sync(cbk) {
    cbk &&
      cbk({
        errMsg: 'api3:ok'
      });
  },
  api4async(cbk) {
    setTimeout(() => {
      cbk &&
        cbk({
          errMsg: 'api4:ok'
        });
    }, 20);
  },
  api5sync(cbk) {
    cbk &&
      cbk({
        errMsg: 'api5:ok'
      });
  },
  api6sync(cbk) {
    cbk &&
      cbk({
        errMsg: 'api6:ok'
      });
  },
  createCanvas() {
    return canvas;
  },
  getFileSystemManager() {
    return FileSystemManager;
  }
};

module.exports = {
  canvas,
  FileStat,
  FileSystemManager,
  SDK
};
