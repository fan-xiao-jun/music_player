/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var box = new Vue({
  el: "#box",
  data: {
    keywords: "",
    songList: [],
    songAddr: "",
    songCover: "",
    comments: [],
    isPlaying: false,
    isShow: false,
    mvAddr: "",
    songState:false
  },
  methods: {
    search: function () {
      var t = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.keywords
      ).then(function (res) {
        console.log(res);
        console.log(res.data.result.songs);
        t.songList = res.data.result.songs;
      }, function (err) {
        console.log(err);
      })
    },
    playSong: function (songId) {
      var t = this;
      //获取歌曲地址
      axios.get("https://autumnfish.cn/song/url?id=" + songId).then(
        function (res) {
          console.log(res);
          console.log(res.data.data);
          t.songAddr = res.data.data[0].url;
          console.log(t.songAddr);
        },
        function (err) { console.log(err); }
      )
      // 获取歌曲封面
      axios.get("https://autumnfish.cn/song/detail?ids=" + songId).then(
        function (res) {
          console.log(res);
          console.log(res.data.songs[0].al.picUrl);
          t.songCover = res.data.songs[0].al.picUrl;
        },
        function (err) { }
      );

      // 歌曲评论获取
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + songId).then(
        function (res) {
          console.log(res);
          console.log(res.data.hotComments);
          t.comments = res.data.hotComments;
        },
        function (err) { }
      );
     
    },
    
    // // 歌曲播放
    play: function () {
      // console.log("play");
      this.isPlaying = true;
    },
    // 歌曲暂停
    pause: function () {
      // console.log("pause");
      this.isPlaying = false;
    },
    // 播放mv
    playMV: function (mvid) {
      var t = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        function (res) {
          // console.log(res);
          console.log(res.data.data.url);
          t.isShow = true;
          t.mvAddr = res.data.data.url;
        },
        function (err) { }
      );
    },
    // 隐藏
    hide: function () {
      this.isShow = false;
      this.$refs.video.pause()

    },
    // 搜索历史记录中的歌曲
    historySearch(history) {
      this.query = history
      this.searchMusic()
      this.showHistory = false;
    }
  },

})