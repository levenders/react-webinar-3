import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Col from '../../components/col';
import Head from '../../components/head';
import Loader from '../../components/loader';
import Menu from '../../components/menu';
import PageLayout from '../../components/page-layout';
import ProductContent from '../../components/product-content';
import Row from '../../components/row';
import { useLanguage } from '../../context/language-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function Product() {
  const store = useStore();
  const { language } = useLanguage();
  const { id } = useParams();

  useEffect(() => {
    store.actions.product.load(id);
    return () => {
      store.actions.product.clear();
    };
  }, []);

  const select = useSelector(state => ({
    isLoading: state.product.isLoading,
    title: state.product.title,
    content: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store, id]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.title} />
      <Row>
        <Col>
          <Menu language={language} />
        </Col>
        <Col>
          <BasketTool
            language={language}
            amount={select.amount}
            sum={select.sum}
            onOpen={callbacks.openModalBasket}
          />
        </Col>
      </Row>
      <Loader when={select.isLoading}>
        <ProductContent
          content={select.content}
          language={language}
          onAdd={callbacks.addToBasket}
        />
      </Loader>
    </PageLayout>
  );
}

export default memo(Product);
