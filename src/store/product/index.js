import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      isLoading: true,
      product: {},
    };
  }

  async load(id) {
    this.setState({
      isLoading: true,
    });
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
        isLoading: false,
      },
      'Загружен товар c производителем и категорией из АПИ',
    );
  }

  async clear() {
    this.setState({
      product: {},
    });
  }
}

export default Product;
