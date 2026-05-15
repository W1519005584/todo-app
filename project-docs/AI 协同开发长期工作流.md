# AI\_DEVELOPMENT\_WORKFLOW\.md

# AI 协同开发长期工作流

***

# 一、核心思想

长期项目里：

不要依赖：

- ChatGPT 聊天记录
- AI 自动记忆
- 超长上下文

而应该建立：

“文档驱动的 AI 协同开发体系”。

核心原则：

```text
代码是真相
文档是上下文
AI 是临时协作者
聊天只是工作区
```

***

# 二、为什么不能依赖长对话

长对话会逐渐出现：

- AI 忘记旧约束
- 混入废弃方案
- 上下文漂移
- 架构不一致
- 类型不一致
- 生成重复代码
- 开始“自相矛盾”

尤其大型项目：

- monorepo
- 全栈
- 多端
- 长周期开发

问题会越来越明显。

因此：

不要让 AI “回忆项目”。

而应该：

让 AI “读取项目文档”。

***

# 三、推荐目录结构

建议项目内维护：

```text
/docs
├─ PROJECT_CONTEXT.md
├─ CURRENT_TASK.md
├─ ARCHITECTURE.md
├─ API_SPEC.md
├─ DB_SCHEMA.md
├─ CODING_RULES.md
├─ DECISIONS.md
├─ CHANGELOG.md
├─ AI_DEVELOPMENT_WORKFLOW.md
```

并不是必须一次全部完成。

核心是：

```text
PROJECT_CONTEXT
+
CURRENT_TASK
```

***

# 四、每个文档的作用

***

# 1. PROJECT\_CONTEXT.md

项目“长期上下文”。

这是：

项目世界观。

更新频率：

低频更新。

***

## 作用

用于告诉 AI：

- 当前项目是什么
- 当前最终架构是什么
- 当前技术栈是什么
- 当前规范是什么

***

## 应包含

```md
# 项目目标

# 技术栈

# monorepo 结构

# apps/packages 职责

# 当前目录结构

# 当前架构设计

# API 设计

# 状态管理

# 数据流设计

# 类型管理

# 工程化方案

# 代码规范

# 当前环境配置

# 已完成模块

# 未完成模块

# 当前技术决策

# 注意事项
```

***

# 2. CURRENT\_TASK.md

项目“当前阶段上下文”。

这是：

当前 Sprint。

更新频率：

高频更新。

***

## 作用

告诉 AI：

```text
现在正在做什么
```

***

## 应包含

```md
# 当前开发目标

# 当前模块

# 当前阶段已完成内容

# 当前阶段未完成内容

# 当前阻塞问题

# 下一步计划

# 当前涉及文件
```

***

# 3. ARCHITECTURE.md

项目架构说明。

用于：

解释：

```text
为什么这样设计
```

***

## 应包含

```md
# 系统架构

# 模块边界

# 数据流

# 分层设计

# 服务职责

# 包依赖关系

# 前后端通信

# 权限设计
```

***

# 4. API\_SPEC.md

API 规范。

用于：

避免：

- API 漂移
- DTO 不一致
- 返回结构混乱

***

## 应包含

```md
# 接口路径

# 请求参数

# 响应结构

# 错误码

# 鉴权规则

# 分页规则
```

***

# 5. DB\_SCHEMA.md

数据库设计文档。

用于：

让 AI 理解：

- 表关系
- 数据结构
- 业务实体

***

## 应包含

```md
# 表结构

# 字段说明

# 主外键

# 索引

# 数据关系

# migration 规则
```

***

# 6. CODING\_RULES.md

代码规范。

非常重要。

这是：

防止 AI 乱写代码。

***

## 应包含

```md
# 命名规范

# 目录规范

# 类型规范

# hooks 规范

# 状态管理规范

# API 封装规范

# 错误处理规范

# 样式规范

# import 规范
```

***

# 7. DECISIONS.md

技术决策记录。

非常重要。

很多人没有。

但长期项目一定需要。

***

## 作用

记录：

```text
为什么这样设计
```

否则：

几个月后：

你自己都忘了。

AI 更不可能知道。

***

## 示例

```md
# 2026-05-12

决定：

统一前后端 TypeScript

原因：

- 类型共享
- 降低 DTO 成本
- 更适合 monorepo
```

***

# 8. CHANGELOG.md

项目阶段记录。

用于：

记录：

```text
发生了什么变化
```

***

## 示例

```md
# v0.2.0

- 新增 websocket
- 新增 auth
- 重构 request
```

***

# 五、正确的 AI 开发流程

***

# 1. 开发前

更新：

```text
PROJECT_CONTEXT.md
CURRENT_TASK.md
```

***

# 2. 新开对话

不要说：

```text
继续开发
```

而是：

```text
这是项目上下文：

(粘贴 PROJECT_CONTEXT)

这是当前任务：

(粘贴 CURRENT_TASK)

请基于这些继续开发。
```

***

# 3. 开发过程中

如果：

- 架构变了
- 技术栈变了
- 规范变了

同步更新 docs。

不要只更新聊天记录。

***

# 4. 阶段结束

让 AI：

更新：

```text
PROJECT_CONTEXT
CURRENT_TASK
DECISIONS
CHANGELOG
```

***

# 六、长期项目的最佳实践

***

# 1. 不要无限长对话

推荐：

一个阶段一个对话。

例如：

```text
Todo Architecture
Todo API
Todo Auth
Todo Websocket
Todo Deployment
```

***

# 2. 不要依赖 AI 记忆

AI Memory：

适合：

- 偏好
- 长期规则

不适合：

- 项目全部细节
- 架构全量信息
- 当前开发状态

***

# 3. 不要让 AI 猜

不要说：

```text
帮我继续
```

而是：

明确：

```text
当前结构
当前目标
当前限制
```

***

# 4. 文档比聊天重要

长期项目里：

真正重要的是：

```text
/docs
```

不是：

聊天记录。

***

# 七、推荐的长期 AI 开发模式

最终推荐：

```text
代码
+
文档
+
AI
+
阶段化开发
```

而不是：

```text
无限聊天
```

***

# 八、推荐的阶段性 Prompt

每完成一个阶段：

使用：

```text
请基于当前最终状态，更新：

- PROJECT_CONTEXT.md
- CURRENT_TASK.md
- DECISIONS.md
- CHANGELOG.md

要求：

- 删除废弃方案
- 只保留当前最终架构
- 不保留历史讨论
- 输出标准 markdown
```

***

# 九、最终目标

最终：

AI 不再依赖：

```text
聊天历史
```

而是依赖：

```text
项目文档
```

这才是长期稳定的 AI 协同开发模式。
