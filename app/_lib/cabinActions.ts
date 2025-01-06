"use server";

import prisma from "./db";
import { revalidatePath } from "next/cache";
import {
  CreateCabinSchema,
  CreateCabinsSchema,
  UpdateCabinSchema,
} from "../_schemas/cabinSchemas";
import supabase, { bucketUrl } from "./supabase";
import { createId } from "@paralleldrive/cuid2";
import { isAuthenticated } from "../_utils/serverHelpers";
import { z } from "zod";
import { CabinsSchemaDatabase } from "../_schemas/databaseSchemas";

export async function createCabins(data: z.infer<typeof CreateCabinsSchema>[]) {
  const result = z.array(CreateCabinsSchema).safeParse(data);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const parsedData = result.data;

    await prisma.cabins.createMany({
      data: parsedData,
    });
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
  }
}

export async function duplicateCabin(
  cabinId: z.infer<typeof CabinsSchemaDatabase.shape.id>,
) {
  const result = CabinsSchemaDatabase.shape.id.safeParse(cabinId);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    const fetchedData = await prisma.cabins.findUnique({
      where: {
        id: parsedId,
      },
    });

    if (!fetchedData) throw new Error("Can't find cabin");

    const { id: _, ...data } = fetchedData;

    await prisma.cabins.create({
      data: {
        ...data,
        name: `Copy of ${data.name}`,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/cabins");
  }
}

export async function createCabin(formData: FormData) {
  const formDataObj = {
    name: formData.get("name"),
    maxCapacity: Number(formData.get("maxCapacity")),
    regularPrice: Number(formData.get("regularPrice")),
    discount: Number(formData.get("discount")),
    description: formData.get("description"),
    image: formData.get("image"),
  };

  const result = CreateCabinSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      error: "Validation failed",
    };

  const { image, name, ...data } = result.data;

  try {
    await isAuthenticated();

    const { data: bucketData, error } = await supabase.storage
      .from("images-bucket")
      .upload(`${name}${createId()}`, image);

    if (error) throw new Error(error.message);

    await prisma.cabins.create({
      data: {
        ...data,
        name: name,
        image: `${bucketUrl}${bucketData.path}`,
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function getAllCabins() {
  try {
    const allCabins = await prisma.cabins.findMany();

    return allCabins;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateCabin(formData: FormData) {
  const formDataObj = {
    name: formData.get("name"),
    maxCapacity: Number(formData.get("maxCapacity")),
    regularPrice: Number(formData.get("regularPrice")),
    discount: Number(formData.get("discount")),
    description: formData.get("description"),
    image: formData.get("image"),
    cabinId: Number(formData.get("cabinId")),
  };

  const result = UpdateCabinSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { image, cabinId, name, ...data } = result.data;
  // const fileBuffer =
  //   image?.size !== 0 && image
  //     ? Buffer.from(await image.arrayBuffer())
  //     : undefined;

  try {
    await isAuthenticated();

    let imageUrl = null;

    if (image && image.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${name}${createId()}`, image);

      if (error) throw new Error(error.message);

      imageUrl = bucketData.path;
    }

    await prisma.cabins.update({
      where: { id: cabinId },
      data: {
        ...data,
        name,
        ...(imageUrl && { image: `${bucketUrl}${imageUrl}` }),
      },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteCabin(
  id: z.infer<typeof CabinsSchemaDatabase.shape.id>,
) {
  const result = CabinsSchemaDatabase.shape.id.safeParse(id);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.cabins.delete({
      where: { id: parsedId },
    });

    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteCabins() {
  try {
    await isAuthenticated();

    await prisma.cabins.deleteMany();
    revalidatePath("/cabins");
  } catch (error) {
    console.error(error);
  }
}
