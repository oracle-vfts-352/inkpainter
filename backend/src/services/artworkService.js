import prisma from "../../prisma/client.js";
import { MAX_ARTWORKS } from "../config/constants.js";

export async function createArtwork({
  ownerId = null,
  guestUuid = null,
  r2Key,
  watermark = true,
}) {
  return await prisma.artwork.create({
    data: {
      owner_id: ownerId,
      guest_uuid: guestUuid,
      r2_key: r2Key,
      watermark,
    },
  });
}

export async function countGuestArtworks(guestUuid) {
  return await prisma.artwork.count({
    where: {
      guest_uuid: guestUuid,
    },
  });
}

export async function countUserArtworks(ownerId) {
  return await prisma.artwork.count({
    where: {
      owner_id: ownerId,
    },
  });
}

export async function canAddArtwork({
  ownerId = null,
  guestUuid = null,
}) {
  const count = ownerId
    ? await countUserArtworks(ownerId)
    : await countGuestArtworks(guestUuid);

  return {
    allowed: count < MAX_ARTWORKS,
    count,
    limit: MAX_ARTWORKS,
  };
}

export async function getArtworkById(id) {
  return await prisma.artwork.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteArtwork(id) {
  await prisma.artwork.delete({
    where: {
      id,
    },
  });
}