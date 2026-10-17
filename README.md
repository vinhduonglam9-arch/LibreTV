# LibreTV 2.0

> 免费、开源、开箱即用的在线影视聚合搜索与电视直播平台（电脑版 / Web 版）

[![Version](https://img.shields.io/badge/version-2.0-red.svg)](https://github.com/vinhduonglam9-arch/LibreTV)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-AGPL--3.0-green.svg)](./LICENSE)

---

## 📖 项目简介

**LibreTV 2.0** 是基于 Next.js 15（App Router）+ TypeScript + Tailwind CSS 构建的高性能影视聚合观看平台。播放内核由 **ArtPlayer + hls.js** 驱动，支持硬件解码、广告分片过滤、跨源同名影片聚合、记忆断点续播以及全国高清电视直播。

本项目已**全面预置并测活 10 大苹果 CMS 公网点播采集站与全国 IPv4 电视直播源**，无需繁琐配置，拉取即可开箱即搜即看！

---

## ✨ 核心特性

- 🎬 **10 大高质量点播源开箱即用**：内置 10 组实测 200/206 且原生支持 CORS 的公网采集站（极速、光速、金鹰、豪华、虎牙、百度、魔都动漫、红牛、非凡、优质资源等），彻底告别切片 404 失效。
- 🔍 **服务端并行聚合搜索**：输入片名同时抓取所有有效源，毫秒级合并展示；同名影片归一为单卡片，方便比对画质与剧集完整度。
- 🔄 **智能换源与测速**：观影时支持一键换源，系统自动在不同资源站间测速排序，无缝切换并保持当前集数与播放时间。
- 📺 **全国高清电视直播**：内置全国 500+ 高清电视频道（央视全套、各省卫视、中文综合频道），支持 XMLTV 电子节目单（EPG）与分类筛选。
- ⏩ **专业级观影控制**：ArtPlayer + hls.js 驱动，支持快捷键、0.5x~3.0x 多倍速、自动连播下一集、广告分片智能剔除。
- 💾 **本地隐私存储**：播放历史与续播进度完全保存在本机浏览器 IndexedDB，不上传隐私，支持精确到秒的无缝断点续播。
- 🏠 **局域网家庭影音中心**：一台电脑部署，局域网内任意手机、电脑、平板或智能电视浏览器均可免装 App 直接输入 IP 观影。

---

## 📡 内置预设数据源

### 1. 点播采集源（已在 `.env` 中预置 `DEFAULT_SOURCES`）

| 采集站名称 | 接口协议 | 接口特性 | 支持分类 |
| :--- | :--- | :--- | :--- |
| **极速资源** | Apple CMS | 原生 CORS 放行 / 200 高速 | 电影、电视剧、综艺、动漫 |
| **光速资源** | Apple CMS | 原生 CORS 放行 / 200 高速 | 电影、电视剧、综艺、动漫 |
| **金鹰资源** | Apple CMS | 206 范围传输 / 流畅播放 | 电影、电视剧、短剧、动漫 |
| **豪华资源** | Apple CMS | 原生 CORS 放行 / 200 高速 | 电影、热播剧集、综艺 |
| **虎牙资源** | Apple CMS | 原生 CORS 放行 / 1080P 高清 | 电影、电视剧、动作、动漫 |
| **百度资源** | Apple CMS | 206 流式传输 / 资源丰富 | 电影、电视剧、综艺、少儿 |
| **魔都动漫** | Apple CMS | 原生 CORS 放行 / 动漫专区 | 日本新番、国漫热血、剧场版 |
| **红牛资源** | Apple CMS | 206 范围传输 / 线路稳定 | 电影、电视剧、战争、纪录片 |
| **非凡资源** | Apple CMS | 206 范围传输 / 独播资源丰富 | 华语热播剧、院线电影 |
| **优质资源** | Apple CMS | 206 范围传输 / 1080P 专线 | 蓝光原盘、高清电影 |

### 2. 电视直播源（已在 `.env` 中预置 `DEFAULT_LIVE_SOURCES`）

| 直播源分类 | 频道数量 | 播放列表格式 | 配套 EPG 节目单 |
| :--- | :--- | :--- | :--- |
| **央视卫视精选 (IPv4)** | 520+ 频道 | 标准 M3U8 直播流 | 支持（全国全时段电视节目单） |
| **国内精选电视** | 200+ 频道 | 标准 M3U8 直播流 | 支持（央视、卫视、综合频道） |
| **中国综合频道** | 147 频道 | 标准 M3U8 直播流 | 支持（IPTV-Org 国际索引） |
| **中文精选频道** | 215 频道 | 标准 M3U8 直播流 | 支持（全球中文广播与电视频道） |

---

## 🚀 快速上手

### 运行环境要求
- **Node.js**：`>= 18.0.0`（推荐 Node.js 20+ 或 22+）
- **npm**、**pnpm** 或 **yarn**

### 1. 源码运行（推荐）

```bash
# 1. 克隆本仓库
git clone https://github.com/vinhduonglam9-arch/LibreTV.git
cd LibreTV

# 2. 安装项目依赖
npm install

# 3. 生产打包构建
npm run build

# 4. 启动服务（默认监听 8080 端口）
npm start
```

启动完成后，打开浏览器访问：
- **本机访问**：[http://localhost:8080](http://localhost:8080)
- **局域网访问**：`http://<电脑的局域网IP>:8080`
- **默认访问密码**：`libretv`

---

### 2. Docker Compose 部署

项目根目录已附带 `docker-compose.yml`，执行以下命令即可一键容器化部署：

```bash
# 启动容器
docker compose up -d

# 查看运行日志
docker compose logs -f
```

---

## ⚙️ 配置文件说明（.env）

项目根目录包含 `.env` 文件，所有关键参数均支持自由调节：

| 参数名 | 默认值 | 作用说明 |
| :--- | :--- | :--- |
| `PASSWORD` | `libretv` | **必填**：站点访问密码（防止公开部署被滥用） |
| `COOKIE_SECURE` | `false` | **重要**：设为 `false` 允许在 HTTP/局域网访问下正常保存登录会话 |
| `REQUEST_TIMEOUT` | `8000` | 代理与上游采集站请求超时时限（毫秒） |
| `MAX_RETRIES` | `1` | 上游接口请求失败时的重试次数 |
| `DEFAULT_SOURCES` | JSON 数组 | 预置点播采集源配置（已内置 10 大已测活高速源） |
| `DEFAULT_LIVE_SOURCES` | JSON 数组 | 预置直播频道源（已内置央视、卫视全国频道列表） |
| `DEBUG` | `false` | 是否开启服务端详细调试日志 |

> 提示：`public/sources.json` 提供了符合 `LibreTV-SourceList JSON` 规范的完整源列表，可在设置中作为订阅源导入或导出至 TVBox 等软件。

---

## 🛠️ 常用开发命令

```bash
# 启动本地开发热重载服务器
npm run dev

# 运行 TypeScript 类型静态检查
npm run typecheck

# 运行代码规范检查
npm run lint

# 运行单元测试套件（含解析器与核心库单测）
npm run test
```

---

## ❓ 常见问题排查

1. **局域网内其他设备打不开或提示未登录？**
   - 检查 `.env` 文件中是否设置了 `COOKIE_SECURE=false`（生产模式在非 HTTPS 下如果为 true 会丢弃 Cookie）。
   - 检查电脑防火墙是否放行了 `8080` 端口入站连接。

2. **个别影片播放提示加载失败？**
   - 在播放器右下角点击「换源」按钮，即可切换至极速、光速、豪华、百度等其他来源，系统会自动保留当前集数与观看进度。

3. **如何修改访问密码？**
   - 直接修改根目录下 `.env` 中的 `PASSWORD=你的新密码`，重启服务后即可生效。

---

## 📄 开源许可证与免责声明

- 本项目基于 [AGPL-3.0 License](./LICENSE) 开源。
- 本项目仅提供第三方公开网络接口的聚合搜索、解析与播放内核技术支持，不存储、不上传、不分发任何影视资源文件，内容的合法性由对应数据源负责。
