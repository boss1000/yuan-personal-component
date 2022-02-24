<!--
 * @title: 级联选择器
 * @Author: xiezhongbin
 * @Date: 2021-03-05 15:16:54
 * @LastEditTime: 2021-08-23 17:36:51
-->
<template>
  <el-cascader
    :ref="refDefalut"
    v-model="value"
    :options="options"
    :show-all-levels="false"
    :props="cascaderProps"
    :popper-class="popperClass"
    :clearable="true"
    collapse-tags
    @change="changeCascader"
  >
    <template slot-scope="{ node, data }">
      <span
        class="select-item"
        @click.prevent="handleSelect(node, data, $event)"
      >
        {{ data.label }}
      </span>
    </template>
  </el-cascader>
</template>
<script>
export default {
  name: "YaCascader",
  props: {
    model: {
      type: Array | String,
      default: () => []
    },
    parentName: {
      type: String,
      default: ""
    },
    refName: {
      type: String,
      default: () => `refHandle${new Date().getTime()}`
    },
    options: {
      type: Array,
      default: () => []
    },
    cascaderKey: {
      type: Object,
      default: () => {}
    },
    isMultiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refDefalut: `refHandle${new Date().getTime()}`,
      value: [],
      parentData: {},
      emitparentValue: [],
      showCheckBox: false,
      nodeLevel: 2
    };
  },
  computed: {
    popperClass() {
      let classArry = ["custom-cascader"];
      if (this.showCheckBox) {
        classArry.push("showCheckBox");
      }
      return classArry.join(" ");
    },
    cascaderProps() {
      // 后续修改
      return {
        multiple: this.isMultiple,
        emitPath: false,
        checkStrictly: true,
        expandTrigger: "hover"
      };
    }
  },
  watch: {
    value() {
      // console.log(this.value);
      // this.changeCascader(this.value);
    },
    model: {
      handler() {
        if (this.model && this.model != undefined && this.nodeLevel == 2) {
          if (this.isMultiple) {
            if (Array.isArray(this.model)) {
              this.value = this.model;
            } else {
              this.value =
                this.model.toString().indexOf(",") > -1
                  ? this.model.split(",")
                  : this.model.toString();
            }
          } else {
            this.value = this.model.toString();
          }
        }
        if (!this.model || this.model.length == 0) {
          this.value = [];
        }
      },
      immediate: true
    }
  },
  mounted() {
    // console.log(this.options);
  },
  methods: {
    changeCascader(data = []) {
      if (!this.value) return false;
      if (this.value.length == 0) {
        this.restCascader();
        // 改变高度
        this.$refs[this.refDefalut].$el.getElementsByTagName(
          "input"
        )[0].style.height = "inherit";
        this.$emit("update:model", []);
        if (this.parentName) this.$emit("update:parentName", "");
      } else {
        // 如果是父级不需要传入子节点；子级需要父节点
        this.$emit(
          "update:model",
          this.value.length == 1 &&
            this.value.includes(this.parentData.parentValue)
            ? this.emitparentValue
            : this.value
        );
        if (this.parentName) {
          this.$emit(
            "update:parentName",
            this.value.includes(this.parentData.parentValue)
              ? this.parentData.parentLabel
              : ""
          );
        }
      }
      this.$emit("changeVal", data);
    },
    handleSelect(node, data, event) {
      // 是否多选
      if (this.isMultiple) {
        let checkBox = event.target.parentElement.previousElementSibling.getElementsByTagName(
          "span"
        )[0];
        if (node.level == 1) {
          this.$refs[this.refDefalut].$refs.panel.clearCheckedNodes();
          this.$refs[this.refDefalut].presentTags = [];
          this.$refs[this.refDefalut].$refs.panel.activePath = [];
          this.parentData = {
            parentLabel: node.label,
            parentValue: node.value
          };

          if (data && data.hasOwnProperty("children")) {
            this.emitparentValue = data.children.map(item => item.value);
          } else {
            this.emitparentValue = [node.value];
          }
          this.nodeLevel = 1;
        } else {
          // 这里判断是否改变
          if (!this.parentData.parentLabel) {
            this.parentData = {
              parentLabel: node.parent.data.label,
              parentValue: node.parent.data.value
            };
          } else {
            if (this.parentData.parentLabel !== node.parent.data.label) {
              this.value = [node.value];
              this.parentData = {
                parentLabel: node.parent.data.label,
                parentValue: node.parent.data.value
              };
            }
          }

          this.nodeLevel = 2;
          // this.changeCascader(this.value);
        }
        // 清空选择

        checkBox.click();

        if (
          node.level == 2 &&
          this.value &&
          this.value.length > 0 &&
          this.value.includes(node.parent.value)
        ) {
          this.$nextTick(() => {
            this.value = this.value.filter(item => item !== node.parent.value);
          });
        }
      } else {
        let radio = event.target.parentElement.previousElementSibling;
        if (!node.hasChildren) {
          this.$refs[this.refDefalut].toggleDropDownVisible();
          radio.click();
          this.value = node.value;
        } else {
          if (this.value == node.value) {
            this.$refs[this.refDefalut].toggleDropDownVisible();
            radio.click();
          } else {
            this.value = node.value;
          }
        }
      }
      this.$nextTick(() => {
        this.changeCascader(this.value);
      });
    },
    // 清空
    restCascader() {
      this.$refs[this.refDefalut].$refs.panel.clearCheckedNodes();
      this.$refs[this.refDefalut].presentTags = [];
      this.$refs[this.refDefalut].$refs.panel.activePath = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.common-container {
  width: 350px;
}
</style>
<style lang="scss">
.el-cascader {
  width: 100%;
}
.custom-cascader {
  .el-radio {
    display: none;
  }
  &.showCheckBox {
    .el-cascader-menu:not(:first-child) {
      .el-checkbox {
        display: none;
      }
    }
  }
  .el-cascader-node {
    position: relative;
    .el-checkbox {
      z-index: 0;
    }
    .el-cascader-node__label {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      z-index: 3;
      .select-item {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        text-indent: 30px;
      }
    }
  }
  .el-cascader-menu:first-child {
    .el-checkbox {
      display: none;
    }
  }

  .el-cascader-menu:not(:first-child) {
    .el-cascader-node {
      .el-checkbox + .el-cascader-node__label {
        .select-item {
          text-indent: 40px;
        }
      }
    }
  }
}
</style>
