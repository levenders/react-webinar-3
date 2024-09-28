import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProductContent from '../../components/product-content';
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
      <BasketTool
        language={language}
        amount={select.amount}
        sum={select.sum}
        onOpen={callbacks.openModalBasket}
      />
      <ProductContent content={select.content} language={language} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
