import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
    if (!array.length) return array;
    const lowercaseItems = array.map((str) => str.toLowerCase());
    const distinctItem = new Set(lowercaseItems);
    return Array.from(distinctItem);
}

const post = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string().optional(),
        description: z.string().min(50).max(160),
        draft: z.boolean().default(false),
        ogImage: z.string().optional(),
        publishDate: z.string().or(z.date()).transform((val) => new Date(val)),
        updateDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    }),
});

export const collections = { post };