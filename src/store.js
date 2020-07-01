export default {
  state: {
    global: false,
    loading: {}
  },

  mutations: {
    LOADING_SAVE(state, payload) {
      state.loading = {
        ...state.loading,
        ...payload.loading
      };
      state.global = payload.global;
    }
  }
};
