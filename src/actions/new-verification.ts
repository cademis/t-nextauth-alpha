"use server";

import { getUserByEmail } from "~/data/user";
import { getVerificationTokenByToken } from "~/data/verification-token";
import { db } from "~/server/db";

export const newVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) return { error: "Invalid token" };

  const hasExpired = new Date() > new Date(exisitingToken.expires);

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(exisitingToken.email);

  if (!existingUser) return { error: "Email does not exist" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: exisitingToken.email },
  });

  await db.verficationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Email verified" };
};
