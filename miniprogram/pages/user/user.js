// miniprogram/pages/user/user.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPhone: '../../icon/user.png',
    canIUse: false
  },
  changeimg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData({
          userPhone: tempFilePaths
        })
        console.log(this.data.userPhone);
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          // cloudPath:"userPhone/b.jpg",
          cloudPath: "userPhone/" + Date.now() + ".jpg",
          filePath: this.data.userPhone
        }).then(res => {
          console.log(res);
          db.collection('users').doc(app.userInfo._id).update({
            data: {
              userPhone: res.fileID
            }
          }).then(res => {
            wx.showToast({
              title: '修改成功',
            })
          })
        })
      }
    })
  },
  // 用户登录
  bindGetUserInfo: function (e) {
    console.log(e);
    const userInfo = e.detail.userInfo;
    // this.setData({
    //   userName:userInfo.nickName,
    //   userPhone:userInfo.avatarUrl,
    //   canIUse:true
    // })
    if (!this.canIUse && userInfo) {
      db.collection('users').add({
        data: {
          userName: userInfo.nickName,
          userPhone: userInfo.avatarUrl,
        }
      }).then(res => {

        // 通过id查询当前用户信息
        db.collection('users').doc(res._id).get().then(res => {

          // 将用户数据全局
          app.userInfo = Object.assign(app.userInfo, res.data) //拷贝对象
          this.setData({
            userName: app.userInfo.userName,
            userPhone: app.userInfo.userPhone,
            canIUse: true
          })
        })
      }).catch(err => {
        console.log(err);
      })
    }


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
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      // console.log(res.result.openid);
      const openid = res.result.openid
      db.collection('users').where({
        _openid: openid
      }).get().then(res => {
        console.log(res);
        if (res.data.length > 0) {
          // 将用户数据全局
          app.userInfo = Object.assign(app.userInfo, res.data[0]) //拷贝对象
          this.setData({
            userName: app.userInfo.userName,
            userPhone: app.userInfo.userPhone,
            canIUse: true
          })
        } else {
          this.setData({
            canIUse: false
          })
        }

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