# 项目目标

开发一个支持：

- Web（H5）
- 微信小程序
- App

的多端 Todo / 事件待办应用。

项目核心目标：

- 练习完整全栈工程能力
- 建立现代 TypeScript 全栈架构
- 建立完整前后端数据流
- 建立多端开发能力
- 强化工程化能力
- 强化状态管理能力

后续支持：

- 用户系统
- 登录
- JWT
- 分类
- 提醒
- 日历

当前重点：

- 工程化
- 类型安全
- 多端适配
- API 设计
- 状态管理
- request 统一封装
- 业务架构

---

# 当前最终技术栈

## Monorepo

- pnpm workspace

---

## 前端

### 核心

- uni-app
- Vue3
- TypeScript
- Vite

---

### 状态管理

- Pinia

---

### 网络请求

- uni.request
- request 二次封装

---

### UI

当前未接入 UI 库。

---

## 后端

### Web Framework

- Hono

---

### ORM

- Drizzle ORM

---

### 数据库

开发阶段：

- SQLite

数据库文件：

apps/server/db/sqlite.db

---

### 参数校验

- zod

---

# monorepo 结构

todo-app
├─ apps
│ ├─ client
│ └─ server
├─ packages
├─ package.json
├─ pnpm-workspace.yaml
└─ pnpm-lock.yaml

---

# apps/packages 职责

## apps/client

uni-app 前端。

负责：

- H5
- 微信小程序
- App

多端业务。

---

## apps/server

Hono 后端。

负责：

- API
- 数据库
- 用户系统
- JWT
- 权限
- 数据管理

---

## packages

预留共享包。

后续可能：

packages/
├─ shared
├─ types
├─ utils
├─ config

当前未启用。

---

# 当前目录结构

## 前端

apps/client/src
├─ api
│ └─ todo.ts
├─ components
│ ├─ empty-state.vue
│ ├─ todo-input.vue
│ ├─ todo-item.vue
│ └─ todo-list.vue
├─ pages
│ └─ index
│ └─ index.vue
├─ stores
│ ├─ app.store.ts
│ └─ todo.store.ts
├─ types
│ ├─ todo.ts
│ └─ request.ts
├─ utils
│ └─ request.ts
├─ App.vue
└─ main.ts

---

## 后端

apps/server/src
├─ db
│ ├─ index.ts
│ └─ schema.ts
├─ routes
│ └─ todo.route.ts
├─ schemas
│ └─ todo.schema.ts
├─ services
│ └─ todo.service.ts
├─ utils
│ └─ response.ts
└─ index.ts

---

# 当前架构设计

## 前端架构

当前采用：

Page
↓
Component
↓
Business Store
↓
App Store
↓
API
↓
Request
↓
Backend

---

## pages

负责：

- 页面 UI
- 生命周期
- 页面交互

不直接请求数据库。

---

## components

负责：

- UI
- 组件交互

不直接请求 API。

---

## stores

负责：

- Todo 状态
- loading
- error
- action 封装
- 全局状态

当前：

stores/
├─ todo.store.ts
└─ app.store.ts

---

## api

负责：

- 接口调用
- API 与业务解耦

当前：

api/todo.ts

---

## utils/request.ts

负责：

- BASE_URL
- token 注入
- 请求统一封装
- 错误处理
- toast
- timeout
- loading 管理

---

## 后端架构

### routes

负责：

- HTTP 层
- API 路由
- 参数解析
- 响应返回

不直接写数据库逻辑。

---

### services

负责：

- 业务逻辑
- Drizzle ORM 操作

---

### schemas

负责：

- zod 参数校验
- DTO

---

### db

负责：

- SQLite
- Drizzle ORM
- schema

---

# API 设计

## RESTful

使用：

GET
POST
PATCH
DELETE

---

## 当前 API

### GET /todos

获取 Todo 列表。

---

### POST /todos

新增 Todo。

---

### PATCH /todos/:id

更新 Todo。

---

### DELETE /todos/:id

删除 Todo。

---

# 状态管理方案

使用：

- Pinia

---

## 当前 Store

stores/
├─ todo.store.ts
└─ app.store.ts

---

## todo.store.ts

负责：

- todos
- error
- Todo CRUD action

---

## app.store.ts

负责：

- loading
- loadingCount
- initialized
- token
- app 初始化

---

# 数据流设计

当前数据流：

Page
↓
Store
↓
API
↓
Request
↓
Hono Route
↓
Service
↓
Drizzle ORM
↓
SQLite

组件通过 emit 向页面传递事件。

页面通过 store action 调用业务。

---

# 类型管理规范

## 前端

类型统一放置：

apps/client/src/types

---

## 当前类型文件

types/
├─ todo.ts
└─ request.ts

---

## request 泛型

统一：

request<T>();

---

## 后端

zod 负责：

- DTO
- 参数校验
- 类型推导

---

# 工程化方案

## 类型安全

全项目：

- TypeScript

---

## 参数校验

使用：

- zod

---

## 数据库 Migration

使用：

- drizzle-kit

---

## Monorepo

使用：

- pnpm workspace

---

## request 工程化

当前 request 已支持：

- BASE_URL
- token 自动注入
- toast
- 网络错误处理
- timeout
- 统一响应结构

---

## Git 分支策略

分支：

- main
- develop

---

### main

生产稳定分支。

受保护。

禁止直接开发。

---

### develop

功能迭代分支。

当前开发主分支。

---

## 后续功能分支规范

feature/\*

例如：

- feature/auth
- feature/user-system

---

## Commit 规范

### feat

新功能。

---

### fix

Bug 修复。

---

### refactor

重构。

---

### chore

工程杂项。

---

# 当前代码规范

## 前端

原则：

- 页面不直接调用 request
- 页面不直接操作数据库
- 页面不处理复杂业务逻辑
- 页面只调用 store

---

## components

原则：

- 单一职责
- UI 与业务分离

---

## Store

负责：

- loading
- error
- action
- 状态管理

不负责 UI。

---

## API

负责：

- HTTP 请求
- 与后端通信

---

## Request

统一 request。

禁止页面直接 uni.request。

---

## Vue

统一使用：

<script setup lang="ts">

---

## 样式规范

页面背景使用：

page {}

不使用：

height: 100vh

避免 uni-app 导航栏导致滚动问题。

---

## 后端

### route

负责：

- HTTP 层
- 参数解析
- response 返回

不处理复杂业务逻辑。

---

### service

负责：

- 数据库操作
- 业务逻辑

---

### schema

负责：

- zod 校验

---

## 命名规范

统一：

xxx.route.ts
xxx.service.ts
xxx.schema.ts

---

# 当前环境配置方案

## 前端环境变量

### .env.development

VITE_API_BASE_URL=http://192.168.1.95:3000

---

## vite.config.ts

server:
- host: 0.0.0.0
- port: 5173

---

## Hono

### index.ts

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
});

---

## CORS

开发阶段：

app.use(
  '*',
  cors({
    origin: '*',
  })
);

---

## token

存储：

uni.setStorageSync

初始化：

app.store.initializeApp()

---

# 已完成模块

## 前端

已完成：

- uni-app 初始化
- Vue3 + TS
- Pinia
- request 封装
- request 工程化
- BASE_URL 环境变量
- token 自动注入
- Todo API
- Todo 页面
- Todo Store
- app.store.ts
- Todo 页面组件化
- todo-input.vue
- todo-item.vue
- todo-list.vue
- empty-state.vue
- loading 状态
- error 状态
- loadingCount 架构
- 页面布局修复
- page 背景方案
- Todo 联调
- 局域网 H5 联调

---

## 后端

已完成：

- Hono 初始化
- SQLite
- Drizzle ORM
- drizzle migration
- Todo CRUD
- routes 分层
- services 分层
- zod 参数校验
- response 统一结构
- CORS 配置
- 局域网访问支持

---

## 工程化

已完成：

- Monorepo
- pnpm workspace
- GitHub 仓库方案
- Git 分支方案
- main/develop 分支结构

---

# 当前未完成模块

## 前端

未完成：

- request 自动 loading
- 全局错误处理
- 下拉刷新
- tabbar
- user.store.ts
- 登录页
- token 持久化完善
- 微信小程序适配
- App 打包
- scroll-view 列表

---

## 后端

未完成：

- JWT
- 用户系统
- 权限
- 中间件
- 日志
- 环境变量管理
- 错误处理中间件

---

# 当前重要技术决策

## 使用 Hono 替代 NestJS

原因：

- 更轻量
- 更适合当前阶段
- 配置简单
- 开发效率高

---

## 使用 Drizzle 替代 Prisma

原因：

- 更轻量
- SQL 风格更直接
- 更适合个人项目

---

## 使用 SQLite 作为开发数据库

原因：

- 零配置
- 本地开发快

---

## 使用 zod 替代 class-validator

原因：

- 类型推导更强
- 更适合 TS 生态

---

## 使用 Pinia 作为状态管理

原因：

- Vue3 官方推荐
- 类型支持更好

---

## request 层统一处理错误

request.ts 负责：

- toast
- code 判断
- 网络错误处理

store 不再处理 response code。

---

## loading 使用 loadingCount

避免并发请求导致 loading 冲突。

---

## 页面背景使用 page

不使用 100vh。

避免 uni-app 导航栏导致页面滚动。

---

# 当前已知问题

## request 自动 loading 未完成

当前 loading 仍由 store 手动控制。

---

## Windows 防火墙

可能阻止：

- 3000
- 5173

局域网访问。

---

## uni-app PATCH 类型

uni-app TS 类型未完整支持：

PATCH

request.ts 使用：

method as any

处理。

---

## 多端适配未开始

当前主要验证 H5。

---

# 注意事项

## zod v4

错误字段：

result.error.issues;

不是：

result.error.errors;

---

## request.ts

request 方法统一：

request<T>();

---

## request.ts

不要写死：

localhost

必须使用：

VITE_API_BASE_URL

---

## 局域网联调

前端：

5173

后端：

3000

必须：

0.0.0.0

监听。

---

## Pinia

需要安装：

pnpm add @vue/devtools-api

---

## uni-app 页面不要直接使用 100vh

会受导航栏影响导致滚动条。

---

## 页面背景优先使用 page {}

避免 container 高度问题。

---

## request 不允许页面直接调用 uni.request

必须统一封装。

---

## 所有请求必须经过 API 层

页面不直接请求后端。
