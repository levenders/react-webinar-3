import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Col from '../../components/col';
import Head from '../../components/head';
import Item from '../../components/item';
import List from '../../components/list';
import Loader from '../../components/loader';
import Menu from '../../components/menu';
import PageLayout from '../../components/page-layout';
import Pagination from '../../components/pagination';
import Row from '../../components/row';
import { useLanguage } from '../../context/language-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translate } from '../../utils';

function Main() {
  const store = useStore();
  const { language } = useLanguage();
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const page = parseInt(pageNumber, 10) || 1;

  useEffect(() => {
    store.actions.catalog.setPage(page);
    store.actions.catalog.load();
  }, [pageNumber]);

  const select = useSelector(state => {
    const listCount = state.catalog.count;
    const quantityProducts = state.catalog.limit;
    const isLoading = state.catalog.isLoading;

    return {
      isLoading,
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      listCount,
      page: state.catalog.page,
      pagesCount: Math.ceil(listCount / quantityProducts),
    };
  });

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setPage: useCallback(
      page => {
        store.actions.catalog.setPage(page);
        store.actions.catalog.load();
        navigate(`/page/${page}`);
      },
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          link={`/product/${item._id}`}
          language={language}
          onAdd={callbacks.addToBasket}
        />
      ),
      [callbacks.addToBasket, language],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate(language, 'title.main')} />
      <Row>
        <Col>
          <Menu language={language} />
        </Col>
        <Col>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            language={language}
            amount={select.amount}
            sum={select.sum}
          />
        </Col>
      </Row>
      <Loader when={select.isLoading}>
        <List list={select.list} renderItem={renders.item} />
        <Pagination pagesCount={select.pagesCount} page={select.page} setPage={callbacks.setPage} />
      </Loader>
    </PageLayout>
  );
}

export default memo(Main);
