// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    index:1,  // 当前页
    list:[],
    cloudUrl:'https://www.xxx.xxx/spider/githubSpider/getData',

    rankIndex: 0,
    rank: ['总榜', '周榜', '月榜', '季榜','年榜'],
    rankArray: [
      {
        id: 0,
        name: '总榜'
      },
      {
        id: 1,
        name: '周榜'
      },
      {
        id: 2,
        name: '月榜'
      },
      {
        id: 3,
        name: '季榜'
      },
      {
        id: 4,
        name: '年榜'
      }
    ],

    languageIndex:0,
    language: ['All', 'Java', 'Python', 'JavaScript', 'C', 'C++', 'C＃', 'PHP','GO'],
    languageArray: [
      {
        id: 0,
        name: 'All'
      },
      {
        id: 1,
        name: 'Java'
      },
      {
        id: 2,
        name: 'Python'
      },
      {
        id: 3,
        name: 'JavaScript'
      },
      {
        id: 4,
        name: 'C'
      },
      {
        id: 5,
        name: 'C++'
      },
      {
        id: 6,
        name: 'C＃'
      },
      {
        id: 7,
        name: 'PHP'
      },
      {
        id: 8,
        name: 'GO'
      }
    ],
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 显示加载图标  
    wx.showLoading({
      title: '加载中',
    })  
    var that=this;
    wx.request({
      url: that.data.cloudUrl,
      method: 'GET',
      data: { 'index': that.data.index, 'rank': that.data.rankIndex, 'language': that.data.languageIndex},
      success: function (res) {
        var list = res.data;
        console.log(list);
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            list: list
          })
          // 隐藏加载框  
          wx.hideLoading();
        }
      }
    })

   
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
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '加载中',
    })  
    wx.request({
      url: that.data.cloudUrl,
      method: 'GET',
      data: { 'index': 1, 'rank': that.data.rankIndex, 'language': that.data.languageIndex },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            list: list
          })
          // 隐藏加载框  
          wx.hideLoading();
        }
      }
    })

   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '加载中',
    })  
    // var index = that.data.index;
    var next = that.data.index+1;

    that.setData({
      index: next
    })

    wx.request({
      url: that.data.cloudUrl,
      method: 'GET',
      data: { 'index': next, 'rank': that.data.rankIndex, 'language': that.data.languageIndex },
      success: function (res) {
        var list = res.data;
        var moment_list = that.data.list;
        for (var i = 0; i < res.data.length; i++) {
          moment_list.push(res.data[i]);
        }  

        // 设置数据  
        that.setData({
          list: moment_list
        })
        // 隐藏加载框  
        wx.hideLoading();  
      }
    })

 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindRankChange: function (e) {

    // 显示加载图标  
    wx.showLoading({
      title: '加载中',
    })  

    this.setData({
      rankIndex: e.detail.value,
      index:1
    })
    var that = this;
    wx.request({
      url: that.data.cloudUrl,
      method: 'GET',
      data: { 'index': 1, 'rank': that.data.rankIndex, 'language': that.data.languageIndex },
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            list: list
          })
          // 隐藏加载框  
          wx.hideLoading();  
        }
      }
    })

   
  },

  bindLanguageChange:function(e){
    // 显示加载图标  
    wx.showLoading({
      title: '加载中',
    })  

    this.setData({
      languageIndex: e.detail.value,
      index: 1
    })
    var that = this;

    wx.request({
      url: that.data.cloudUrl,
      method: 'GET',
      data: { 'index': 1, 'rank': that.data.rankIndex, 'language': that.data.languageIndex},
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          })
        } else {
          that.setData({
            list: list
          })
          // 隐藏加载框  
          wx.hideLoading();  
        }
      }
    })
    
  },

  copy:function(e){
    // console.log(e.currentTarget.dataset.uri)
    wx.setClipboardData({
      data: e.currentTarget.dataset.uri,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制改项目地址',
              icon: '',
              duration: 2000, //弹出时间
            })
          }
        })
      }
    })
  }
  
})