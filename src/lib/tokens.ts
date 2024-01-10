import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "~/data/verification-token";
import { db } from "~/server/db";

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
