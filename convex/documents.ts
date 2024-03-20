import { v } from 'convex/values'

import { mutation, query } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

// 创建笔记
export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }
        const userId = identity.subject
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId: userId,
            isArchived: false,
            isPublished: false,
        })
        return document
    },
})

// 查询侧边栏的笔记列表
export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }
        const userId = identity.subject
        const documents = await ctx.db.query("documents")
            .withIndex("by_user_parent", q =>
                q.eq("userId", userId)
                    .eq("parentDocument", args.parentDocument)
            )
            .filter(q => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()
        return documents
    }
})

// 软删除笔记及其子笔记
export const archive = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }

        const userId = identity.subject
        const userName = identity.name
        const existingDocument = await ctx.db.get(args.id)
        if (!existingDocument) {
            throw new Error("数据库中无该笔记, 删除操作失败")
        }
        if (existingDocument.userId !== userId) {
            throw new Error(`这篇笔记数据的权限归属于${userName}，删除操作失败`)
        }

        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", q =>
                    q.eq("userId", userId)
                        .eq("parentDocument", documentId)
                )
                .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                })

                await recursiveArchive(child._id)
            }
        }
        const document = await ctx.db.patch(args.id, {
            isArchived: true,
        })

        recursiveArchive(args.id)
        return document
    }
})

// 查询垃圾箱中的全部笔记
export const getTrash = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }

        const userId = identity.subject

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter(q => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect()
        return documents
    }
})

// 从垃圾桶中恢复笔记
export const restore = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }

        const userId = identity.subject
        const userName = identity.name

        const existingDocument = await ctx.db.get(args.id)
        if (!existingDocument) {
            throw new Error("数据库中无该笔记, 恢复操作失败")
        }
        if (existingDocument.userId !== userId) {
            throw new Error(`这篇笔记数据的权限归属于${userName}，恢复操作失败`)
        }

        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", q =>
                    q.eq("userId", userId)
                        .eq("parentDocument", documentId)
                )
                .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                })

                await recursiveRestore(child._id)
            }
        }

        const options: Partial<Doc<"documents">> = {
            isArchived: false
        }

        if (existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument)
            if (parent?.isArchived) {
                options.parentDocument = undefined
            }
        }

        const document = await ctx.db.patch(args.id, options)
        recursiveRestore(args.id)
        return document
    }
})

// 永久删除笔记
export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }

        const userId = identity.subject
        const userName = identity.name

        const existingDocument = await ctx.db.get(args.id)
        if (!existingDocument) {
            throw new Error("数据库中无该笔记, 永久删除操作失败")
        }
        if (existingDocument.userId !== userId) {
            throw new Error(`这篇笔记数据的权限归属于${userName}，永久删除操作失败`)
        }

        const document = await ctx.db.delete(args.id)
        return document
    },
})

// 获取command指定的搜索内容
export const getSearch = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("凭证无效，请登录")
        }

        const userId = identity.subject

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", q => q.eq("userId", userId))
            .filter(q => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()

        return documents
    }
})

// 根据id获取某个具体的笔记内容
export const getById = query({
    args: { documentId: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        const document = await ctx.db.get(args.documentId)

        if (!document) {
            throw new Error("没有该笔记数据，请重试或联系管理员查看Convex控制台")
        }

        if (document.isPublished && !document.isArchived) {
            return document
        }

        if (!identity) {
            throw new Error("该笔记未公开发布，处于私密阶段")
        }

        const userId = identity.subject

        if (document.userId !== userId) {
            throw new Error("该笔记的持有人未授权您查看此笔记")
        }

        return document
    },
})

// 更新某个笔记的具体笔记内容
export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("请先登录再进行更新笔记操作")
        }
        const userId = identity.subject

        const { id, ...rest } = args;

        const existingDocument = await ctx.db.get(id)
        if (!existingDocument) {
            throw new Error("服务器上不存在该笔记的相关数据")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("您不是该笔记的持有人，修改操作失败")
        }

        const document = await ctx.db.patch(id, {
            ...rest
        })
        return document
    },
})

// 删除笔记标题前的icon
export const removeIcon = mutation({
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("请先登录再进行更新笔记操作")
        }
        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)
        if (!existingDocument) {
            throw new Error("服务器上不存在该笔记的相关数据")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("您不是该笔记的持有人，删除图标操作失败")
        }

        const document = await ctx.db.patch(args.id, {
            icon: undefined
        })
        return document
    },
})