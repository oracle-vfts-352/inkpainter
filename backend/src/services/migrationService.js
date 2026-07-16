import prisma from "../../prisma/client.js";

export async function migrateGuestGallery(guestUuid, userId) {
  // Prevent running the migration twice
  const existing = await prisma.guestMigration.findFirst({
    where: {
      guest_uuid: guestUuid,
    },
  });

  if (existing) {
    return;
  }

  await prisma.$transaction(async (tx) => {
    // Move all guest artworks to the logged-in user
    await tx.artwork.updateMany({
      where: {
        guest_uuid: guestUuid,
      },
      data: {
        owner_id: userId,
        guest_uuid: null,
      },
    });

    // Record that this guest has already been migrated
    await tx.guestMigration.create({
      data: {
        guest_uuid: guestUuid,
        user_id: userId,
      },
    });
  });
}