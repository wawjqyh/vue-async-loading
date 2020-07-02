# vue-async-loading

Using vuex to manage the loading state of asynchronous methods

## Usage

```javascript
import vueAsyncLoading from "vue-async-loading";

Vue.use(vueAsyncLoading [,options]);
```

## Options

### store

Vuex instance

### handleError(err)

All error raised by the asyncMethods will be passed to the handleError handler, enabling you to implement global error handling, logging, etc.

## Demo

```javascript
import vueAsyncLoading from 'vue-async-loading';
import Vuex from 'Vuex';

Vue.use(vueAsyncLoading, {
  store: new Vuex(),
  handleError(err) {
    console.log(err);
  }
});
```

Now you can define async methods on your vm:

```javascript
<template>
  <div>
    <div v-show="$loading.global">global</div>
    <div v-show="$loading.fetchData">current component</div>
    <div v-show="$loading['demo2/fetchData']">
      other components $loading['component name/method name']
    </div>
  </div>
</template>;

export default {
  // You need to define the name to distinguish the methods of different components
  name: 'demo',

  asyncMethods: {
    fetchData() {
      return fetch('http://xxx.com/data.json');
    },

    async fetchSomething() {
      const res = await fetch('http://xxx.com/something.json');
      // do something
    }
  },

  methods: {
    testLoading() {
      console.log(this.$loading.fetchSomething);
      console.log(this.$loading['demo2/fetchData']);
      console.log(this.$loading.global);
    }
  }
};
```
