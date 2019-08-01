<template>
  <div class="bottom-bg">
    <div class="title-bg">
      <img class="return-arrow" src="../assets/icons/left-arrow.png" />
      <p class="title-apply">标题</p>
    </div>
    <el-dropdown class="title-navigator">
      &nbsp;&nbsp;
      <span
        class="navigator-font"
        :class="{touchColor:whether}"
        @touchstart="touchStart()"
        @touchend="touchEnd()"
        @click="approvalShow = !approvalShow"
      >
        待审批
        <i :class="[approvalShow?'fa fa-caret-up return':'fa fa-caret-up go']"></i>
      </span>
      &emsp;&emsp;
      <span class="navigator-font" @click="applyShow = !applyShow">
        全部单据
        <i :class="[applyShow?'fa fa-caret-up return':'fa fa-caret-up go']"></i>
      </span>
      &emsp;&emsp;
      <span class="navigator-font" @click="screeningShow = !screeningShow">
        筛选
        <i :class="[screeningShow?'fa fa-caret-up return':'fa fa-caret-up go']"></i>
      </span>
      &emsp;&emsp;
      <img class="down-arrow" src="../assets/icons/sort-line.png" />
    </el-dropdown>

    <!-- 待审批下拉菜单 -->
    <el-dropdown-menu class="dropdown-menu" v-show="approvalShow">
      <table class="approval-dropdown">
        <tr class="approval-dropdown-tr">
          <td class="approval-dropdown-td" @click="selectDocument('not-approved')">待审批</td>
        </tr>
        <tr>
          <td class="approval-dropdown-td" @click="selectDocument('approved')">已审批</td>
        </tr>
      </table>
    </el-dropdown-menu>

    <!-- 申请单下拉菜单 -->
    <el-dropdown-menu class="apply-dropdown-menu" v-show="applyShow">
      <!-- 申请单选项 -->
      <table class="apply-dropdown">
        <tr>
          <td class="apply-dropdown-td" @click="showFullList()">全部单据</td>
          <td rowspan="5" style="border-left: 1px solid #EEEEEE;">
            <table v-show="applySelect">
              <tr>
                <td class="apply-dropdown-td-2" @click="selectDocument('apply')">全部</td>
              </tr>
              <tr>
                <td class="apply-dropdown-td-2" @click="selectDocument('flyback')">Flyback申请单</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="apply-dropdown-td" @click="selectDocument('reimburse')">报销单</td>
        </tr>
        <tr>
          <td class="apply-dropdown-td" @click="clickApplySelect()">申请单</td>
        </tr>
        <tr>
          <td class="apply-dropdown-td" @click="selectDocument('rent')">借款单</td>
        </tr>
      </table>
    </el-dropdown-menu>

    <!-- 筛选下拉菜单 -->
    <el-dropdown-menu class="screening-dropdown-menu" v-show="screeningShow">
      <!-- v-click-outside="clickOutside('screeningShow')" -->
      <table class="screening-dropdown">
        <tr>
          <td class="screening-dropdown-td">
            申请人
            <span class="applicant-select">
              <span style="position:relative;top: -5px;color:#919B9F">请选择</span>
              <!-- <el-select placeholder="请选择" class="applicant-select">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>-->
              <img class="right-arrow" src="../assets/icons/right-arrow.png" />
            </span>
          </td>
        </tr>
        <tr>
          <td style="height:80px;margin:5px;">
            金额
            <br />
            <span>
              <input class="cash-input" placeholder="最小金额" />
              至
              <input class="cash-input" placeholder="最大金额" />
            </span>
          </td>
        </tr>
        <tr>
          <td class="screening-dropdown-td">
            部门
            <span class="applicant-select">
              <span style="position:relative;top: -5px;color:#919B9F">请选择</span>
              <img class="right-arrow" src="../assets/icons/right-arrow.png" />
            </span>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;">
            <br />
            <el-button plain class="screening-button">重置筛选</el-button>
            <el-button type="primary" class="screening-button">显示结果</el-button>
          </td>
        </tr>
      </table>
    </el-dropdown-menu>

    <vue-scroll>
      <!-- 显示全部单据 -->
      <div v-show="fullListShow">
        <swipeout class="slip-del" v-for="(item, index) in listData" :key="index">
          <swipeout-item>
            <div slot="content" class="list-show">
              <div class="list-title">
                <span class="list-code">{{item.listCode}}</span>
                <span class="list-date">{{item.date}}</span>
              </div>
              <div class="list-info">
                <span class="list-title">{{item.title}}</span>
                <br />
                <span class="list-content">{{item.info | ellipsis}}</span>
              </div>
              <div class="list-bottom">
                <!-- <img class="bottom-portrait" :src="item.portrait" /> -->
                <img class="bottom-portrait" src="../assets/portrait/张光辉.png" />
                <!-- 头像 -->
                <span class="bottom-name">{{item.author}}&nbsp;{{item.sector}}</span>
                <div class="bottom-money">
                  <span class="symbol">{{item.symbol}}</span>
                  <span class="number">{{item.price}}</span>
                </div>
              </div>
            </div>
            <div slot="right-menu">
              <swipeout-button class="agree" @click="setApprovalStatus(item.listCode)">
                <img class="agree-icon" src="../assets/icons/agree.png" />
                <br />
                <span class="agree-text">同意</span>
              </swipeout-button>
              <swipeout-button class="reject">
                <img class="reject-icon" src="../assets/icons/拒绝.png" />
                <br />
                <span class="reject-text">拒绝</span>
              </swipeout-button>
            </div>
          </swipeout-item>
        </swipeout>
      </div>

      <!-- 显示部分单据 -->
      <div v-show="screeningListShow">
        <swipeout class="slip-del" v-for="(item, index) in listScreeningDocument" :key="index">
          <swipeout-item>
            <div slot="content" class="list-show">
              <div class="list-title">
                <span class="list-code">{{item.listCode}}</span>
                <span class="list-date">{{item.date}}</span>
              </div>
              <div class="list-info">
                <span class="list-title">{{item.title}}</span>
                <br />
                <span class="list-content">{{item.info | ellipsis}}</span>
              </div>
              <div class="list-bottom">
                <!-- <img class="bottom-portrait" :src="item.portrait" /> -->
                <img class="bottom-portrait" src="../assets/portrait/张光辉.png" />
                <!-- 头像 -->
                <span class="bottom-name">{{item.author}}&nbsp;{{item.sector}}</span>
                <div class="bottom-money">
                  <span class="symbol">{{item.symbol}}</span>
                  <span class="number">{{item.price}}</span>
                </div>
              </div>
            </div>
            <div slot="right-menu">
              <swipeout-button class="agree">
                <img class="agree-icon" src="../assets/icons/agree.png" />
                <br />
                <span class="agree-text">同意</span>
              </swipeout-button>
              <swipeout-button class="reject">
                <img class="reject-icon" src="../assets/icons/拒绝.png" />
                <br />
                <span class="reject-text">拒绝</span>
              </swipeout-button>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import SlipDel from "vue-slip-delete";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import "font-awesome/css/font-awesome.min.css";
import "../assets/iconfont/iconfont.css";
import "../assets/iconfont/iconfont";
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
export default {
  components: {
    SlipDel,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data() {
    return {
      whether: false, //鼠标点击换色
      approvalShow: false, //下拉菜单默认显示
      applyShow: false,
      screeningShow: false,
      fullListShow: true, //显示全部单据
      screeningListShow: false, //显示筛选过的单据
      manipulateScreen: "",
      applySelect: false, //显示申请单列表
      screeningList: [],
      listData: [
        {
          listCode: "IR0116789011",
          date: "2018-07-04",
          title: "计费项目报销单",
          type: "reimburse",
          info:
            "苏宁易购费用报销单,为您提供费用报销单导购,费用报销单推荐,费用报销单评价,费用报销单图片,费用报销单好不好,怎么样等产品信息,了解更多费用报销单导购信息,",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "not-approved"
        },
        {
          listCode: "IR0116789012",
          date: "2018-07-04",
          title: "计费项目申请单",
          type: "apply",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "approved"
        },
        {
          listCode: "IR0116789013",
          date: "2018-07-04",
          title: "计费项目借款单",
          type: "rent",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "not-approved"
        },
        {
          listCode: "IR0116789014",
          date: "2018-07-04",
          title: "计费项目报销单",
          type: "reimburse",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "approved"
        },
        {
          listCode: "IR0116789015",
          date: "2018-07-04",
          title: "计费项目借款单",
          type: "rent",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "not-approved"
        },
        {
          listCode: "IR0116789012",
          date: "2018-07-04",
          title: "FlyBack申请单",
          type: "flyback",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "not-approved"
        },
        {
          listCode: "IR0116789012",
          date: "2018-07-04",
          title: "Flyback申请单",
          type: "flyback",
          info: "显示备注信息有字数限制，字数最多为200字",
          author: "张光辉",
          sector: "Java技术服务组2",
          symbol: "CNY",
          price: "100.00",
          portrait: "../assets/portrait/" + this.author + ".png",
          status: "approved"
        }
      ]
    };
  },
  methods: {
    touchStart() {
      this.whether = true;
    },
    touchEnd() {
      this.whether = false;
    },
    slipOpen(vm) {
      // 无需手动关闭
    },
    del() {
      // 删除回调
    },
    clickOutside(arg) {
      if (arg === "approvalShow") {
        this.approvalShow = false;
      } else if (arg === "applyShow") {
        this.applyShow = false;
      } else if (arg === "screeningShow") {
        this.screeningShow = false;
      }
    },
    selectDocument(arg) {
      this.fullListShow = false;
      this.screeningListShow = true;
      this.manipulateScreen = arg;
    },
    showFullList() {
      this.fullListShow = true;
      this.screeningListShow = false;
    },
    clickApplySelect() {
      this.applySelect = true;
    },
    setApprovalStatus(arg) {
      alert(arg);
    }
  },
  computed: {
    listScreeningDocument() {
      let arr = [];
      if (this.manipulateScreen === "not-approved") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].status === "not-approved") {
            arr.push(this.listData[i]);
          }
        }
      } else if (this.manipulateScreen === "approved") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].status === "approved") {
            arr.push(this.listData[i]);
          }
        }
      } else if (this.manipulateScreen === "reimburse") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].type === "reimburse") {
            arr.push(this.listData[i]);
          }
        }
      } else if (this.manipulateScreen === "apply") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].type === "apply") {
            arr.push(this.listData[i]);
          }
        }
      } else if (this.manipulateScreen === "rent") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].type === "rent") {
            arr.push(this.listData[i]);
          }
        }
      } else if (this.manipulateScreen === "flyback") {
        arr = [];
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].type === "flyback") {
            arr.push(this.listData[i]);
          }
        }
      } else {
        arr = [];
      }

      return arr;
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 24) {
        return value.slice(0, 24) + "...";
      }
      return value;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~vux/src/styles/reset.less';

.bottom-bg {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #FAFAFA;
}

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
    top: -18px;
    padding-top: 5px;
    text-align: center;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #FFF;
    letter-spacing: 0;
  }
}

.title-navigator { // 待审批栏
  position: absolute;
  top: 40px;
  padding-top: 6px;
  text-align: center;
  background-color: #FFF;
  height: 26px;
  width: 100%;

  .touchColor {
    color: #1FA2FF;
  }

  .navigator-font { // 待审批栏span
    position: relative;
    margin-top: 3px;
    padding-right: 10px;
    color: #919B9F;
    font-size: 13px;
    text-align: center;
    width: 50%;
    height: 30px;

    &:hover {
      color: #1FA2FF;
    }

    .return { // 按钮旋转回
      transition: all 0.4s;
    }

    .go { // 按钮旋转
      transform: rotate(-180deg);
      transition: all 0.4s;
    }
  }

  .down-arrow {
    width: 10px;
  }
}

.dropdown-menu { // 待审批下拉菜单
  position: absolute;
  top: 80px;
  width: 100%;
  height: 50px;
  box-shadow: none;
  border-radius: 0em;
  opacity: 0.95;

  .approval-dropdown {
    position: relative;
    top: -12px;
    width: 100%;
    height: 70px;
    color: #919B9F;
    background-color: #FFF;
    font-size: 14px;
    text-align: center;

    .approval-dropdown-td {
      border-top: 1px solid #EEEEEE;

      &:hover {
        color: #1FA2FF;
      }
    }
  }
}

.apply-dropdown-menu { // 全部单据下拉菜单
  position: absolute;
  top: 80px;
  width: 100%;
  height: 100px;
  box-shadow: none;
  border-radius: 0em;
  opacity: 0.95;

  .apply-dropdown {
    position: relative;
    top: -10px;
    width: 100%;
    height: 100px;
    color: #919B9F;
    background-color: #FFF;
    font-size: 12px;
    text-align: left;

    .apply-dropdown-td {
      position: relative;
      top: 0px;
      left: 2px;
      width: 150px;
      height: 30px;
      border-bottom: 1px solid #EEEEEE;
      box-shadow: none;
      text-align: center;

      &:hover {
        color: #1FA2FF;
      }
    }

    .apply-dropdown-td-2 {
      position: relative;
      left: -3px;
      top: -35px;
      width: 290px;
      height: 30px;
      border-bottom: 1px solid #EEEEEE;
      box-shadow: none;
      text-align: center;

      &:hover {
        color: #1FA2FF;
      }
    }
  }
}

.screening-dropdown-menu { // 筛选下拉菜单
  position: absolute;
  top: 70px;
  width: 100%;
  height: 230px;
  box-shadow: none;
  border-radius: 0em;
  opacity: 0.95;

  .screening-dropdown {
    position: relative;
    top: -10px;
    width: 96%;
    height: 120px;
    color: #000;
    font-size: 14px;
    text-align: left;
    margin-left: 15px;
    padding-top: 10px;

    .right-arrow {
      width: 25%;
    }

    .screening-dropdown-td {
      height: 40px;
      border-bottom: 1px solid #EEEEEE;

      .applicant-select {
        border: 0px;
        float: right;
      }
    }

    .cash-input {
      padding-top: 3px;
      color: #919B9F;
      text-align: center;
      box-shadow: none;
      border: 0;
      border-bottom: 1px solid #EEEEEE;
    }

    .screening-button { // 按钮
      position: relative;
      top: -10px;
      left: -5px;
      width: 180px;
      height: 40px;
    }
  }

  .applicant-select { // 申请人
    .el-input__inner {
      border: 0;
      height: 10%;
    }
  }

  .el-input__inner {
    height: 20px;
  }
}

.dropdown-bg {
  background-color: #7F7F7F;
  height: 100%;
  width: 100%;
  opacity: 0.2;
}

.slip-del { // 左滑动
  position: relative;
  top: 28px;

  .list-show { // 报销单显示
    background: #FFF;
    position: relative;
    width: 100%;
    height: 130px;
    margin-top: 15px;
    font-size: 12px;

    .list-title { // 头部编号和日期
      font-size: 12px;
      margin: 10px;
      margin-top: 8px;

      .list-code {
        margin: 8px;
        position: absolute;
        width: 50px;
        height: 10px;
        // float: left;
        left: 10px;
        color: #929CA0;
        font-size: 12px;
      }

      .list-date {
        margin: 8px 5px 5px 5px;
        position: relative;
        float: right;
        color: #929CA0;
        font-size: 12px;
      }
    }

    .list-info { // 报销单内容
      position: relative;
      left: 3px;
      top: 30px;
      margin: 5px;
      font-size: 12px;

      .list-title {
        font-family: STSong;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }

      .list-content {
        position: relative;
        top: 8px;
        left: 3px;
        margin: 8px;
        color: #787878;
        font-size: 12px;
      }
    }

    .list-bottom { // 底部头像和金额显示
      font-size: 12px;
      margin: 12px;

      .bottom-portrait {
        position: relative;
        top: 33px;
        // left: 3px;
        margin: 5px 5px 3px 3px;
        border-radius: 85%;
        width: 7%;
      }

      .bottom-name {
        position: relative;
        top: 23px;
        left: 0px;
        font-size: 12px;
        color: #9E9E9E;
      }

      .bottom-money { // 底部显示金额块
        position: relative;
        top: 45px;
        left: -3px;
        float: right;
        font-size: 12px;

        .symbol {
          color: #666666;
          font-size: 13px;
        }

        .money {
          color: #333333;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }

  .icon { // 矢量图用
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .reject { // 拒绝侧栏
    float: right;
    top: 5px;
    height: 135px;
    background-color: #FFEDEC;
    color: #F97770;
    text-align: center;
    border: 0;

    &:hover {
      outline: none;
    }

    .reject-icon {
      position: relative;
      width: 26px;
      top: 0px;
    }

    .reject-text {
      position: relative;
      top: 5px;
    }
  }

  .agree { // 同意侧栏
    float: right;
    height: 135px;
    background-color: #DDFCF1;
    color: #48D2A0;
    text-align: center;
    border: 0;

    &:hover {
      outline: none;
    }

    .agree-icon {
      position: relative;
      width: 26px;
      top: 0px;
    }

    .agree-text {
      position: relative;
      top: 5px;
    }
  }
}
</style>
