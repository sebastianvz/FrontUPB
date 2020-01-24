import mapMenu from '../config/menus';

const config = {
  state: {
    menu: [],
  },
  reducers: {
    setMenu: (state, payload) => {
      return {
        ...state,
        menu: payload,
      };
    },
  },
  effects: {
    loadMenu(menu) {
      this.setMenu(mapMenu(menu));
    },
  },
};

export default config;
