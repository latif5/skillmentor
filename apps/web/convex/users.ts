import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Store user in the database.
 * This should be called after authentication to ensure the user exists in our DB.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this user or email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (user !== null) {
      // If we've seen this user before but their name/image has changed, update it.
      if (user.name !== identity.name || user.image !== identity.pictureUrl) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          image: identity.pictureUrl,
        });
      }
      return user._id;
    }

    // If it's a new user, create it.
    const newUserId = await ctx.db.insert("users", {
        name: identity.name!,
        email: identity.email!,
        image: identity.pictureUrl!,
        username: identity.nickname || identity.email!.split("@")[0],
        onboardingCompleted: false,
        // The `role` field is optional in schema, defaulting to undefined (Student)
    });
    
    return newUserId;
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();
    return user;
  },
});
export const completeOnboarding = mutation({
  args: {
    username: v.string(),
    role: v.string(),
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

    // Check if username is taken by another user
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    if (existingUser && existingUser._id !== user._id) {
      throw new Error("Username already taken");
    }

    await ctx.db.patch(user._id, {
      username: args.username,
      role: args.role,
      onboardingCompleted: true,
    });

    return user._id;
  },
});
