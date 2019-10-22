# wx-city-picker

小程序城市选择器， 省市区三级联动

![小程序城市选择器](https://raw.githubusercontent.com/staven630/wx-city-picker/master/wx-city-picker.gif)

# 配置

### 参数

| 选项名   | 类型   | 是否必填 | 默认值     | 描述                                                                                                                                                                                     |
| :------- | :----- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode     | Number | false    | 1          | 选择器类型：1-省市区选择，2-省市选择                                                                                                                                                     |
| codes    | Array  | false    | [0, 0, 0]  | 省市(区)的编码数组，如：[110000, 110100, 110101]                                                                                                                                         |
| data     | Array  | true     |            | 省市区数据，省市区数据示例:[pca.js](https://github.com/staven630/wx-city-picker/blob/master/pca.js) ,省市数据示例:[pc.js](https://github.com/staven630/wx-city-picker/blob/master/pc.js) |
| childkey | String | false    | 'children' | 数据中子数组键名                                                                                                                                                                         |
| idkey    | String | false    | 'id'       | 省市区编码键名                                                                                                                                                                           |
| namekey  | String | false    | 'name'     | 省市区名称键名                                                                                                                                                                           |

### 事件

| 选项名 | 类型     | 是否必填 | 描述                 |
| :----- | :------- | :------- | :------------------- |
| select | Function | true     | 返回选中省市(区)信息 |

# 使用

### 引入

- npm 引入

```
npm i -S wx-city-picker
```

```
{
  "usingComponents": {
    "city-picker": "/components/wx-city-picker/index"
  }
}
```

- 手工下载至项目/components 目录

```
{
  "usingComponents": {
    "city-picker": "/components/wx-city-picker/index"
  }
}
```

### wxml

```
<city-picker codes="{{codes}}" data="{{citylist}}"  bind:select="onSelect">
  <view class="input-picker">
    {{city}}
  </view>
</city-picker>
```

### js

```
import {CityList} from './pca.js';
Page({
  data: {
    codes: [],
    city: '',
    citylist: CityList
  },
  onSelect(e) {
    this.setData({
      codes: e.detail.code,
      city: e.detail.value
    })
  }

})
```

# 其他小程序插件

- [wx-slide-tabs:类似可滑动的新闻菜单栏](https://github.com/staven630/wx-slide-tabs)
