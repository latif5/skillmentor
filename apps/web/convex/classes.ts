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

    // Get classes where user is a member
    const memberships = await ctx.db
      .query("classMemberships")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const classIds = memberships.map((m) => m.classId);
    const classes = await Promise.all(classIds.map((id) => ctx.db.get(id)));

    return classes.filter(Boolean);
  },
});

export const getById = query({
  args: { id: v.id("classes") },
  handler: async (ctx, args) => {
    const classData = await ctx.db.get(args.id);
    if (!classData) return null;

    const members = await ctx.db
      .query("classMemberships")
      .withIndex("by_class", (q) => q.eq("classId", args.id))
      .collect();

    const memberDetails = await Promise.all(
      members.map(async (m) => {
        const user = await ctx.db.get(m.userId);
        return {
          ...m,
          user: user ? { name: user.name, email: user.email, image: user.image } : null,
        };
      })
    );

    const creator = await ctx.db.get(classData.creatorId);

    return {
      ...classData,
      members: memberDetails,
      creator: creator ? { name: creator.name } : null,
    };
  },
});

// ========== MUTATIONS ==========

export const create = mutation({
  args: {
    name: v.string(),
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

    const classId = await ctx.db.insert("classes", {
      name: args.name,
      description: args.description,
      creatorId: user._id,
    });

    // Add creator as a Teacher member
    await ctx.db.insert("classMemberships", {
      classId,
      userId: user._id,
      role: "Teacher",
    });

    return classId;
  },
});

export const join = mutation({
  args: { classId: v.id("classes") },
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

    // Check if already a member
    const existing = await ctx.db
      .query("classMemberships")
      .withIndex("by_class_user", (q) =>
        q.eq("classId", args.classId).eq("userId", user._id)
      )
      .first();

    if (existing) {
      throw new Error("Already a member");
    }

    return await ctx.db.insert("classMemberships", {
      classId: args.classId,
      userId: user._id,
      role: "Student",
    });
  },
});

export const remove = mutation({
  args: { id: v.id("classes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const classData = await ctx.db.get(args.id);
    if (!classData) {
      throw new Error("Class not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user || classData.creatorId !== user._id) {
      throw new Error("Not authorized");
    }

    // Delete memberships
    const memberships = await ctx.db
      .query("classMemberships")
      .withIndex("by_class", (q) => q.eq("classId", args.id))
      .collect();

    for (const m of memberships) {
      await ctx.db.delete(m._id);
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
