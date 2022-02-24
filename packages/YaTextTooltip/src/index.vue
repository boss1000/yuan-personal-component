<!--
 * @Author: xiezhongbin
 * @Date: 2021-01-28 15:43:56
 * @LastEditTime: 2021-07-23 11:11:49
-->
<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      effect="dark"
      :disabled="isShowTooltip"
      :content="content"
      placement="top"
    >
      <div
        class="over-flow"
        :class="className"
        @mouseover="onMouseOver(refName)"
      >
        <span :ref="refName">
          {{ isSplit ? splitString(content) : content || "-" }}
        </span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "YaTextTooltip",
  props: {
    // 显示的文字内容
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 外层框的样式，在传入的这个类名中设置文字显示的宽度
    className: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
    refName: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 是否分割字符
    isSplit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShowTooltip: true,
    };
  },
  methods: {
    onMouseOver(str) {
      if (this.$refs[this.refName].parentNode) {
        let parentWidth = this.$refs[this.refName].parentNode.offsetWidth;
        let contentWidth = this.$refs[this.refName].offsetWidth;
        // 判断是否开启tooltip功能
        if (contentWidth > parentWidth) {
          this.isShowTooltip = false;
        } else {
          this.isShowTooltip = true;
        }
      }
    },
    splitString(data) {
      return data.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
  },
};
</script>

<style lang="scss" scoped>
.over-flow {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wid190 {
  width: 190px;
}
</style>