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

---

# 2026-05-18 本轮开发进度

## 已完成

- 完成 request 自动 loading：
  - `apps/client/src/utils/request.ts` 统一调用 `appStore.startLoading()` / `appStore.endLoading()`
  - `apps/client/src/stores/todo.store.ts` 已移除手动 loading 控制
  - loading 继续使用 `loadingCount` 处理并发请求
- 启动 JWT / 登录系统基础开发：
  - 后端新增 `users` 表 schema
  - 后端新增 `auth` 模块：
    - `POST /auth/register`
    - `POST /auth/login`
    - `GET /auth/me`
  - 后端新增轻量 JWT 工具：
    - HS256 签名
    - token 过期校验
    - Authorization Bearer token 解析
  - 后端新增密码哈希：
    - Node `crypto.scryptSync`
    - 随机 salt
  - 前端新增登录/注册页：
    - `apps/client/src/pages/login/index.vue`
  - 前端新增用户状态：
    - `apps/client/src/stores/user.store.ts`
  - 前端新增认证 API：
    - `apps/client/src/api/auth.ts`
  - 前端新增用户类型：
    - `apps/client/src/types/user.ts`
  - 首页已接入 token 检查、当前用户信息获取、退出登录

## 当前阶段状态

- 第一阶段 `request 自动 loading` 已完成。
- 第二阶段 `JWT 登录系统` 已完成基础闭环：
  - 注册
  - 登录
  - token 持久化
  - 获取当前用户
  - 前端登录页
  - 前端用户 store

## 尚未完成

- Todo 数据尚未绑定 userId。
- Todo API 尚未强制鉴权。
- 尚未实现 auth middleware 统一保护路由。
- 尚未实现 refresh token。
- 尚未实现正式环境变量管理：
  - `JWT_SECRET`
  - token 过期时间
- 尚未完成微信小程序和 App 端登录适配专项验证。

## 下一步建议

1. 新增 auth middleware，统一解析 JWT。
2. Todo 表增加 `user_id` 字段。
3. Todo CRUD 按当前登录用户隔离数据。
4. 前端 Todo 页面处理未登录、登录过期、退出后的状态清理。
5. 补充环境变量管理，避免开发密钥写死。

---

# 2026-05-18 追加进度

## 已完成

- 新增后端 auth middleware：
  - `apps/server/src/middlewares/auth.middleware.ts`
  - 统一解析 `Authorization: Bearer <token>`
  - token 无效或过期时返回 401
- Todo API 已接入 JWT 鉴权：
  - `/todos/*` 统一使用 auth middleware
- Todo 数据已按登录用户隔离：
  - `todos` 表新增 `user_id`
  - `getTodoList(userId)`
  - `createTodo(userId, title)`
  - `updateTodo(userId, id, data)`
  - `deleteTodo(userId, id)`
- 前端 Todo 类型新增：
  - `Todo.userId?: number | null`
- 数据库迁移新增：
  - `drizzle/0002_add_todo_user_id.sql`

## 当前阶段状态

- JWT 登录系统已经具备基础可用闭环。
- Todo API 已经不再是公开接口。
- Todo 数据已经按用户隔离。

## 仍未完成

- `user_id` 当前为兼容已有数据而允许为空，后续可在数据迁移完成后改为非空。
- 尚未补充统一环境变量模块。
- 尚未补充 refresh token。
- 尚未做微信小程序/App 登录专项适配验证。

## 下一步建议

1. 抽取服务端环境变量配置模块。
2. 将 `JWT_SECRET`、token 过期时间纳入环境变量。
3. 前端退出登录时同步清理 Todo store。
4. 增加登录过期场景的页面体验优化。
