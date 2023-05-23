import { resetRouter } from "@/router";
import { setUserInfo, clearLocalStorage } from "@/utils/localStorage";
import * as api from "@/api/index";

const getDefaultState = () => {
  return {
    token: "",
    name: "",
    avatar: "",
    userInfo: {},
  };
};

const getUserData = (token) => {
  try {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString());
  } catch {
    return undefined;
  }
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};

const actions = {
  // user login
  onLogin({ commit }, userInfo) {
    const { account, password, workStn } = userInfo;
    return new Promise((resolve, reject) => {
      // 呼叫 api
      api.login(userInfo).then((resp) => {
        console.log(resp);
        if (resp.title == "successful") {
          commit("SET_USER", userInfo);
          setUserInfo(userInfo);
          resolve(true);
        } else {
          clearLocalStorage();
          resolve(false);
        }
      });
    });
  },
  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve(state);
    });
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve(1);
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
