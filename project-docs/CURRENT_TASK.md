# 当前开发目标

完善 Todo App 工程化架构。

当前重点：

- 全局状态管理
- request 架构
- Git 工程化
- 后续 JWT 与用户系统准备

---

# 当前开发模块

当前模块：

- app.store.ts
- request 工程化
- 全局 loading 架构

---

# 当前阶段已完成内容

## 前端

已完成：

- Todo CRUD 页面
- Todo 页面组件化
- todo-input.vue
- todo-item.vue
- todo-list.vue
- empty-state.vue
- 页面布局修复
- page 背景方案
- Todo Store
- app.store.ts
- API 封装
- request 封装
- token 初始化
- loadingCount 架构
- Pinia 集成

---

## 后端

已完成：

- Todo CRUD API
- Hono
- Drizzle ORM
- SQLite
- zod 参数校验
- response 统一结构

---

## 工程化

已完成：

- Monorepo
- pnpm workspace
- GitHub 仓库方案
- main/develop 分支方案

---

# 当前阶段未完成内容

## request 自动 loading

目标：

request.ts 自动 startLoading/endLoading

---

## JWT

未开始。

---

## 用户系统

未开始。

---

## 登录系统

未开始。

---

## scroll-view 列表

未开始。

---

## 多端适配

未开始：

- 微信小程序
- App

---

# 当前阻塞问题

当前未确认：

- 手机端是否已完全恢复正常访问
- 手机访问 5173 是否正常
- 手机请求 3000 API 是否正常
- 局域网 CORS 是否完全正常

---

# 下一步开发计划

## 第一阶段

request 自动 loading。

目标：

- request 自动管理 loading
- store 不再手动控制 loading

---

## 第二阶段

JWT 登录系统。

包括：

- login API
- token
- auth module
- 用户状态

---

## 第三阶段

用户系统。

包括：

- user.store.ts
- 用户信息
- 自动登录
- 权限控制

---

## 第四阶段

多端适配。

包括：

- 微信小程序
- App

---

# 当前涉及的重要文件

## 前端

apps/client/src/pages/index/index.vue

apps/client/src/components/todo-input.vue

apps/client/src/components/todo-item.vue

apps/client/src/components/todo-list.vue

apps/client/src/components/empty-state.vue

apps/client/src/stores/todo.store.ts

apps/client/src/stores/app.store.ts

apps/client/src/api/todo.ts

apps/client/src/utils/request.ts

apps/client/src/types/todo.ts

apps/client/src/types/request.ts

apps/client/src/App.vue

apps/client/src/main.ts

apps/client/.env.development

apps/client/vite.config.ts

---

## 后端

apps/server/src/index.ts

apps/server/src/routes/todo.route.ts

apps/server/src/services/todo.service.ts

apps/server/src/schemas/todo.schema.ts

apps/server/src/db/schema.ts

apps/server/src/db/index.ts

apps/server/src/utils/response.ts
