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
    
    const studySets = await ctx.db
      .query("studySets")
      .withIndex("by_creator", (q) => q.eq("creatorId", user._id))
      .order("desc")
      .take(50);

    return await Promise.all(
      studySets.map(async (set) => {
        const terms = await ctx.db
          .query("terms")
          .withIndex("by_studySet", (q) => q.eq("studySetId", set._id))
          .collect();
        return {
          ...set,
          termsCount: terms.length,
        };
      })
    );
  },
});

export const getById = query({
  args: { id: v.id("studySets") },
  handler: async (ctx, args) => {
    const studySet = await ctx.db.get(args.id);
    if (!studySet) return null;
    
    const terms = await ctx.db
      .query("terms")
      .withIndex("by_studySet", (q) => q.eq("studySetId", args.id))
      .order("asc")
      .collect();
    
    const creator = await ctx.db.get(studySet.creatorId);
    
    return {
      ...studySet,
      terms,
      creator: creator ? { name: creator.name, username: creator.username } : null,
    };
  },
});

export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("studySets")
      .order("desc")
      .take(10);
  },
});

// ========== MUTATIONS ==========

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    visibility: v.optional(v.string()),
    terms: v.array(
      v.object({
        word: v.string(),
        definition: v.string(),
      })
    ),
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

    // Create the study set
    const studySetId = await ctx.db.insert("studySets", {
      title: args.title,
      description: args.description,
      creatorId: user._id,
      visibility: args.visibility || "Public",
    });

    // Create terms
    for (let i = 0; i < args.terms.length; i++) {
      await ctx.db.insert("terms", {
        studySetId,
        word: args.terms[i].word,
        definition: args.terms[i].definition,
        rank: i,
      });
    }

    return studySetId;
  },
});

export const update = mutation({
  args: {
    id: v.id("studySets"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    visibility: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const studySet = await ctx.db.get(args.id);
    if (!studySet) {
      throw new Error("Study set not found");
    }

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user || studySet.creatorId !== user._id) {
      throw new Error("Not authorized");
    }

    const updates: Partial<typeof studySet> = {};
    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.visibility !== undefined) updates.visibility = args.visibility;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("studySets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const studySet = await ctx.db.get(args.id);
    if (!studySet) {
      throw new Error("Study set not found");
    }

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (!user || studySet.creatorId !== user._id) {
      throw new Error("Not authorized");
    }

    // Delete all terms first
    const terms = await ctx.db
      .query("terms")
      .withIndex("by_studySet", (q) => q.eq("studySetId", args.id))
      .collect();

    for (const term of terms) {
      await ctx.db.delete(term._id);
    }

    // Delete the study set
    await ctx.db.delete(args.id);
    return args.id;
  },
});
