import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import { fastLogin, getUser, getAA10 } from "../apis";
import codeItem from "../utils/code-item";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firm: "",
    access_token: "",
    user: {},
    active: ""
  },
  mutations: {
    setActive(state, active) {
      state.active = active;
    },
    [types.SET_FIRM](state, firm) {
      Vue.ls.set(types.FIRM, firm, 1 * 24 * 60 * 60 * 1000);
      state.firm = firm;
    },
    [types.SET_ACCESS_TOKEN](state, session) {
      Vue.ls.set(
        types.ACCESS_TOKEN,
        session.access_token,
        parseInt(session.expires_in)
      );
      state.access_token = session.access_token;
    },
    [types.SET_USER](state, user) {
      state.user = user;
    },
    [types.REMOVE_ALL](state) {
      state.firm = "";
      state.access_token = "";
      state.user = {};
      Vue.ls.clear();
    }
  },
  getters: {
    name: state => {
      return state.user.name;
    },
    idcard: state => {
      return state.user.idcard;
    },
    ssciccard: state => {
      return state.user.ssciccard;
    }
  },
  actions: {
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        if (params.firm) {
          commit(types.SET_FIRM, params.firm);
          if (params.access_token && params.expires_in) {
            commit(types.SET_ACCESS_TOKEN, params);
            resolve();
          } else if (params.username && params.password) {
            fastLogin(params)
              .then(res => {
                commit(types.SET_ACCESS_TOKEN, res);
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          } else {
            resolve();
          }
        } else {
          reject(new Error());
        }
      });
    },
    logout({ commit }) {
      commit(types.REMOVE_ALL);
    },
    getAA10() {
      return new Promise((resolve, reject) => {
        getAA10()
          .then(res => {
            codeItem.setCodeList(res);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        getUser()
          .then(res => {
            const user = res.responsedata.rowdata;
            commit(types.SET_USER, user);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
});
