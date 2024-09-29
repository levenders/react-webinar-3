import { memo, useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import { useLanguage } from '../../context/language-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translate } from '../../utils';

function Basket() {
  const store = useStore();
  const { language } = useLanguage();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      store.actions.modals.close();
    }, [store]),
    navigateToProduct: useCallback(
      id => {
        store.actions.modals.close();
        store.actions.product.load(id);
      },
      [store.actions.modals],
    ),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            link={`/product/${item._id}`}
            language={language}
            onNavigate={callbacks.navigateToProduct}
            onRemove={callbacks.removeFromBasket}
          />
        );
      },
      [callbacks.removeFromBasket, language],
    ),
  };

  return (
    <ModalLayout
      title={translate(language, 'title.basket')}
      language={language}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal language={language} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
