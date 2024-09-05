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

export const signUpFormSchema = z.object({
    name: z.string().min(1, 'Username is required').max(50).optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email').optional(),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters').max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must include uppercase, lowercase, and a number"),
    confirmPassword: z.string().min(1, 'Password confirmation is required').max(20).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
});

export const signInFormSchema = z.object({
    name: z.string().min(1, 'Username is required').max(50).optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email').optional(),
    password: z.string().min(1, 'Password is required').max(20).optional(),
})