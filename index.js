// components/miniprogram-city-picker/index.js

import { CityList } from './pca';
export const IS_EMPTY = /^\s*$/;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: Number,
      value: 1
    },
    codes: {
      type: Array,
      value: []
    },
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        if (newVal) {
          this.initPicker();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [0, 0, 0],
    cityList: CityList,
    citys: [],
    areas: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hasValue(key, oldValue, newValue) {
      return typeof oldValue[key] !== 'undefined' ? oldValue[key] : newValue;
    },

    hasLength(key, index, oldValue, newValue) {
      if (typeof oldValue[index] === 'undefined') return newValue;
      return this.hasValue(key, oldValue[index], newValue);
    },

    key2Value(obj, idx, key) {
      return typeof obj[idx] === 'undefined' ? '' : obj[idx][key];
    },

    getCityCodeItem(list, id) {
      let i = 0;
      while (i < list.length) {
        if (list[i].id == id) {
          return {
            item: list[i],
            index: i
          }
        }
        i++;
      }
      return null;
    },

    getCityItem(key, list, id) {
      let result = this.getCityCodeItem(list, id);
      if (!result) {
        return list.length > 0 ? { item: list[0], index: 0 } : { item: [], index: 0 };
      } else {
        return typeof result.item[key] === 'undefined' ?
          {
            item: [],
            index: result.index
          } : {
            item: result.item[key],
            index: result.index
          }
      }
    },
    // 初始化选择器信息
    initPicker() {
      let { value, cityList, mode, codes } = this.data;
      let citys = [];
      let areas = [];
      if (typeof codes === 'undefined' || IS_EMPTY.test(codes)) {
        value[0] = 0;
        citys = this.hasLength('children', 0, cityList, []);
        areas = mode === 2 ? [] : this.hasLength('children', 0, citys, []);
        value = mode === 2 ? value.length = 2 : value;
      } else {
        const currentProvince = this.getCityItem('children', cityList, codes[0]);
        citys = currentProvince.item;
        const currentCity = this.getCityItem('children', citys, codes[1]);
        if (mode == 2) {
          areas = [];
          value = [currentProvince.index, currentCity.index];
        } else {
          areas = currentCity.item;
          const currentArea = this.getCityItem('children', areas, codes[2]);
          value = [currentProvince.index, currentCity.index, currentArea.index];
        }
      }
      this.setData({
        mode,
        value,
        citys,
        areas
      })
    },
    // 列滚动
    changeCityPicker(e) {
      const changeValue = e.detail.value;
      const { value, mode, cityList } = this.data;
      let { citys, areas } = this.data;
      if (changeValue[0] !== value[0]) {
        const currentCity = cityList[changeValue[0]];
        citys = this.hasValue('children', currentCity, []);
        areas = mode == 2 ? [] : this.hasLength('children', 0, citys, []);
      } else if (changeValue[1] !== value[1]) {
        areas = mode == 2 ? [] : this.hasLength('children', changeValue[1], citys, []);
      }

      this.setData({
        value: changeValue,
        citys,
        areas
      });
    },
    // 确认
    submitCityPicker() {
      const { cityList, citys, areas, value, mode } = this.data;
      this.setData({
        show: false
      }, () => {
        let result = mode === 2 ?
          {
            code: [this.key2Value(cityList, value[0], 'id'), this.key2Value(citys, value[1], 'id')],
            value: [this.key2Value(cityList, value[0], 'name'), this.key2Value(citys, value[1], 'name')]
          } :
          {
            code: [this.key2Value(cityList, value[0], 'id'), this.key2Value(citys, value[1], 'id'), this.key2Value(areas, value[2], 'id')],
            value: [this.key2Value(cityList, value[0], 'name'), this.key2Value(citys, value[1], 'name'), this.key2Value(areas, value[2], 'name')]
          };
        this.triggerEvent('hide', true);
        this.triggerEvent('select', result);
      });
    },
    // 取消
    hideCityPicker() {
      this.setData({
        show: false
      }, () => {
        this.triggerEvent('hide', true)
      });
    }
  }
})
