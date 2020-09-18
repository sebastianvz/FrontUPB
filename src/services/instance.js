import axios from 'axios';
import { TYPE_MESSAGE } from '../config/constants';
import GlobalVariables from '../variables/globalVariables';

class AxiosCreate {
  static _instance = null;
  
  constructor() {
    const headers = {};
    const variables = new GlobalVariables();

    this._instance = axios.create({
      baseURL: variables.Url,
      headers,
    });

    this._instance.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        switch (error.response.status) {
          case 401:
            window.location.href = `/logout`;
            break;
          case 409:
            return Promise.reject({
              message: error.response.data.message,
              type: TYPE_MESSAGE.Warning,
            });
          default:
            return Promise.reject(error);
        }
      },
    );
  }

  get instance() {
    return this._instance;
  }
}

const InstAx = new AxiosCreate();

InstAx.instance.setToken = function(token) {
  InstAx.instance.defaults.headers.Authorization = `Bearer ${token}`;
};

InstAx.instance.removeToken = function() {
  InstAx.instance.defaults.headers.Authorization = null;
};

export default InstAx.instance;
