<template>
  <div class="bottom-bg">
    <div class="title-bg">
      <img class="return-arrow" src="../assets/left-arrow.png" />
      <p class="title-apply">标题</p>
    </div>
    <div class="title-navigator">
      &nbsp;&nbsp;
      <span class="navigator-font">待审批</span>
      <img class="down-arrow" src="../assets/sort-down.png" />
      &emsp;
      <span class="navigator-font">全部单据</span>
      <img class="down-arrow" src="../assets/sort-down.png" />
      &emsp;
      <span class="navigator-font">筛选</span>
      <img class="down-arrow" src="../assets/sort-down.png" />
      &emsp;
      <img class="down-arrow" src="../assets/sort-line.png" />
    </div>

    <div class="list-show" v-for="[item, index] in listData" :key="index">
      <div class="list-title">
          <span class="list-code">{{item.code}}</span>
          <span class="list-date">{{item.date}}</span>
      </div>
      <div class="list-info">
          <span class="list-title">{{item.title}}</span>
          <span class="list-info">{{item.info}}</span>
      </div>
      <div class="list-bottom">
          <img src /><!-- 头像 -->
          <span class="bottom-name">{{item.name}}</span>
          <div class="bottom-money">
              <span class="symbol">{{item.symbol}}</span>
              <span class="number">{{item.price}}</span>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReimburseList",
  data() {
    return {
        listData: [
            {
                listCode:'IR0116789011',
                date:'2018-07-04',
                title:'计费项目报销单',
                info:'显示备注信息有字数限制，字数最多为200字',
                author:'张光辉 Java技术服务组2',
                symbol:'CNY',
                price:'100.00',
            },
            {
                listCode:'IR0116789011',
                date:'2018-07-04',
                title:'计费项目报销单',
                info:'显示备注信息有字数限制，字数最多为200字',
                author:'张光辉 Java技术服务组2',
                symbol:'CNY',
                price:'100.00',
            },
            {
                listCode:'IR0116789011',
                date:'2018-07-04',
                title:'计费项目报销单',
                info:'显示备注信息有字数限制，字数最多为200字',
                author:'张光辉 Java技术服务组2',
                symbol:'CNY',
                price:'100.00',
            }
        ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/import.styl';

.bottom-bg {
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

.return-arrow {
  position: relative;
  top: 8px;
  left: 4px;
  width: 20px;
}

.title-bg {
  position: relative;
  left: -8px;
  top: -8px;
  width: 100%;
  height: 30px;
  background-color: #1FA2FF;

  .title-apply {
    position: relative;
    top: -34px;
    padding-top: 5px;
    text-align: center;
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #FFF;
    letter-spacing: 0;
  }
}

.title-navigator {
  position: absolute;
  text-align: center;
  align-content: center;
  background-color: #FFF;
  height: 30px;
  width: 280px;

  .navigator-font {
    position: relative;
    padding-right: 3px;
    color: #919B9F;
    font-size: 10px;
    width: 40%;
  }

  .down-arrow {
    width: 10px;
  }
}

.list-show {
  width: 100%;
  height: 30%;
}
</style>
