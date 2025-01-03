"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { isAuthenticated } from "../_utils/serverHelpers";
import { UpdateSettingsSchema } from "../_schemas/settingsSchema";
import { z } from "zod";

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    return settings;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSettings(
  data: z.infer<typeof UpdateSettingsSchema>,
) {
  const result = UpdateSettingsSchema.safeParse(data);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const { field, value } = result.data;

    await prisma.settings.update({
      where: { id: 1 },
      data: {
        [field]: value,
      },
    });

    revalidatePath("/settings");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
