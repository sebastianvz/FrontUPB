// import { getPersistor } from '@rematch/persist';

import instance from '../services/instance';
import { authenticationService } from '../services/security/auth';
// import { showTranslate } from '../utils/message';
// import { TYPE_MESSAGE } from '../config/constants';

const showAlert = e => {
  //   showTranslate(
  //     e.type
  //       ? e
  //       : {
  //           type: TYPE_MESSAGE.Error,
  //           message: e.toString(),
  //         },
  //   );
};

const getPermission = menus => {
  const permissions = {};
  function getData(data) {
    data.forEach(menu => {
      permissions[menu.name] = menu.permisssions.map(e => e.name)
      if(menu.submenus) {
        getData(menu.submenus);
      }
    });
  }
  getData(menus);
  return permissions;
};

const auth = {
  state: {
    token: null,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state, payload) => ({
      ...state,
      ...payload,
      isAuthenticated: !!payload.token,
    }),
    setLogout: () => ({
      token: null,
      user: {},
      isAuthenticated: false,
    }),
  },
  effects: dispatch => ({
    async authentication(credentials) {
      try {
        const promise = await authenticationService(
          credentials.username,
          credentials.password,
        );

        const data = await promise.data;
        const { username, nombreCompleto, apellidos, token, menus, id, roleName } = data.data;
        this.setAuthenticated({
          user: {
            id,
            username,
            role: roleName,
            fullName: `${nombreCompleto} ${apellidos}`
          },
          permisssions: getPermission(menus),
          token
        });
        instance.setToken(token);
        if (menus.length > 0) {
          dispatch.config.loadMenu(menus);
        }
      } catch (e) {
        this.setAuthenticated({ user: {}, token: null });
        showAlert(e);
      }
    },
    // async validateAuth(dto) {
    //   try {
    //     const promise = await validateAuthService(dto.token);
    //     const data = await promise.data;
    //     console.log('AUTH', data);
    //     dto.onValidated(data);
    //   } catch (e) {
    //     showAlert(e);
    //   }
    // },
    // async changePassword(dto) {
    //   try {
    //     const promise = await changePasswordService(dto.values);
    //     const data = await promise.data;
    //     dto.onChanged(data);
    //   } catch (e) {
    //     showAlert(e);
    //   }
    // },
    // logout({ onLogout }) {
    //   const persistor = getPersistor();
    //   persistor.purge();
    //   instance.removeToken();
    //   dispatch.config.setMenu([]);
    //   this.setLogout();
    //   onLogout();
    // },
  }),
};

export default auth;