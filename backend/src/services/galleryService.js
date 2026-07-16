import prisma from "../../prisma/client.js";

export async function getGuestGallery(guestUuid) {
  const artworks = await prisma.artwork.findMany({
    where: {
      guest_uuid: guestUuid,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return artworks.map((artwork) => ({
    ...artwork,
    artist: "Guest",
  }));
}

export async function getUserGallery(ownerId) {
  const artworks = await prisma.artwork.findMany({
    where: {
      owner_id: ownerId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return artworks.map((artwork) => ({
    ...artwork,
    artist: artwork.user?.username ?? null,
  }));
}
