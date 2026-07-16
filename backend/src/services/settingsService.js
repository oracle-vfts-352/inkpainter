import prisma from "../../prisma/client.js";

export async function getUserSettings(userId) {
  const existingSettings = await prisma.userSetting.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (existingSettings) {
    return existingSettings;
  }

  return await prisma.userSetting.create({
    data: {
      user_id: userId,
    },
  });
}

export async function updateWatermark(userId, watermark) {
  return await prisma.userSetting.update({
    where: {
      user_id: userId,
    },
    data: {
      watermark,
      updated_at: new Date(),
    },
  });
}