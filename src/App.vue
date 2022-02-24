<!--
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-08-30 10:59:00
-->
<template>
  <div id="app">
    <!-- <ya-select></ya-select>
     -->
    <ya-select
      v-model="eventSearchForm"
      placeholder="请选择事件类型"
      multiple
      collapse-tags
      clearable
    >
      <el-option
        v-for="(item, index) in optionList.eventTypeList"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </ya-select>
  </div>
</template>

<script>
// import { PwButton } from "../lib";
export default {
  name: "App",
  components: {
    // PwButton,
  },
  data() {
    return {
      eventSearchForm: [],
      optionList: {
        eventTypeList: [
          {
            label: "默认",
            value: "默认"
          },
          {
            label: "源IP",
            value: "源IP"
          },
          {
            label: "源账号",
            value: "源账号"
          },
          {
            label: "源sid",
            value: "源sid"
          },
          {
            label: "源区域",
            value: "源区域"
          }
        ]
      }
    };
  },
  methods: {
    showPreview(index) {
      this.startPosition = index;
      this.show = true;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f7f8fa;
}
</style>
<style lang="scss" scoped>
.title {
  padding: 15px 15px 5px;
  color: #666;
}
.contain {
  padding: 15px;
  background-color: #ffffff;
}
.pie-chart {
  > div {
    margin: auto;
    width: 50%;
  }
}
.clock {
  > div {
    margin: auto;
    width: 70%;
  }
}
.el-select {
  width: 263px;
}
</style>
