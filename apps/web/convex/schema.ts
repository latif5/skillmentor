import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.optional(v.string()), // Student, Teacher
    onboardingCompleted: v.boolean(),
    organizationId: v.optional(v.id("organizations")),
  }).index("by_email", ["email"])
    .index("by_org", ["organizationId"]),

  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    logoUrl: v.optional(v.string()),
    metadata: v.optional(v.any()), // JSON
  }).index("by_slug", ["slug"]),

  classes: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    organizationId: v.optional(v.id("organizations")),
    creatorId: v.id("users"),
    bannerUrl: v.optional(v.string()),
  }).index("by_org", ["organizationId"])
    .index("by_creator", ["creatorId"]),

  classMemberships: defineTable({
    classId: v.id("classes"),
    userId: v.id("users"),
    role: v.string(), // Student, Teacher
  }).index("by_class", ["classId"])
    .index("by_user", ["userId"])
    .index("by_class_user", ["classId", "userId"]),

  studySets: defineTable({
    title: v.string(),
    description: v.string(),
    creatorId: v.id("users"),
    visibility: v.string(), // Public, Private, Class
    metadata: v.optional(v.any()),
  }).index("by_creator", ["creatorId"]),

  terms: defineTable({
    studySetId: v.id("studySets"),
    word: v.string(),
    definition: v.string(),
    rank: v.number(),
    imageUrl: v.optional(v.string()),
  }).index("by_studySet", ["studySetId"]),

  folders: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    creatorId: v.id("users"),
  }).index("by_creator", ["creatorId"]),

  assignments: defineTable({
    classId: v.id("classes"),
    studySetId: v.optional(v.id("studySets")),
    title: v.string(),
    dueDate: v.optional(v.number()),
    published: v.boolean(),
  }).index("by_class", ["classId"]),

  submissions: defineTable({
    assignmentId: v.id("assignments"),
    userId: v.id("users"),
    score: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  }).index("by_assignment", ["assignmentId"])
    .index("by_user", ["userId"]),
});
