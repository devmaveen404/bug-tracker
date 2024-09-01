import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../../prisma/prismaClient'
import bcrypt from 'bcrypt';

const ResetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(8),
});

export async function POST(request: NextRequest) {
    try {
        const { token, newPassword } = ResetPasswordSchema.parse(await request.json());

        // Find the reset token
        const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
        if (!resetToken) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        }

        // Check if the token has expired (assuming 1 hour expiry)
        const tokenExpiryTime = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
        const tokenCreationTime = new Date(resetToken.createdAt).getTime(); // convert reset token to a timestamp
        const currentTime = new Date().getTime(); // get the current time

        // check for token expiry by comparing the current time with the token creation time plus the token expiry duration
        if (currentTime > tokenCreationTime + tokenExpiryTime) {
            return NextResponse.json({ message: 'Token expired' }, { status: 400 });
        }

        // new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { hashedPassword: hashedPassword },
        });

        await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Unable to update password' }, { status: 400 });
    }
}
