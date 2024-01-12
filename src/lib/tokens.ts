import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "~/data/password-reset-token";
import { getVerificationTokenByEmail } from "~/data/verification-token";
import { db } from "~/server/db";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verficationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verficationToken = await db.verficationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};
