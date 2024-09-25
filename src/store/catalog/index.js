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
      listCount: [],
    };
  }

  async load(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
  async loadCount() {
    const response = await fetch(`api/v1/articles?fields=items(),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        listCount: json.result.count,
      },
      'Загружено количество товаров из АПИ',
    );
  }
}

export default Catalog;
