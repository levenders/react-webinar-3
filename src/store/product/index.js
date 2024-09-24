import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {},
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title),category(title)`,
    );
    const json = await response.json();
    const { title, description, price, edition, madeIn, category } = json.result;
    this.setState(
      {
        ...this.getState(),
        title,
        description,
        price,
        edition,
        madeIn: madeIn.title,
        category: category.title,
      },
      'Загружен товар c производителем и категорией из АПИ',
    );
  }
}

export default Product;
