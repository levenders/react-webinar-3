import { memo, useCallback, useEffect } from 'react';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import Item from '../../components/item';
import List from '../../components/list';
import PageLayout from '../../components/page-layout';
import Pagination from '../../components/pagination';
import { useLanguage } from '../../context/language-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translate } from '../../utils';

function Main() {
  const store = useStore();
  const { language } = useLanguage();

  const quantityProducts = 10;

  useEffect(() => {
    store.actions.catalog.load(0);
    store.actions.catalog.loadCount();
  }, []);

  const select = useSelector(state => {
    const listCount = state.catalog.listCount;
    return {
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      listCount,
      currentPage: state.pagination.currentPage,
      pagesCount: Math.ceil(listCount / quantityProducts),
    };
  });

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setCurrentPage: useCallback(
      page => {
        store.actions.pagination.setCurrentPage(page);
        store.actions.catalog.load(page);
      },
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} />,
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate(language, 'title.main')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        pagesCount={select.pagesCount}
        currentPage={select.currentPage}
        setCurrentPage={callbacks.setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
