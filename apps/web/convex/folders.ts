import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ========== QUERIES ==========

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("folders")
      .withIndex("by_creator", (q) => q.eq("creatorId", user._id))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("folders") },
  handler: async (ctx, args) => {
    const folder = await ctx.db.get(args.id);
    if (!folder) return null;

    const creator = await ctx.db.get(folder.creatorId);

    return {
      ...folder,
      creator: creator ? { name: creator.name, username: creator.username } : null,
    };
  },
});

// ========== MUTATIONS ==========

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("folders", {
      title: args.title,
      description: args.description,
      creatorId: user._id,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("folders"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const folder = await ctx.db.get(args.id);
    if (!folder) {
      throw new Error("Folder not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user || folder.creatorId !== user._id) {
      throw new Error("Not authorized");
    }

    const updates: Record<string, unknown> = {};
    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("folders") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const folder = await ctx.db.get(args.id);
    if (!folder) {
      throw new Error("Folder not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user || folder.creatorId !== user._id) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
