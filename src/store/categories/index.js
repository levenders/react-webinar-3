import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async getCategories() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'получение категорий',
    );

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        categories: json.result.items,
        waiting: false,
      },
      'Загружен список категорий',
    );
  }
}

export default CategoriesState;
