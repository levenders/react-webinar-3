import { memo, useCallback } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import ArticleCard from '../../components/article-card';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import CommentsZone from '../../containers/comments-zone';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();
  const { t } = useTranslate();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { isAuth, userName } = useSelector(state => ({
    isAuth: state.session.exists,
    userName: state.session.user?.profile?.name,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback(
      (data, onSuccess) => dispatch(commentsActions.add(data, userName, onSuccess)),
      [userName],
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.commentsWaiting}>
        <CommentsZone
          comments={select.comments}
          count={select.commentsCount}
          articleId={params.id}
          onAdd={callbacks.addComment}
          isAuth={isAuth}
          userName={userName}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
