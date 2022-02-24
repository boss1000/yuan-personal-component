<!--
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-07-21 16:26:17
-->

# vue-components

### Install

```
npm i @yuan/personal-component -S
```

### Import all components

```
import Vue from 'vue'
import personalUI from '@yuan/personal-component'
import '@yuan/personal-component/lib/themes/index.css'

Vue.use(personalUI)
```

### Manually import

```
// Install plugin
npm i babel-plugin-import -D

// For users who use babel7, that can be configured in babel.config.js
module.exports = {
    plugins: [
        [
            'component',
        {
            libraryName: '@yuan/personal-component',
            styleLibrary: {
            name: 'themes'
            }
        },
            '@yuan/personal-component'
        ]
    ]
}

// Then you can import components from @yuan/personal-component
import Vue from 'vue'
import { Button, ImagePreview } from '@yuan/personal-component'

Vue.use(Button)
Vue.use(ImagePreview)
```

### 当前模块

#### YaCascader 级联选择器

<br />

```
<ya-cascader
	ref="mycascader"
	:parentName.sync="filterForm.parentName"
	:model.sync="filterForm.assetTypeList"
	:options="$store.state.common.AssetsTypeList"
	:isMultiple="true"
	style="width: 100%"
/>

model 绑定value 必填
options 列表参数  必填
parentName 父级参数 默认为空
isMultiple 是否多选  默认 false
```

#### YaSelect 下拉列表

<br />

```
满足 多选时 根据内容长度 展示尽可能多的 tags，超出长度时收起
用法与 el-select 一致

<ya-select
	v-model="filterForm.assetStatusList"
	multiple
	collapse-tags
	size="medium"
>
	<el-option
		v-for="(item, index) in assetStatusList"
		:key="index"
		:label="item.label"
		:value="item.value"
	></el-option>
</ya-select>
```

#### YaTextTooltip 文字 tooltip

<br />

```
<text-tooltip
	class="name"
	:content="item.name"
	:refName="`${item.name}${item.value}`"
>
</text-tooltip>

class 自定义 class名
refName key值 必填项 且必须为唯一值
content 显示内容
```

#### YaSvgIcon 通用 svgIcon

<br />

```
 <svg-icon
	icon-class="up"
	@click="item.Collapse = !item.Collapse"
	:class="['iconUp', { isClose: item.Collapse }]"
>
</svg-icon>

icon-class icon名称 必填
```
