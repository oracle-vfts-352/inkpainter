import prisma from "../../prisma/client.js";

export async function findOrCreateUser(profile) {
  const provider = profile.provider;
  const providerId = profile.id;

  const username =
    profile.displayName ||
    profile.username ||
    "User";

  const email =
    profile.emails?.[0]?.value ||
    null;

  const avatar =
    profile.photos?.[0]?.value ||
    profile._json?.avatar_url ||
    null;

  const where =
    provider === "github"
      ? { github_id: providerId }
      : { google_id: providerId };

  const existing = await prisma.user.findFirst({
    where,
  });

  if (existing) {
    return existing;
  }

  const data =
    provider === "github"
      ? {
          github_id: providerId,
          username,
          email,
          avatar,
        }
      : {
          google_id: providerId,
          username,
          email,
          avatar,
        };

  return await prisma.user.create({
    data,
  });
}