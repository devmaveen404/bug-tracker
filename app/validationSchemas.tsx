import { z } from "zod";

// Data validation schema for form and api response
export const IssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(65535)
});

// a Schema for updating issues assigned to user
export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255).optional(),
    description: z.string().min(1, 'Description is required').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'AssignToUserId is required.').max(255).optional().nullable()
});
