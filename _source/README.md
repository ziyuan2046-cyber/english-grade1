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
