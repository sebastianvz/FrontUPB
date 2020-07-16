const practices = {
  state: {
    data: {},
    enabled: false,
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
    _setEnabled: (state, payload) => ({
      ...state,
      enabled: payload
    }),
  },
  effects: dispatch => ({
    setID({ id, onSucced }) {
      this._setID({ id });
      onSucced && onSucced();
    },
    setData({ data, onSucced }) {
      this._setData({ data });
      this._setEnabled(true);
      onSucced && onSucced();
    }
  }),
};

export default practices;