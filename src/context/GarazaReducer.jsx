export const initialState = {
  data: {},
  filter: {},
  pagination: { offset: null, limit: null, current: 1 },
  // loader: false,
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'save_pagination':
      return {
        ...state,
        pagination: action.pagination,
      };
    case 'save_filters':
      return {
        ...state,
        filter: action.filters,
      };
    // case 'set_loader':
    //   return {
    //     ...state,
    //     loader: action.loader,
    //   };
    case 'update_filters_pagination':
      return {
        ...state,
        filter: action.filters,
        pagination: action.pagination,
      };
    case 'fetch_data':
      return { ...state, data: action.data };
    default:
      return state;
  }
}
