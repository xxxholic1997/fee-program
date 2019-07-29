import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import ReimburseList from '@/components/ReimburseList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/ReimburseList',
      name: 'ReimburseList',
      component: ReimburseList,
    },
  ],
});
