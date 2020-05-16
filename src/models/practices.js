const practices = {
  state: {
    data: {},
  },
  reducers: {
    _setData: (state, payload) => ({
      ...state,
      data: payload.data
    }),
    _setID: (state, payload) => ({
      ...state,
      data: payload
    }),
  },
  effects: dispatch => ({
    setID({ id, onSucced }) {
      this._setID({ id });
      onSucced && onSucced();
    }
  }),
};

export default practices;