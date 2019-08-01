<template>
  <div>
    <!-- <div class="title-bg">
      <img class="return-arrow" src="../assets/icons/left-arrow.png" />
      <p class="title-apply">报销单审批</p>
    </div> -->

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
import Button from "vant/lib/button";
import "vant/lib/button/style";
import { PullRefresh } from "vant";
export default {
  components: {
    PullRefresh,
  },
  data() {
    return {
      count: 0,
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>

<style lang="stylus" scoped>
.title-bg {
  position: relative;
  left: 0px;
  top: -3px;
  width: 100%;
  height: 40px;
  background-color: #1FA2FF;

  .return-arrow { // 返回按钮
    position: relative;
    top: 12px;
    left: 13px;
    width: 20px;
    font-weight: bold;
  }

  .title-apply { // 标题
    position: relative;
    top: -33px;
    padding-top: 5px;
    text-align: center;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #FFF;
    letter-spacing: 0;
  }
}
</style>
