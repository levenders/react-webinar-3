export const initialState = {
  items: [],
  count: 0,
  error: '',
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-waiting':
      return { ...state, items: [], waiting: true };
    case 'comments/load-successfull': {
      const { items, count } = action.payload;
      return { ...state, items, count, waiting: false, error: '' };
    }
    case 'comments/load-error':
      return {
        ...state,
        items: [],
        waiting: false,
        error: 'Комментарии не загружены',
      };
    case 'comments/add-successfull': {
      const newCount = state.count + 1;
      const newItems = [...state.items, action.payload];
      return { ...state, items: newItems, count: newCount, waiting: false, error: '' };
    }
    case 'comments/add-error':
      return { ...state, waiting: false, error: 'Комментарий не добавлен' };
    default:
      return state;
  }
}

export default reducer;
