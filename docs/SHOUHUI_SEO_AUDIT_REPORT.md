# 首汇科技官网 SEO 审计报告

> 审计日期：2026-08-21  
> 审计对象：[https://www.shouhuikeji.com](https://www.shouhuikeji.com)  
> 目标搜索引擎：百度、Google、Bing  
> 审计阶段：只读扫描、问题诊断与改造方案  
> 实施状态：尚未执行 SEO 代码改造

## 执行摘要

当前官网是 Vue 3 + Vite 5 + Vue Router 4 构建的纯客户端 SPA。站内已有 4 个解决方案、9 个产品详情和 13 个案例详情，业务内容基础较好，但技术 SEO 存在明显短板：所有 URL 首次返回相同的空 SPA 壳；全站共用一个标题；线上 robots 和 sitemap 实际返回 HTML；任意不存在的 URL 返回 200；非 www HTTPS 域名返回 500；动态详情非法 ID 会回退到真实内容或空页面。

当前最合适的路线不是直接迁移 Nuxt，而是先统一 URL 和状态码，再补路由级 metadata、robots、sitemap、可爬取链接与真实 404，随后对有限静态路由实施构建期预渲染。

## A. 当前技术架构

### A1. 技术栈

- Vue 3
- Vue Router 4
- Vite 5
- `createWebHistory()` History 路由
- Axios + Element Plus
- 纯客户端 SPA
- 无 SSR、SSG 或预渲染
- `vite-plugin-sitemap` 已安装但未启用

证据：

- `package.json:10-20`
- `vite.config.js:3-30`
- `src/router/index.js:1-25`
- `src/main.js`

### A2. 首次 HTML

源码和构建产物的正文都只有：

```html
<div id="app"></div>
```

证据：

- `index.html:8-10`
- `dist/index.html:7-12`

线上直接请求以下 URL 时，返回的原始 HTML 完全相同：

- `/`
- `/solutions/gate`
- `/products/ct47`
- `/cases/sally`
- 任意不存在的 URL
- `/robots.txt`
- `/sitemap.xml`

原始响应共同特征：

- 447 字节
- 相同内容摘要
- title 只有“首汇科技”
- 无 description
- 无 canonical
- 无 robots meta
- 无 H1
- 无页面正文
- 无 JSON-LD

因此明确标记：**【纯 SPA SEO 风险】**。

JavaScript 执行后页面正文和动态 H1 能正常出现，但 title、description、canonical、robots 和 JSON-LD 仍然缺失。

### A3. 三大搜索引擎风险

- **百度：高风险。** 首次 HTML 没有中文正文、H1、产品名和方案内容，动态详情收录稳定性不足。
- **Google：中高风险。** Google 通常可以执行 JavaScript，但存在二次渲染延迟、软 404、重复 URL 和资源失败风险。
- **Bing：中高风险。** 与 Google 类似，同时缺少 sitemap、canonical 和 IndexNow。

### A4. 公开路由

静态路由：

- `/`
- `/solutions`
- `/products`
- `/cases`
- `/news`
- `/about`
- `/about/history`
- `/about/philosophy`
- `/about/honors`
- `/contact`

动态路由：

- `/solutions/:id`
- `/products/:id`
- `/cases/:id`

数据规模：

- 4 个解决方案：`gate`、`yard`、`safety`、`hardware`
- 9 个产品详情
- 13 个案例详情
- 新闻无站内详情路由

证据：

- `src/router/index.js:3-22`
- `src/data/solutions-data.js`
- `src/data/products-data.js`
- `src/data/cases-data.js`

### A5. 新闻、API 与 CMS

新闻通过浏览器请求 `/api/articles`，项目中没有 API 后端、数据库或 CMS 源码，也没有 `/news/:id` 站内详情路由。新闻点击仅在存在 `article.link` 时打开外部地址。

证据：

- `src/views/News.vue:104-119`
- `src/views/News.vue:151-159`
- `src/views/Home.vue:183-190`
- `src/api/request.js:3-50`
- `vite.config.js:14-22`

本地代理仅用于开发环境，生产反向代理和 CMS 发布流程无法从本仓库确认。

### A6. 线上 URL 与状态码

| 请求 | 实际结果 | 判断 |
|---|---|---|
| `http://www.shouhuikeji.com/` | 301 到 HTTPS www | 正确 |
| `https://www.shouhuikeji.com/` | 200 | 主域正常 |
| `https://shouhuikeji.com/` | 500 | 严重，应 301 到 www |
| `/solutions` | 200 | 正常 |
| `/solutions/` | 200 | 与无尾斜杠版本重复 |
| `/Solutions` | 200 | 大小写错误仍返回 SPA 壳 |
| `/?utm_source=...` | 200 | 无 canonical，参数重复风险 |
| `/solutions/not-a-real-id` | 200 | 软 404/重复内容 |
| `/products/not-a-real-id` | 200 | 软 404/空内容 |
| `/cases/not-a-real-id` | 200 | 软 404/重复案例 |
| 任意不存在路径 | 200 | 全局软 404 |
| `/robots.txt` | 200 `text/html` | 不是有效 robots |
| `/sitemap.xml` | 200 `text/html` | 不是 XML sitemap |

### A7. 架构路线评估

| 路线 | 收益 | 局限 | 建议 |
|---|---|---|---|
| 纯 SPA 小改 | 可补 metadata | 首次 HTML 仍无正文 | 作为第一步，不是终点 |
| 构建期预渲染 | 直接输出 H1、正文和 metadata | API 新闻需单独处理 | **当前最推荐** |
| SSG | 适合有限静态数据路由 | 需调整构建流程 | 中期评估 |
| SSR | 适合实时新闻/API 内容 | 运维成本最高 | 当前不优先 |

## B. SEO 总体评分

| 项目 | 评分 | 主要扣分原因 |
|---|---:|---|
| 技术 SEO | 20/100 | SPA 壳、错误状态码、无 robots/sitemap/canonical/404 |
| 页面 SEO | 35/100 | H1 基本存在，但 metadata 重复、内链不可爬取 |
| 百度收录友好度 | 15/100 | 核心内容依赖 JS，无 sitemap 和主动提交 |
| Google 友好度 | 35/100 | 可渲染 JS，但存在软 404、重复 URL 和 CWV 风险 |
| Bing 友好度 | 35/100 | 缺 sitemap、canonical、IndexNow 和结构化数据 |
| 内容覆盖 | 55/100 | 方案、产品、案例基础较好，但核心意图页不足 |

## C. P0 问题清单

| 问题 | 涉及文件/页面 | 影响 | 改造建议 | 风险 |
|---|---|---|---|---|
| 首次 HTML 是空 SPA 壳 | `index.html`、`dist/index.html`、全部公开页 | 百度抓不到正文；Google/Bing 延迟渲染 | 有限路由预渲染 | 需保证 hydration 和数据一致 |
| 全站共用静态 title | `index.html:6` | 页面主题无法区分 | 建立路由和数据驱动 metadata | 已收录页需监控波动 |
| robots 无效 | 线上 `/robots.txt` | 返回 HTML，抓取规则不可用 | 输出真正 `text/plain` robots | 错误规则可能误封页面 |
| sitemap 无效 | 线上 `/sitemap.xml` | 搜索引擎无法使用 | 构建时生成标准 XML | 不得纳入无效和测试 URL |
| 全局软 404 | 任意不存在路径均 200 | 污染索引、浪费抓取预算 | 客户端和服务器协同返回真实 404 | 需区分有效深链接与未知路径 |
| 方案非法 ID 回退到 gate | `SolutionDetail.vue:144-146` | 无限重复智能闸口内容 | 非法 ID 进入 404 | 先确认历史收录 |
| 案例非法 ID 回退第一条案例 | `CaseDetail.vue:114-117` | 无限重复案例 URL | 非法 ID 进入 404 | 同上 |
| 产品非法 ID 显示空壳 | `ProductDetail.vue:134-145` | 软 404和薄内容 | 非法 ID 进入 404 | 低 |
| 非 www HTTPS 返回 500 | `https://shouhuikeji.com/` | 主机信号分裂、外链损失 | 单跳 301 到 www 对应路径 | 核实 DNS、证书和历史外链 |
| 无 canonical/URL 规范 | 全站 | 尾斜杠、大小写、query 重复 | 统一绝对 canonical 和必要 301 | 已收录 URL 不可直接删除 |

## D. P1 问题清单

| 问题 | 影响 | 建议 |
|---|---|---|
| 无 description、robots meta、OG/Twitter | 搜索摘要和规范信号不可控 | 每个可索引页面生成唯一 metadata |
| 新闻无站内详情 | 无独立文章 URL、H1、canonical、Article schema | 确认新闻策略后增加站内详情或明确不索引 |
| 新闻完全依赖 API 和 JS | API 故障或爬虫不执行 JS 时为空 | 构建期导出或 SSR；提供真实 fallback |
| 方案、案例、热门产品卡片使用 `div @click` | 无 JS 时无法沿链接发现详情 | 改为真实 `router-link` 或 `a` |
| 产品中心只直接暴露前 4 个产品 | 其余产品发现能力弱 | 输出全部产品稳定链接 |
| 案例分页无 URL | 后续记录无法稳定发现和分享 | sitemap 纳入详情；必要时设计分页 URL |
| 产品 intro 数据未渲染 | 产品独特正文和场景不足 | 输出真实 intro 和适用场景 |
| About 页面双 H1 | 标题层级不明确 | 每页保留一个 H1 |
| 栏目 H1 使用泛化英文词 | 中文搜索主题弱 | 中文核心主题作为 H1，英文为辅助文本 |
| About 图片 alt 为空 | 图片语义缺失 | 非装饰图补真实 alt |
| 解决方案图片引用缺失 | 图片 404、页面质量下降 | 核对资产并清理死引用 |
| 核心业务意图缺独立页面 | 商业搜索意图匹配弱 | 仅为真实业务新增充分内容页 |

## E. P2 优化清单

| 问题 | 建议 |
|---|---|
| 无 JSON-LD | 真实 Organization、Product、Article、BreadcrumbList |
| 面包屑只是视觉文本 | 使用 `nav`、`ol` 和 BreadcrumbList |
| 无 FAQ | 仅根据真实售前问题补充 |
| 无 lazy loading | 区分首屏图和折叠以下图片 |
| 无图片宽高和响应式尺寸 | 增加尺寸、`srcset`、`sizes` |
| 图片目录约 141 MB | 压缩、缩放、WebP/AVIF、多尺寸派生 |
| `ct47.png` 实际为 AVIF | 核实扩展名、MIME 和兼容性 |
| 案例轮播 alt 重复 | 按真实图片内容区分 alt |
| 案例分类字段不一致 | 统一 `category` 和 `solutionCategory` |
| 筛选/分页无 URL 状态 | 只为真实搜索意图设计可索引 URL |
| 业务详情间上下文链接不足 | 增加有限、自然、真实的主题内链 |

代表性大图：

- `public/images/solutions/360.png`：约 7.3 MB
- `public/images/solutions/weigh-station.jpg`：约 7.5 MB
- `public/images/solutions/wms-system.png`：约 2.5 MB
- `public/images/solutions/security-platform.png`：约 3.7 MB
- `public/images/success-case/sunpaper-wlan/img-14.png`：约 9.6 MB
- `public/images/success-case/shengshi-gate/cover.jpg`：约 4.9 MB

## F. 主营业务页面覆盖情况

| 业务 | 独立页面 | 当前 URL | SEO 状态 | 建议 |
|---|---|---|---|---|
| 智慧堆场解决方案 | 有 | `/solutions/yard` | 内容较完整但无独立 metadata/首屏 HTML | 保留为主题主页面 |
| 堆场管理系统 | 无 | `/solutions/yard` YMS 模块 | 只有功能段 | 【建议新增 SEO 落地页】 |
| 集装箱堆场管理系统 | 无 | `/solutions/yard` | 无独立主题 | 【建议新增 SEO 落地页】 |
| 智能闸口 | 有 | `/solutions/gate` | 内容较完整 | 强化无人值守和港口场景 |
| 行人通行 | 无 | `/solutions/safety` 门禁/定位模块 | 只有功能段 | 先确认业务深度，再新增 |
| 停车场管理 | 无 | 无 | 无充分业务证据 | 先确认是否真实提供 |
| 仓储物料系统 | 无 | `/solutions/yard`、`/cases/waiyun` | 功能和案例分散 | 【建议新增 SEO 落地页】 |
| 仓储管理系统 | 无 | `/solutions/yard` WMS | 只有模块内容 | 【建议新增 SEO 落地页】 |
| 货代管理系统 | 无 | `/solutions/yard`、`/cases/xinhuidong` | 有模块和案例 | 【建议新增 SEO 落地页】 |
| 铅封机 | 无 | `/solutions/gate` 功能段 | 无产品主题页 | 核实产品后新增 |
| 叉车智能理货 | 无 | `/solutions/hardware`、`/cases/forklift-scale` | 有方案和案例 | 【建议新增 SEO 落地页】 |
| 海关在途监管电子锁 | 无 | `/solutions/safety`、`/cases/weihai` | 内容分散 | 【建议新增 SEO 落地页】 |
| 360°安全环视 | 无 | `/solutions/safety`、相关案例 | 功能/案例级 | 【建议新增 SEO 落地页】 |
| 手持 PDA | 有型号页 | `/products/ct47`、`/products/eda*` | 产品数据较完整 | 增强品类和场景链接 |
| 工业 PDA | 有型号页 | CT47、EDA51K、EDA56、EDA61K | 无统一品类页 | 可考虑真实产品集合页 |
| 扫码枪 | 有 | `/products/granit-ultra-2105i` | 有规格和特点 | 补工业扫码真实场景 |
| 条码打印机 | 有 | `/products/px240s` | 有产品规格 | 补标签应用场景 |
| 标签打印机 | 部分 | `/products/px240s` | 单型号间接覆盖 | 有产品组合后再规划 |
| 无线网络覆盖 | 无 | `/solutions/hardware`、`/cases/sunpaper` | 功能和案例级 | 【建议新增 SEO 落地页】 |
| 堆场无线网络覆盖 | 无 | `/cases/sunpaper` | 主要依靠案例 | 【建议新增 SEO 落地页】 |
| 仓库无线网络覆盖 | 无 | `/cases/sunpaper` | 主要依靠案例 | 【建议新增 SEO 落地页】 |
| 无线基站 | 无 | `/solutions/hardware` 文本 | 无产品详情 | 核实产品后再新增 |
| 数据大屏 | 无 | 首页未渲染数据、yard 零散文本 | 无可访问主题页 | 确认业务后新增 |
| 堆场数据可视化 | 无 | `/solutions/yard` | 只有描述 | 【建议新增 SEO 落地页】 |
| 仓储/物流数据可视化 | 无 | 无 | 无独立内容 | 确认能力后规划 |

## G. 关键词覆盖与 Cannibalization

| 关键词意图 | 当前页面 | 判断 | 主要问题 | 建议 |
|---|---|---|---|---|
| 智慧堆场、堆场数字化 | `/solutions/yard` | 基本合理 | 无 metadata 和首屏正文 | 作为主商业页 |
| 堆场管理系统 | `/solutions/yard` YMS 段 | 部分合理 | 与 TMS/WMS/SAMS 混在同页 | 建议独立页 |
| 集装箱堆场管理系统 | `/solutions/yard` | 不充分 | 无明确独立主题 | 建议独立页 |
| 码头管理、智慧码头 | 零散方案/案例 | 不充分 | 无主页面 | 先确认产品边界 |
| 智能闸口、无人值守闸口 | `/solutions/gate` | 合理 | 首页、案例重复泛化 | 方案页承接商业意图 |
| 叉车智能理货 | 方案 + 案例 | 部分合理 | 缺独立商业页 | 落地页承接意图，案例作证明 |
| 海关在途监管、电子锁 | `/solutions/safety` + 案例 | 部分合理 | 方案和案例竞争 | 建主题页或强化层级内链 |
| 仓储管理、物料管理 | WMS 模块 + 案例 | 不充分 | 只有模块和案例 | 建议独立页 |
| 货代管理系统 | SAMS 模块 + 案例 | 不充分 | 无独立页，分类不一致 | 建议独立页并修正分类 |
| 工业/手持 PDA | 多个产品详情 | 型号意图合理 | 无品类集合页 | 完整产品入口或集合页 |
| 扫码枪 | Granit 型号页 | 基本合理 | 单型号承担整个品类 | 明确型号与品类关系 |
| 条码/标签打印机 | PX240S | 部分合理 | 单型号承担两个品类 | 有产品组合后建品类页 |
| 无线网络覆盖 | hardware + 案例 | 部分合理 | 功能和案例分散 | 建议独立页 |
| 数据大屏/可视化 | yard 零散描述 | 不充分 | 无主题 URL | 确认业务后新增 |

潜在互相争抢：

1. 首页重复四大方案描述，但 CTA 统一跳 `/solutions`，会弱化详情页主题信号。
2. `/solutions/yard` 与 `/cases/waiyun`、`/cases/xinhuidong` 同时覆盖 WMS、货代和场站词。
3. `/solutions/safety` 与多个案例同时覆盖电子锁、360 安全和监管词。
4. `/solutions/hardware` 与产品型号页同时覆盖工业终端和打印扫码词。
5. `xinhuidong` 的 `category` 为“智能闸口”，但 `solutionCategory` 为 `yard`，分类和意图不一致。

建议统一规则：

- 解决方案/落地页承接商业搜索意图。
- 产品页承接品类、型号、规格和硬件意图。
- 案例页承接客户证明和项目实践意图。
- 首页承担品牌和业务总览，不承接全部长尾词。

## H. 建议修改的文件

> 本次未修改，以下为下一阶段建议。

| 文件 | 建议修改内容 | 优先级 | 线上风险 |
|---|---|---:|---|
| `index.html` | 基础站点 metadata | P0 | 低 |
| `src/router/index.js` | URL 合同、route meta、catch-all 404 | P0 | 中 |
| `src/views/SolutionDetail.vue` | 非法 ID 404，不 fallback | P0 | 中 |
| `src/views/CaseDetail.vue` | 非法 ID 404、监听参数变化、上下文链接 | P0/P1 | 中 |
| `src/views/ProductDetail.vue` | 非法 ID 404、输出 intro | P0/P1 | 低 |
| `src/views/News.vue` | 确定站内详情或外部聚合策略 | P1 | 中 |
| `src/views/Products.vue` | 输出全部产品真实链接 | P1 | 低 |
| `src/views/Solutions.vue` | 卡片真实链接、优化 H1 | P1 | 低 |
| `src/views/Cases.vue` | 卡片真实链接、分页策略 | P1 | 低 |
| `src/views/Home.vue` | CTA 指向对应详情，降低争抢 | P1 | 低 |
| `src/views/AboutLayout.vue` | 子页标题层级 | P1 | 低 |
| `src/views/AboutGroup.vue` | 去除第二 H1、修复 alt | P1 | 低 |
| `src/data/solutions-data.js` | 清理失效图片、核实内容 | P1/P2 | 低 |
| `src/data/cases-data.js` | 统一分类和意图 | P2 | 低 |
| `src/directives/imgOss.js` | 图片尺寸、格式和失败策略 | P2 | 中 |
| `vite.config.js` | 预渲染与 sitemap 生成 | P0/P1 | 中 |
| 生产 Nginx/网关 | www、URL 规范、深链接和真实 404 | P0 | 高 |

## I. 建议新增的文件或模块

> 仅建议，尚未创建。

| 文件/模块 | 用途 | 优先级 |
|---|---|---:|
| `public/robots.txt` | 抓取规则和 sitemap 声明 | P0 |
| sitemap 生成脚本 | 从真实路由和数据生成 XML | P0 |
| `public/sitemap.xml` 构建产物 | 供三大搜索引擎使用 | P0 |
| `src/views/NotFound.vue` | 404 展示 | P0 |
| SEO/head 管理模块 | title、description、canonical、OG、robots | P0/P1 |
| 预渲染路由脚本/配置 | 输出有限路由 HTML | P0/P1 |
| JSON-LD 工具 | Organization/Product/Article/BreadcrumbList | P2 |
| URL 提交服务或 CI 脚本 | 百度 URL API、Bing IndexNow | P2 |
| 新闻详情页/API 导出层 | 新闻需要收录时使用 | 待确认 |

Sitemap 当前最适合构建时生成。首批应纳入首页、栏目、4 个方案、9 个产品、13 个案例、About 子页和联系页；不应纳入非法 ID、筛选、搜索、测试、query 重复 URL、404、草稿和外部新闻链接。

## J. 搜索引擎兼容矩阵

| SEO 项目 | 百度 | Google | Bing | 当前状态 | 建议 |
|---|---|---|---|---|---|
| robots | 不可用 | 不可用 | 不可用 | 200 HTML | 输出真正 robots |
| sitemap | 不可用 | 不可用 | 不可用 | 200 HTML，不是 XML | 构建时生成 |
| canonical | 高风险 | 高风险 | 高风险 | 全站无 | 每页绝对 canonical |
| SPA 渲染 | 极高风险 | 中高风险 | 中高风险 | 原始 HTML 只有 `#app` | 有限页面预渲染 |
| JSON-LD | 缺失 | 缺失 | 缺失 | 全站 0 个 | 使用真实结构化数据 |
| URL 提交 | 缺失 | 不建议普通主动提交 | 缺失 | 仅可选 `_hmt` pageview | 百度服务端提交；Bing IndexNow |
| 404 | 严重 | 严重 | 严重 | 任意 URL 200 | 客户端+服务器真实 404 |
| Core Web Vitals | 中高风险 | 高风险 | 高风险 | 大图、无 lazy/srcset | 优化图片和首屏资源 |
| www 统一 | 严重 | 严重 | 严重 | 非 www HTTPS 500 | 301 到 www |
| metadata | 严重 | 严重 | 严重 | 同 title、无 description | 路由级唯一 metadata |

## K. 三大站长平台后续动作

### 百度搜索资源平台

1. 验证正式 www HTTPS 站点。
2. 导出历史收录和异常 URL。
3. 修复 HTML、404、robots、sitemap 后再提交。
4. 提交统一 sitemap。
5. 对已有 canonical URL 批量提交。
6. 新内容发布后由服务端异步提交。
7. 百度 token 只能放现有后端、独立服务端脚本或 CI Secret。
8. 禁止 `VITE_BAIDU_TOKEN`，禁止进入前端 bundle。

### Google Search Console

1. 验证 Domain Property。
2. 提交统一 sitemap。
3. 对首页、方案、产品和案例做 URL Inspection。
4. 对比 Crawled HTML 与 Rendered HTML。
5. 检查 Soft 404、Duplicate、Currently not indexed 和 Core Web Vitals。
6. 使用 Rich Results Test 验证结构化数据。
7. 不采用过时或非官方的普通 URL 主动提交。

### Bing Webmaster Tools

1. 验证域名并提交 sitemap。
2. 检查 robots、canonical 和软 404。
3. 内容发布稳定后评估 IndexNow。
4. 提交逻辑位于后端或 CI，不进入前端 JS。
5. 协议要求的 Key 验证文件可按规范公开，但管理和提交逻辑不得散落在前端。

### URL 主动提交架构

当前仓库没有服务端。建议接入现有业务后端，或使用独立发布脚本/CI 任务：

```text
内容正式发布
→ 页面 URL 可访问且状态正确
→ 更新 sitemap
→ 服务端/CI 异步提交百度和 Bing
→ 记录结果
→ 失败重试
```

提交失败不能阻断正常内容发布。只提交 canonical URL，不提交外部新闻、404、筛选和参数重复 URL。

## L. 下一阶段准备做什么

### 阶段 0：确认与基线

目标：先固定线上规则，不贸然改已收录 URL。

准备工作：

1. 确认唯一主域名和尾斜杠规则。
2. 获取 Nginx/网关配置。
3. 导出三大站长平台历史收录 URL。
4. 确认新闻、API 和 CMS 发布流程。
5. 建立关键 URL 的 title、description、canonical 表。

产出：

- URL 合同
- 旧 URL/301 映射表
- 可索引路由清单
- metadata 文案清单
- SEO 回归测试清单

### 阶段 1：P0 技术修复

目标：解决抓取、索引、重复 URL 和错误状态码。

计划：

1. 修复非 www HTTPS 500，统一 301 到 www。
2. 增加路由 catch-all 和非法动态 ID 校验。
3. 让未知 URL 返回真实 404。
4. 增加路由级 title、description、canonical、robots、OG。
5. 建立有效 robots。
6. 构建时生成 sitemap。
7. 校验 History fallback 只服务合法前端路由。

验收：

- 有效 URL 200
- 未知 URL 404
- 重复 URL 301 或 canonical
- robots 为 `text/plain`
- sitemap 为合法 XML
- 每页 metadata 唯一

### 阶段 2：可发现性与页面 SEO

目标：让详情页可被正常沿链接发现并强化页面主题。

计划：

1. 卡片改为真实链接。
2. 输出全部产品入口。
3. 输出产品 intro。
4. 修正 H1、alt、面包屑和分类数据。
5. 建立方案→产品→案例自然内链。
6. 清理失效图片引用。

### 阶段 3：构建期预渲染

目标：让首次 HTML 直接包含正文、H1 和 metadata。

首批范围：

- 首页
- 栏目页
- 4 个解决方案
- 9 个产品
- 13 个案例
- About 子页
- 联系页

新闻单独决策：若需要站内收录，则设计站内详情和构建导出/SSR；若仅聚合外部文章，则不进入 sitemap。

### 阶段 4：内容主题页

在业务确认和资料充足后，按优先级新增：

1. 堆场管理系统/集装箱堆场管理系统
2. 仓储物料管理系统/WMS
3. 货代管理系统
4. 海关在途监管电子锁
5. 叉车智能理货
6. 工业无线网络覆盖
7. 数据大屏与数据可视化

每个页面必须有真实场景、客户痛点、方案、核心功能、适用范围、案例关系和 CTA，不以堆关键词为目的。

### 阶段 5：结构化数据与性能

1. 真实 Organization、Product、Article、BreadcrumbList。
2. 图片压缩和 WebP/AVIF。
3. 多尺寸图片、`srcset`、`sizes`。
4. 首屏资源优先级与折叠以下 lazy loading。
5. 建立 Lighthouse、Search Console、CrUX 或 RUM 基线。

### 阶段 6：站长平台与主动提交

在前述页面稳定后：

1. 提交 robots 和 sitemap。
2. 百度批量提交现有 canonical URL。
3. 新内容发布后自动提交百度。
4. Bing 接入 IndexNow。
5. Google 依赖 sitemap、内链、Search Console 和自然抓取。
6. 建立失败重试、日志和告警。

### 推荐先执行的第一批

如果获得确认，下一阶段建议只先做以下低风险、高收益事项：

1. URL 合同和 metadata 文案表。
2. 404/非法 ID 方案设计。
3. robots 与 sitemap 生成设计。
4. 路由级 SEO/head 模块设计。
5. 生产 Nginx 的 www、404 和 History fallback 方案。

完成设计评审后再修改代码，不直接一次性大改。

## M. 需要确认的事项

1. 是否确认唯一主域名为 `https://www.shouhuikeji.com`？
2. 是否统一采用无尾斜杠 URL？
3. 是否能提供百度、Google、Bing 历史收录 URL？
4. 是否能提供生产 Nginx/网关配置？
5. 是否允许增加客户端 404 并同步调整服务器状态码？
6. 是否允许保留 Vue/Vite 并实施构建期预渲染？
7. 新闻是否需要站内详情 URL？
8. 是否允许增加统一 SEO/head 管理模块？
9. 是否允许构建时生成 robots 和 sitemap？
10. WMS、货代、电子锁、叉车理货、无线覆盖是否允许新增独立落地页？
11. 停车场管理、行人通行、数据大屏、无线基站、RFID 是否为真实在售/实施业务？
12. 产品、方案、案例中的客户、效果、认证和数据是否都有公开证明？
13. 百度 URL 提交和 Bing IndexNow 接入现有后端，还是独立 CI/发布脚本？
14. 是否允许后续处理图片压缩、响应式图片和 lazy loading？

## 结论

当前最大问题不是内容完全缺失，而是搜索引擎首次拿不到内容、URL 和状态码缺少统一规则，以及现有业务页面无法通过 metadata、canonical、sitemap 和真实链接形成稳定索引。

下一阶段应先处理 URL、404、metadata、robots、sitemap 和预渲染基础，再扩展内容页和搜索引擎提交。不要直接迁移 Nuxt，不要先批量提交当前软 404 和重复 URL。
