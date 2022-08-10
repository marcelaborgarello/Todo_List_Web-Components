const state = {
  data: {
    list: [],
  },

  listeners: [], // los callbacks
  getState() {
    return this.data;
  },
  setState(newState) {
    // modifica this.data (el state) e invoca los callbacks
    this.data = newState;

    // console.log(this.listeners);
    // console.log(this.data);

    this.listeners.forEach((cb) => {
      // console.log("invocando callback", cb);

      cb(newState);
    });
  },
  subscribe(callback: (any) => any) {
    // recibe callbacks para ser avisados posteriormente
    this.listeners.push(callback);
  },
  addItem(item: string) {
    // suma el nuevo item a la lista
    // this.data.list.push(item);
    // console.log(this.data);

    const cs = this.getState();
    cs.list.push(item);
    this.setState(cs);
  },
  removeItem(item: string) {
    // elimina el item de la lista
    const cs = this.getState();
    cs.list = cs.list.filter((i) => i !== item);
    this.setState(cs);
  },
  removeAllItem() {
    // elimina todos los items de la lista
    const cs = this.getState();
    cs.list = [];
    this.setState(cs);
  }
};
export { state };
