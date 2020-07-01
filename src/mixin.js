let loadingCount = 0;

export default function({ store, handleError }) {
  return {
    computed: {
      // 获取 loading 状态
      $loading() {
        const asyncMethods = this.$options.asyncMethods;
        const compName = this.$options.name || "noname";
        let curCompLoading = {};

        if (asyncMethods && asyncMethods.constructor) {
          const funcNames = Object.keys(asyncMethods);

          funcNames.forEach((funcName) => {
            curCompLoading[funcName] =
              store.state.loading.loading[`${compName}/${funcName}`];
          });
        }

        return {
          ...curCompLoading,
          ...store.state.loading.loading,
          global: store.state.loading.global,
        };
      },
    },

    beforeCreate() {
      let self = this;
      const asyncMethods = self.$options.asyncMethods; // 组件中的异步方法
      const compName = self.$options.name || "noname";

      if (!asyncMethods || asyncMethods.constructor !== Object) {
        return;
      }

      const names = Object.keys(asyncMethods);

      names.forEach((name) => {
        const func = asyncMethods[name];

        if (typeof func !== "function") {
          return;
        }

        self[`${name}_root`] = func;

        self[name] = async function() {
          if (self[`${name}_running`]) {
            return;
          }

          self[`${name}_running`] = true;

          let payload = { loading: {}, global: false };
          let loadingName = `${compName}/${name}`;
          let res;

          loadingCount++;
          payload.global = true;
          payload.loading[loadingName] = true;
          store.commit("LOADING_SAVE", payload);

          try {
            res = await func.apply(self, arguments);
          } catch (err) {
            handleError(err);
          }

          loadingCount--;
          payload.global = loadingCount > 0;
          payload.loading[loadingName] = false;
          store.commit("LOADING_SAVE", payload);

          self[`${name}_running`] = false;

          return res;
        };
      });
    },
  };
}
