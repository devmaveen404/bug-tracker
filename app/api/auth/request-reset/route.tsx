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
        });

        const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        return NextResponse.json({ message: 'Reset email sent' });
    } catch (error) {
        return NextResponse.json({ message: 'Unable to reset' }, { status: 400 });
    }
}
