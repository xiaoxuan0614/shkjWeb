# 首汇科技官网环境配置与 SEO 说明

> 更新日期：2026-08-24
>
> 开发分支：`feat/seo`
>
> 正式域名：`https://www.shouhuikeji.com`

## 1. 环境总览

| 环境 | 访问前缀 | 构建命令 | 产物 | API | 索引策略 |
|---|---|---|---|---|---|
| 本地开发 | `/` | `npm run dev` | Vite 内存服务 | Vite 代理到正式 API，可通过环境变量改写 | 不对外索引 |
| 测试环境 | `/v2/` | `npm run build:test` | `dist/` | 同源根路径 `/api/` | Nginx 必须添加 `X-Robots-Tag: noindex, nofollow` |
| 正式环境 | `/` | `npm run build` | `dist/` | Nginx 反向代理到 `website-backend:8080` | 允许索引，输出 robots、sitemap、canonical |

`dist/` 是可重复生成的构建产物，不提交到 Git。`deploy/packages/` 中的压缩包也不提交到 Git。

## 2. 本地开发环境

### 2.1 启动

```bash
npm install
npm run dev
```

当前 Vite 配置：

- 默认端口：`3000`
- `host: true`，允许局域网访问
- 本机访问：`http://localhost:3000`
- 局域网访问：`http://<本机内网 IP>:3000`
- `/api/` 默认代理到 `https://www.shouhuikeji.com`

查看 Mac 内网 IP：

```bash
ipconfig getifaddr en0
```

局域网其他人需与开发机处于同一网络，并且 macOS 防火墙允许 Node 接收入站连接。

### 2.2 本地 API 切换

默认使用正式 API。如果存在独立测试后端，可在本地 `.env.local` 中配置：

```dotenv
VITE_API_PROXY_TARGET=https://test-api.example.com
```

`.env*` 已被 Git 忽略，不应提交密钥或内网地址。

## 3. 测试环境 `/v2/`

### 3.1 构建

```bash
npm run build:test
```

该命令等价于：

```bash
VITE_BASE_PATH=/v2/ npm run build
```

构建时会同时完成：

1. 客户端 Vite 构建。
2. SSR 专用 bundle 构建。
3. 静态路由和已发布新闻预渲染。
4. sitemap 生成。
5. SEO 自动检查。

Vite 资源地址和 Vue Router 都使用 `import.meta.env.BASE_URL`，因此测试包中的链接会生成为：

```text
/v2/
/v2/solutions
/v2/products
/v2/news/17
/v2/assets/...
/v2/images/...
```

### 3.2 打包

```bash
mkdir -p deploy/packages
tar -czf deploy/packages/shkj-web-test-v2-YYYYMMDD.tar.gz -C dist .
```

### 3.3 部署到正式域名的 `/v2/`

如果测试页与正式站共用当前 Nginx `root /opt/apps/website/frontend/dist`，将测试包解压到 `dist/v2/`：

```bash
mkdir -p /opt/apps/website/frontend/dist/v2
tar -xzf shkj-web-test-v2-YYYYMMDD.tar.gz \
  -C /opt/apps/website/frontend/dist/v2
```

Nginx 增加：

```nginx
location = /v2 {
    return 302 /v2/;
}

location ^~ /v2/ {
    add_header X-Robots-Tag "noindex, nofollow" always;
    try_files $uri/index.html $uri =404;
}
```

注意：

- `/v2/` 只是测试路径，不应进入搜索引擎索引。
- 测试包内 canonical 仍指向正式 URL，这是预期行为。
- 测试环境的 API 仍请求根路径 `/api/`，不是 `/v2/api/`。
- 如果测试后端不是正式后端，必须单独调整 Nginx `/api/` 代理或构建时的 `VITE_API_BASE_URL`。

## 4. 正式环境

### 4.1 构建

```bash
npm run build
```

正式构建默认 `VITE_BASE_PATH=/`，最终内容输出到 `dist/`。

构建新闻详情页时会请求已发布新闻 API。默认 API 地址为：

```text
https://www.shouhuikeji.com
```

如果需要指定其他预渲染 API：

```bash
SEO_API_BASE_URL=https://api.example.com npm run build
```

只有在明确允许“新闻抓取失败时继续构建”时才使用：

```bash
SEO_ALLOW_NEWS_FAILURE=1 npm run build
```

正式发布不建议使用该开关，否则新闻详情页可能未被预渲染。

### 4.2 Nginx

正式配置模板位于：

```text
deploy/nginx-seo.conf
```

当前模板实现：

- HTTP 统一 301 到 `https://www.shouhuikeji.com`。
- 非 www HTTPS 统一 301 到 www。
- 页面 URL 统一为无尾斜杠，首页 `/` 除外。
- 直接返回预渲染的 `/path/index.html`。
- 未知路径返回真实 404 页面。
- `/uploads/` 指向上传文件目录。
- `/api/` 反向代理到 `website-backend:8080`。

上线前必须确认：

1. SSL 证书同时覆盖 `shouhuikeji.com` 和 `www.shouhuikeji.com`。
2. `nginx -t` 通过。
3. 备份当前正式 `dist`。
4. 替换文件后 reload Nginx。
5. 检查首页、详情页、API、robots、sitemap 和 404 状态码。

## 5. 环境变量

| 变量 | 使用阶段 | 默认值 | 用途 |
|---|---|---|---|
| `VITE_BASE_PATH` | Vite 构建 | `/` | 测试构建设为 `/v2/` |
| `VITE_API_PROXY_TARGET` | 本地 dev server | `https://www.shouhuikeji.com` | 本地 `/api/` 代理目标 |
| `VITE_API_BASE_URL` | 浏览器运行时 | `/` | 非同源 API 的 base URL |
| `SEO_API_BASE_URL` | SSR/预渲染 | `https://www.shouhuikeji.com` | 构建时读取新闻 API |
| `SEO_ALLOW_NEWS_FAILURE` | 预渲染 | 未开启 | 设为 `1` 时允许新闻 API 失败后继续构建 |

## 6. SEO 已完成项

### 6.1 可抓取 HTML

- 建立 SSR 构建入口 `src/entry-server.js`。
- 构建期预渲染静态页、解决方案、产品、案例和新闻详情。
- 当前构建验证通过 57 个可索引页面，其中包含 21 篇新闻。
- 新闻正文会在构建时写入 HTML，不再只返回空 SPA 壳。

### 6.2 页面级 metadata

- 为首页、栏目页、解决方案、产品、案例和新闻生成独立 title。
- 生成独立 meta description。
- 生成 canonical URL。
- 生成 robots meta。
- 生成 Open Graph title、description、type、URL 和 image。
- 生成 Twitter large image card。

### 6.3 结构化数据

- 首页：`Organization`。
- 产品详情：`Product` + `BreadcrumbList`。
- 新闻详情：`Article` + `BreadcrumbList`。
- 解决方案、案例等详情：`BreadcrumbList`。

### 6.4 URL 和 404

- Vue Router 增加通用 404 路由。
- 无效解决方案、产品和案例 ID 进入 404，不再回退到其他真实内容。
- 404 页面设置 `noindex,follow`。
- Nginx 模板统一 www、HTTPS 和无尾斜杠 URL。
- Nginx 模板对不存在路径返回真实 404。

### 6.5 robots、sitemap 和自动检查

- `public/robots.txt` 允许抓取正式站，并声明 sitemap。
- 构建时自动生成 `dist/sitemap.xml`。
- 新闻 sitemap 条目带 `lastmod`。
- SEO 检查脚本会校验：
  - 每页仅一个 H1。
  - title 唯一。
  - description 存在。
  - canonical 正确且唯一。
  - sitemap 包含全部可索引页。
  - 新闻正文已预渲染。
  - 404 为 noindex。

### 6.6 内链和内容结构

- 主要卡片和详情入口改为真实 `router-link`，提升无 JavaScript 条件下的可发现性。
- 主要页面统一了 H1/H2 层级。
- 新闻详情支持站内 URL、SSR 数据注入和内容清洗。
- 删除了未被引用的图片和重复构建文件，当前未扫描到无引用的 `public/images` 图片。

## 7. SEO 尚未完成项

### P0：上线前必须完成

1. **将 `deploy/nginx-seo.conf` 真正合并到服务器 Nginx 并验证。** 仓库中目前只是配置模板，不代表线上已生效。
2. **验证非 www HTTPS。** `https://shouhuikeji.com/*` 应单跳 301 到对应 www URL，并确认证书覆盖两个域名。
3. **验证真实 404 和无尾斜杠重定向。** 需要上线后用 HTTP 响应头确认，不能只看浏览器页面。
4. **为 `/v2/` 测试环境加 noindex 响应头或访问控制。** 否则测试页面可能被抓取。
5. **确认正式构建可稳定访问新闻 API。** 新闻预渲染依赖构建机访问 API。

### P1：上线后立即完成

1. 在百度搜索资源平台添加并验证站点，提交 sitemap。
2. 在 Google Search Console 添加并验证站点，提交 sitemap。
3. 在 Bing Webmaster Tools 添加并验证站点，提交 sitemap。
4. 评估百度普通收录/快速收录推送和 Bing IndexNow；仓库尚未实现主动推送脚本。
5. 用 Google Rich Results Test 和 Schema Markup Validator 验证结构化数据。
6. 检查百度、Google 和 Bing 实际抓取的 HTML 与缓存页面。

### P2：持续优化

1. **性能与 Core Web Vitals：** 继续压缩大图，输出 WebP/AVIF 和响应式 `srcset/sizes`，检查 LCP、CLS、INP。
2. **图片 SEO：** 继续审核 alt、尺寸、文件名和 OSS 响应头。
3. **新闻发布自动化：** CMS 发布新闻后需要触发重新构建，目前尚无 webhook/CI 自动化。
4. **sitemap 时效性：** 静态页尚无 `lastmod`，新闻已有。
5. **内容覆盖：** 根据真实业务补充堆场管理系统、WMS、SAMS、无线网络覆盖、叉车智能理货等独立主题页。
6. **面包屑语义：** 部分视觉面包屑仍可进一步改为 `nav + ol`。
7. **列表 URL 状态：** 案例筛选和分页尚未形成可分享 URL，需根据搜索意图决定是否索引。
8. **监控与数据：** 代码保留了百度统计路由上报调用，但仓库内没有确认统计脚本的实际注入与账号配置。

## 8. 发布验证清单

### 测试环境

```bash
curl -I https://<host>/v2/
curl -I https://<host>/v2/solutions
curl -I https://<host>/v2/not-found
```

要求：

- 有效页面返回 200。
- 静态资源返回 200。
- 所有 `/v2/` 响应包含 `X-Robots-Tag: noindex, nofollow`。
- 未知路径返回 404。
- 页面内导航始终保留 `/v2/` 前缀。

### 正式环境

```bash
curl -I http://shouhuikeji.com/solutions/gate
curl -I https://shouhuikeji.com/solutions/gate
curl -I https://www.shouhuikeji.com/solutions/
curl -I https://www.shouhuikeji.com/not-a-real-page
curl -I https://www.shouhuikeji.com/robots.txt
curl -I https://www.shouhuikeji.com/sitemap.xml
```

要求：

- HTTP 和非 www HTTPS 单跳 301 到 `https://www.shouhuikeji.com/...`。
- `/solutions/` 301 到 `/solutions`。
- 不存在页面返回 404，不是 200 软 404。
- robots 返回文本，sitemap 返回 XML。
- 查看网页源代码可直接看到页面 H1、正文、title、description、canonical 和 JSON-LD。

## 9. 关键文件

| 文件 | 用途 |
|---|---|
| `vite.config.js` | base path、本地端口和 API 代理 |
| `src/router/index.js` | 路由、404 和 `/v2/` base |
| `src/seo/site.js` | 路由 SEO 数据和结构化数据 |
| `src/seo/manager.js` | 客户端和 SSR head 输出 |
| `src/entry-server.js` | SSR 渲染入口 |
| `scripts/prerender.mjs` | 构建期预渲染、新闻获取和 sitemap |
| `scripts/check-seo.mjs` | SEO 构建质量检查 |
| `public/robots.txt` | 正式 robots |
| `deploy/nginx-seo.conf` | 正式 Nginx 配置模板 |
