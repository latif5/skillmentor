import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ========== QUERIES ==========

export const getByStudySet = query({
  args: { studySetId: v.id("studySets") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("terms")
      .withIndex("by_studySet", (q) => q.eq("studySetId", args.studySetId))
      .order("asc")
      .collect();
  },
});

// ========== MUTATIONS ==========

export const create = mutation({
  args: {
    studySetId: v.id("studySets"),
    word: v.string(),
    definition: v.string(),
    rank: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("terms", {
      studySetId: args.studySetId,
      word: args.word,
      definition: args.definition,
      rank: args.rank,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("terms"),
    word: v.optional(v.string()),
    definition: v.optional(v.string()),
    rank: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const updates: Record<string, unknown> = {};
    if (args.word !== undefined) updates.word = args.word;
    if (args.definition !== undefined) updates.definition = args.definition;
    if (args.rank !== undefined) updates.rank = args.rank;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("terms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const bulkCreate = mutation({
  args: {
    studySetId: v.id("studySets"),
    terms: v.array(
      v.object({
        word: v.string(),
        definition: v.string(),
        rank: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const ids = [];
    for (const term of args.terms) {
      const id = await ctx.db.insert("terms", {
        studySetId: args.studySetId,
        word: term.word,
        definition: term.definition,
        rank: term.rank,
      });
      ids.push(id);
    }
    return ids;
  },
});

export const bulkDelete = mutation({
  args: { studySetId: v.id("studySets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const terms = await ctx.db
      .query("terms")
      .withIndex("by_studySet", (q) => q.eq("studySetId", args.studySetId))
      .collect();

    for (const term of terms) {
      await ctx.db.delete(term._id);
    }
    return terms.length;
  },
});
