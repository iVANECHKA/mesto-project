export default class Section {
  constructor({renderer}, container) {
    // this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card);
    })
  }

  renderItem(item) {
    const card = this._renderer(item);
    this._addPrepend(card);
  }
  addItem(card) {
    this._container.append(card)
  }

  _addPrepend(card) {
    this._container.prepend(card)
  }
}