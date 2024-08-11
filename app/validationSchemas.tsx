import { z } from "zod";

// Data validation schema for form and api response
export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required')
})

