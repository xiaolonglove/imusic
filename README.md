# imusic
> 基于Vue的移动端音乐app

## 技术栈
  + node + vue + vue-router

## 使用
``` bash
## 安装依赖
npm install

# 启动 at localhost:3000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 提示
> 浏览器控制台切换移动端模式 刷新后才能正常滚动

## 目标功能
- [x] 歌单       -- 待完善歌单播放功能
- [x] 歌手       -- 完成
- [x] 电台       -- 待完善电台播放功能
- [x] 排行榜     -- 待完善排行榜播放功能
- [x] 新歌       -- 完成
- [x] 歌手       -- 完成
- [x] 播放歌曲   -- 完成
- [x] 歌词匹配   -- 完成
- [x] 播放列表   -- 完成
- [ ] 搜索       -- 待完善
- [ ] 播放模式   -- 待完善
- [ ] 收藏音乐   -- 待添加
- [ ] 最近播放   -- 待添加
- [ ] 收藏歌单   -- 待添加
- [ ] 引入vuex   -- 待以上功能完成，用vuex重写
- [ ] react重写  -- 待以上功能完成，用react重写

## 项目预览
![我的][1]
![推荐][2]
![新歌][3]
![歌手][4]
![电台][5]
![排行][6]
![播放][7]

[1]: http://i1.bvimg.com/676283/9777293f4ee8cf4a.png
[2]: http://i2.bvimg.com/676283/539215f904e92be6.gif
[3]: http://i2.bvimg.com/676283/6963c5180d173309.png
[4]: http://i2.bvimg.com/676283/b51bc2dfb200a68f.gif
[5]: http://i2.bvimg.com/676283/ebf7cfb2b3716861.png
[6]: http://i2.bvimg.com/676283/af71db1dc5a8cd2c.png
[7]: http://i2.bvimg.com/676283/26ef760373f5821d.gif

## 目录结构
```
    .
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 项目核心文件
│   ├── api                                     // 数据抓取API
|       └── config                              // 请求公共配置
|       └── disc                                // 歌单抓取
|       └── recommend                           // 推荐抓取
|       └── search                              // 搜索抓取
|       └── singer                              // 歌手抓取
|       └── song                                // 歌曲抓取
│   ├── base                                    // 基础组件
|       └── back                                // 顶部返回组件
|       └── confirm                             // 对话框组件
|       └── disclist                            // 歌单组件
|       └── loading                             // 加载中提示框组件
|       └── nothing                             // 无内容样式展示组件
|       └── progressBar                         // 播放器进度条
|       └── scroll                              // 页面滚动组件
|       └── searchbox                           // 搜索框组件
|       └── slider                              // 轮播图组件
|       └── songlist                            // 歌曲列表子组件
|       └── split                               // 隔断组件
│   ├── common                                  // 公共资源
|       └── fonts                               // 字体图标
|       └── js                                  // 公共js
|           └── bus                             // 多层组件传递数据
|           └── cache                           // localstorage相关
|           └── config                          // 公共配置文件
|           └── dom                             // Dom相关方法
|           └── jsonp                           // jsonp封装
|           └── mixin                           // 组件mixin
|           └── singer                          // 处理歌手格式
|           └── song                            // 处理歌曲格式
|           └── utils                           // js工具库
|       └── stylus                              // 公共样式
│   ├── components                              // 业务组件
|       └── disc                                // 歌单
|       └── discCategories                      // 歌单类型
|       └── discovery                           // 发现
|       └── header                              // 头部
|       └── musiclist                           // 歌曲列表
|       └── mymusic                             // 我的
|       └── mymusicList                         // 我的歌曲
|       └── newSong                             // 新歌
|       └── player                              // 播放器
|       └── playlist                            // 播放列表
|       └── radio                               // 电台
|       └── recommend                           // 推荐
|       └── search                              // 搜索
|       └── singer                              // 歌手
|       └── singerList                          // 歌手详情
|       └── top                                 // 排行
|       └── user                                // 个人中心
|   ├── router                                  // 路由
│   ├── App.vue                                 // 组件入口
│   ├── main.js                                 // 入口文件
├── index.html                                  // 模板html文件

```

### 参考
> 慕课网黄佚老师Vue Music App