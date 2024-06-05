import { z, defineCollection } from "astro:content";

const post = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string().optional(),
        description: z.string().min(50).max(160),
        draft: z.boolean().default(false)
    }),
});

export const collections = { post };