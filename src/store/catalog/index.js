import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: 10,
      skip: 0,
      page: 1,
    };
  }

  setPage(page) {
    const { limit } = this.getState();
    const newState = {
      ...this.getState(),
      skip: (page - 1) * limit,
      page,
    };
    this.setState(newState);
    this.load();
  }

  async load() {
    const { skip, limit } = this.getState();
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}}&fields=items(_id, title, price),count`,
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары, количество товаро из АПИ',
    );
  }
}

export default Catalog;
