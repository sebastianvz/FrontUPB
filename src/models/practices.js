const auth = {
  state: {
    data: {},
  },
  reducers: {
    _setData: (state, payload) => ({
      ...state,
      data: payload.data
    }),
  },
  effects: dispatch => ({
    
  }),
};

export default auth;