Component({
  properties: {
    mode: {
      type: Number,
      value: 1
    },
    codes: {
      type: Array,
      value: []
    },
    childkey: {
      type: String,
      value: 'children'
    },
    idkey: {
      type: String,
      value: 'id'
    },
    namekey: {
      type: String,
      value: 'name'
    },
    data: {
      type: Array,
      value: []
    }
  },
  data: {
    value: [0, 0, 0],
    citys: [],
    areas: [],
    show: false
  },
  methods: {
    hasValue(list) {
      const { childkey } = this.properties
      return this.isUndefined(list[childkey]) ? [] : list[childkey]
    },

    hasIndex(index, list) {
      return this.isUndefined(list[index]) ? [] : this.hasValue(list[index])
    },

    key2Value(list, idx, key) {
      return this.isUndefined(list[idx]) ? '' : list[idx][key]
    },

    getCityCodeItem(list, id) {
      let i = 0
      while (i < list.length) {
        if (list[i].id == id) {
          return {
            item: list[i],
            index: i
          }
        }
        i++
      }
      return null
    },

    getCityItem(list, id) {
      const { childkey } = this.properties
      let result = this.getCityCodeItem(list, id)
      if (!result) return { item: list.length > 0 ? list[0] : [], index: 0 }
      return {
        item: this.isUndefined(result.item[childkey])
          ? []
          : result.item[childkey],
        index: result.index
      }
    },

    isUndefined(value) {
      return typeof value === 'undefined'
    },

    isEmpty(value) {
      if (Array.isArray(value) && value.length === 0) return true
      return this.isUndefined(value) || /^\s*$/.test(value)
    },

    // 初始化选择器信息
    togglePicker() {
      let { value, mode, codes, show, data } = this.data
      if (show) return this.setData({ show: !show })
      if (mode === 2) value.length = 2

      let citys = []
      let areas = []
      if (this.isEmpty(codes)) {
        value = new Array(mode === 2 ? 2 : 3).fill(0)
        citys = this.hasIndex(0, data)
        areas = mode == 1 ? this.hasIndex(0, citys) : []
      } else {
        const currentProvince = this.getCityItem(data, codes[0])
        citys = currentProvince.item
        const currentCity = this.getCityItem(citys, codes[1])
        if (mode == 2) {
          areas = []
          value = [currentProvince.index, currentCity.index]
        } else {
          areas = currentCity.item
          const currentArea = this.getCityItem(areas, codes[2])
          value = [currentProvince.index, currentCity.index, currentArea.index]
        }
      }
      const params = {
        value,
        citys,
        show: !show
      }
      this.setData(mode == 1 ? { ...params, areas } : params)
    },
    // 列滚动
    changeCityPicker(e) {
      const val = e.detail.value
      let { citys, areas, value, mode, data } = this.data
      if (val[0] !== value[0]) {
        const currentCity = data[val[0]]
        citys = this.hasValue(currentCity)
        areas = mode == 2 ? [] : this.hasIndex(0, citys)
        value = mode == 2 ? [val[0], 0] : [val[0], 0, 0]
      } else if (val[1] !== value[1]) {
        areas = mode == 2 ? [] : this.hasIndex(val[1], citys)
        value = mode == 2 ? [val[0], val[1]] : [val[0], val[1], 0]
      } else if (mode === 1 && val[2] !== value[2]) {
        value = val
      }

      const params = { value, citys }
      this.setData(mode == 1 ? { ...params, areas } : params)
    },
    // 确认
    submitCityPicker() {
      const { data, citys, areas, value, mode, idkey, namekey } = this.data
      this.setData(
        {
          show: false
        },
        () => {
          const codeList = [
            this.key2Value(data, value[0], idkey),
            this.key2Value(citys, value[1], idkey)
          ]
          const valueList = [
            this.key2Value(data, value[0], namekey),
            this.key2Value(citys, value[1], namekey)
          ]
          const result =
            mode === 2
              ? {
                  code: codeList,
                  value: valueList
                }
              : {
                  code: [...codeList, this.key2Value(areas, value[2], idkey)],
                  value: [...valueList, this.key2Value(areas, value[2], namekey)]
                }
          this.triggerEvent('select', result)
        }
      )
    },
    // 取消
    hideCityPicker() {
      this.setData({ show: false })
    }
  }
})
