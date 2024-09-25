import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
    };
  }
  setCurrentPage(newState) {
    this.setState({ currentPage: newState });
  }
}

export default Pagination;
