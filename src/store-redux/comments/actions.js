export default {
  /**
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, _, services) => {
      dispatch({ type: 'comments/load-waiting' });
      try {
        const url = `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`;
        const res = await services.api.request({ url });
        const { count, items } = res.data.result;
        dispatch({ type: 'comments/load-successfull', payload: { items, count } });
      } catch (error) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * @param data
   * @return {Function}
   */
  add: (data, userName, onSuccess) => {
    return async (dispatch, _, services) => {
      try {
        const res = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments`,
          body: JSON.stringify(data),
        });
        const payload = { ...res.data.result, author: { profile: { name: userName } } };
        dispatch({ type: 'comments/add-successfull', payload });
        if (onSuccess) onSuccess();
      } catch (error) {
        dispatch({ type: 'comments/add-error' });
      }
    };
  },
};
