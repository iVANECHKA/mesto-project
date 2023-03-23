export default class Section {
  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card);
    })
  }
  addItem(card) {
    this._container.append(card)
  }
}