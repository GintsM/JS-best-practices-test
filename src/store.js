export default class Storage {
  constructor() {
    this.store = {};
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  getItem(key) {
    return this.store[key];
  }
}