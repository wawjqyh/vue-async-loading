import loadingStore from './store';
import mixin from './mixin';

export default {
  install(Vue, { store, handleError }) {
    // 注册 store
    if (store) {
      store.registerModule('loading', loadingStore);
    }

    Vue.mixin(mixin({ store, handleError }));
  }
};
