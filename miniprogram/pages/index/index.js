//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  inputSth(e){
    this.setData({
      num: parseInt(e.detail.value)
    })
  },

  handletap(e){
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: this.data.num + operation
    })
  }
})