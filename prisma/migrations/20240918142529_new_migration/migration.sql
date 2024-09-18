-- CreateIndex
CREATE INDEX `Issue_assignedToUserId_idx` ON `Issue`(`assignedToUserId`);

-- CreateIndex
CREATE INDEX `PasswordResetToken_userId_idx` ON `PasswordResetToken`(`userId`);
