import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //users table
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(), //clerk user ID for auth
        email: v.string(),
        imageUrl: v.optional(v.string()),


        //Onboarding
        hasCompletedOnboarding: v.boolean(),

        location: v.optional(
            v.object({
                city: v.string(),
                state: v.optional(v.string()),
                country: v.string(),
            })
        ),
        interests: v.optional(v.array(v.string())),  //Min 3 categories

        //Organizer tracking (user subscription)
        freeEventsCreated: v.number(), // Track free event limit (1 free)


        //Timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_token", ["tokenIdentifier"]),

    events: defineTable({
        title: v.string(),
        description: v.string(),
        slug: v.string(), //Unique URL identifier

        //organizer reference
        organizerId: v.id("users"),
        organizerName: v.string(), //Denormalized for easy access

        //Event details 
        category: v.string(),
        tags: v.array(v.string()),
        timezone: v.string(),

        //location details
        locationType: v.union(v.literal("physical"), v.literal("person")),
        venue: v.optional(v.string()),
        address: v.optional(v.string()),
        city: v.string(),
        state: v.optional(v.string()),

        //Capacity and ticketing
        capacity: v.number(),
        ticketTypes: v.union(v.literal("free"), v.literal("paid")),
        ticketPrice: v.optional(v.number()), //Only for paid events
        registrationCount: v.number(),

        //customization
        coverImage: v.optional(v.string()),
        themeColor: v.optional(v.string()),


        //Timestamps
        createdAt: v.number(),  
        updatedAt: v.number(),
    }),
});