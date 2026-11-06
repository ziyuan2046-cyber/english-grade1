# 外研英语源码

本次从线上最新版本无损恢复教材数据，避免再用旧本地源码覆盖课文与闪卡修复。

## 本地构建

```powershell
node scripts/prepare-public.mjs
npm ci
npm run build
node scripts/publish-build.mjs
```

构建前同步上一层仓库的媒体资源，构建后仅复制新文件，不删除旧媒体。发布前修改 `index.html` 和 `public/sw.js` 中的版本标识，核对缓存迁移；使用正常 Git 提交和推送，不强推。

## 课程维护

- `src/lib/books.tsx`：一至六年级上下册，共 12 册。当前只有 g1-up 开放。开放新册前需引入独立教材数据，不能简单复用一年级数据。
- `src/data/curriculum.ts`：保留发布前线上全部 58 个单词、课文句子与分段对应、媒体路径。
- `src/data/originalAudio.ts`：36 个用户提供音频的逐文件索引、相对来源文件名与 SHA-256。
- `content-audit.json`：部署文件核对清单。原音频为原样副本，不以哈希不同认定旧音频内容缺失。
- Wrap up（P37）没有可确认的对应正文和音频，保留位置；其余未提供教材均为预留。
- 新增单句发音为辅助合成发音；不替换现有教材配套音频。
- 播放器修复连续播放当前 src、队列索引、重复、播放错误反馈，并防止视频／单句／课文同时发声。

## 发布与数据

继续使用原有 `/english-grade1/` 地址，历史 hash 路由与二维码仍有效。SW 只轮换本课程缓存，不清除 localStorage、IndexedDB 或其他课程缓存。`_source/` 为可重复构建源码，GitHub Pages 默认不会把下划线目录发布为页面。


## 全页面教材分类修复（waiyan3）

- BookProvider 在每次渲染直接解析 URL 的 book 参数，不再在 effect 中滞后复制当前教材。旧版无 book 的详情链接固定解释为一年级上册，不受用户保存的其他年级影响。
- BookPicker 为全局组件：主页展开按钮，各栏目及详情页提供年级和上下册选择。
- data/catalog.ts 是逐册数据入口；未开放册次返回空数据，不回退到一年级。未来教材需在这里增加独立数据并更新 BOOKS 的可用状态。
- 各栏目保留本页标题与对应预留状态。切换册次仍在当前栏目；从单元／视频详情切换回目录，从句子详情切换回课文栏目，从附录详情切换回跟读。
- BookLink、useBookNavigate 为内部跳转统一附带 book 参数；单元标签修改 URL 时保留 book 与其他查询参数。
- 书册变化重置页面内搜索、单元和卡片状态并停止音频；浏览器前进后退、刷新以 URL 为准。
