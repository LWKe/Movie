// pages/proList/proList.js
// const order = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6']
const db=wx.cloud.database()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    movie_list: [],
    list:[]
  },
godetail:function(e){
  console.log(e);
  let id=e.currentTarget.dataset.id 
  console.log(id);

  wx.navigateTo({
  url: '../detail/detail?id='+id,
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    db.collection('movie_list').doc({}).get().then(res=>{
      // console.log(res.data.movieList[0]);
      this.setData({
        movie_list:res.data.movieList
      })
    })
    db.collection('list').doc({}).get().then(res=>{
      // console.log(res.data.coming[0]);
      this.setData({
        list:res.data.coming
      })
    })
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