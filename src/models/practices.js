const practices = {
  state: {
    data: {},
    disabled: false,
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
    _setDisabled: (state, payload) => ({
      ...state,
      disabled: payload.disabled,
      data: payload.data
    }),
  },
  effects: dispatch => ({
    setID({ id, onSucced }) {
      this._setID({ id });
      onSucced && onSucced();
    },
    setData({ data, disabled, onSucced }) {
      this._setDisabled({ data, disabled });      
      onSucced && onSucced();
    }
  }),
};

export default practices;