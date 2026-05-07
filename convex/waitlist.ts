import { mutation } from "./_generated/server";
import { v } from "convex/values";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const join = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    if (!emailPattern.test(email)) {
      throw new Error("Invalid email.");
    }

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      return { status: "exists" as const };
    }

    await ctx.db.insert("waitlist", {
      email,
      source: args.source,
      createdAt: Date.now(),
    });

    return { status: "joined" as const };
  },
});
