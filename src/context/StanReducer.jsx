export const initialState = {
  pagination: null,
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
    default:
      return state;
  }
}
