# miniprogram-city-picker
小程序城市选择器， 省市区三级联动



![小程序城市选择器](https://github.com/staven630/miniprogram-city-picker/blob/master/miniprogram-city-picker.gif "小程序城市选择器")


# 配置

### 参数
| 选项名 | 类型 | 是否必填 | 默认值 | 描述 |
| :---  | :--- | :--- | :--- | :--- |
| mode | Number | true | 1 | 1：省市区，2：省市 |
| show | Boolean | true | false | 是否显示 |
| codes | Array | true | [] | 省市(区)的编码数组，如：[110000, 110100, 110101] |

### 事件
| 选项名 | 类型 | 是否必填 | 描述 |
| :---  | :--- | :--- | :--- |
| bindhide | Function | true | 关闭省市区选择器 |
| bindselect | Function | true | 返回选中省市(区)信息 |

# 使用
### 引入
```
{
  "usingComponents": {
    "slide-tabs": "../../components/miniprogram-city-picker/index"
  }
}
```

### wxml
```
<button bindtap='onChange'>显示</button>

<city-picker mode="2" show="{{show}}" codes="{{codes}}" bindhide="onHide" bindselect="onSelect">
  <input value="{{city}}" />
</city-picker>
```
### js 
```
Page({
  data: {
    show: false,
    codes: [],
    city: ''
  },
	onChange: function(e) {
		this.setData({
      show: !this.data.show 
    })
	},
  onHide(e) {
    this.setData({
      show: false
    })
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
* [miniprogram-slide-tabs:类似可滑动的新闻菜单栏](https://github.com/staven630/miniprogram-slide-tabs)