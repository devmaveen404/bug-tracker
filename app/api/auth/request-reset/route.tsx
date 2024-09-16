import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../../prisma/prismaClient';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const RequestResetSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: NextRequest) {
    try {
        const { email } = RequestResetSchema.parse(await request.json());

        // Generate a reset token
        const token = crypto.randomBytes(32).toString('hex');

        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // if user
        // Upsert the password reset token
        await prisma.passwordResetToken.upsert({
            where: { token: token },
            update: { token, createdAt: new Date() },
            create: { token, userId: user.id },
        });

        // Send the reset email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // tls: {
            //     rejectUnauthorized: false, // Disable SSL certificate validation
            // },
        });


        const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

        // send reset email
        await transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`, // Sender address
            to: email,
            subject: "Password Reset Request", // Subject line
            text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`, // Plain text body
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`, // HTML body
        });

        return NextResponse.json({ message: 'Reset email sent' });
    } catch (error) {
        // Narrowing down the type of error
        if (error instanceof z.ZodError) {
            // Handle Zod schema validation errors
            return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
        } else if (error instanceof Error) {
            // Handle generic errors
            console.error('Error occurred during password reset request:', error);
            return NextResponse.json({
                message: error.message || 'An error occurred while processing your request',
                details: error.stack || error,
            }, { status: 400 });
        } else {
            // Fallback for any other types of errors (unknown type)
            console.error('An unexpected error occurred:', error);
            return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
