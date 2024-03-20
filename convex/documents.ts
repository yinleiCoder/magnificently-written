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