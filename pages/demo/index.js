// pages/demo/index.js
import { CityList } from '../../components/wx-city-picker/pca.js';

Page({
  
  data: {
    codes: [],
    city: '',
    citylist: CityList
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
  },

  onSelect(e) {
    this.setData({
      codes: e.detail.code,
      city: e.detail.value
    })
  },
  
})