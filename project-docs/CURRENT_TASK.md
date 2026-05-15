# 当前开发任务

## 当前开发目标

当前目标：

完成：

```txt
Todo App 基础工程化版本
```

包括：

- Store 工程化
- request 工程化
- loading
- error
- 多端联调
- 环境变量
- 状态管理

为后续：

- JWT
- 用户系统
- 登录
- 微信小程序
- App

做准备。

---

# 当前开发模块

## Todo 模块

当前包含：

- Todo CRUD
- Todo API
- Todo Store
- Todo 页面
- request 工程化

---

# 当前阶段已完成内容

# 前端

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
- loading 状态
- error 状态
- Todo 联调
- 局域网 H5 联调

---

# 后端

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

# 当前阶段未完成内容

# 前端

未完成：

- Todo 页面组件化
- empty-state
- 下拉刷新
- tabbar
- user.store.ts
- app.store.ts
- 登录页
- token 持久化完善
- 微信小程序适配
- App 打包

---

# 后端

未完成：

- JWT
- 用户系统
- 权限
- 中间件
- 日志
- 环境变量管理
- 错误处理中间件

---

# 当前阻塞问题

当前未确认：

```txt
手机端是否已完全恢复正常访问
```

需要继续验证：

- 手机访问 5173
- 手机请求 3000 API
- 局域网 CORS 是否完全正常

---

# 下一步开发计划

## 第一优先级

### Todo 页面组件化

拆分：

```txt
components/
├─ todo-input.vue
├─ todo-item.vue
├─ todo-list.vue
├─ empty-state.vue
```

---

## 第二优先级

### app.store.ts

负责：

- 全局 loading
- app 初始化
- 全局状态

---

## 第三优先级

### 用户系统基础

包括：

- user.store.ts
- 登录
- JWT
- token 管理

---

## 第四优先级

### 多端适配

包括：

- 微信小程序
- App

---

# 当前涉及的重要文件

# 前端

## request 工程化

```txt
apps/client/src/utils/request.ts
```

---

## Todo API

```txt
apps/client/src/api/todo.ts
```

---

## Todo Store

```txt
apps/client/src/stores/todo.store.ts
```

---

## Todo 页面

```txt
apps/client/src/pages/index/index.vue
```

---

## Todo 类型

```txt
apps/client/src/types/todo.ts
```

---

## request 类型

```txt
apps/client/src/types/request.ts
```

---

## 环境变量

```txt
apps/client/.env.development
```

---

## vite

```txt
apps/client/vite.config.ts
```

---

# 后端

## 服务入口

```txt
apps/server/src/index.ts
```

---

## Todo 路由

```txt
apps/server/src/routes/todo.route.ts
```

---

## Todo Service

```txt
apps/server/src/services/todo.service.ts
```

---

## zod schema

```txt
apps/server/src/schemas/todo.schema.ts
```

---

## 数据库 schema

```txt
apps/server/src/db/schema.ts
```

---

## 数据库连接

```txt
apps/server/src/db/index.ts
```

---

## response 工具

```txt
apps/server/src/utils/response.ts
```