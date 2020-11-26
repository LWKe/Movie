// miniprogram/pages/detail/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    word: true,
    detail:[]
  },

  // 控制想看与不想看
  shows() {
    console.log(1);
    
    this.setData({
      show: !this.data.show
    })
  },
  // 展开与隐藏
  shhi() {
    this.setData({
      word: !this.data.word
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    db.collection('detail').doc({}).get().then(res => {
      this.setData({
        detail: res.data.coming[id]
      })
      // console.log(res.data.coming[id]);
    })
    // 测试
    // console.log(this.data.detail[0].actorList);
    // console.log(this.data.detail[0].video);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})