// 封装localStorage
const localStore = {
  get: function (key) {
    var value = localStorage.getItem(key);
    if (value) {
      try {
        var value_json = JSON.parse(value);
        if (typeof value_json === 'object') {
          return value_json;
        } else if (typeof value_json === 'number') {
          return value_json;
        }
      } catch (e) {
        return value;
      }
    } else {
      return false;
    }
  },
  set: function (key, value) {
    let value_str = ''
    if (typeof value === 'object') {
      value_str = JSON.stringify(value)
    } else {
      value_str = value
    }
    localStorage.setItem(key, value_str);
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
  clear: function () {
    localStorage.clear();
  }
};

export default localStore
