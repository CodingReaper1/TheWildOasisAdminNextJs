"use server";

import { SignupSchema, UpdatedUserSchema } from "../_schemas/authSchemas";
import prisma from "./db";
import { hash } from "bcryptjs";
import supabase, { bucketUrl } from "./supabase";
import { z } from "zod";
import { isAuthenticated } from "../_utils/serverHelpers";
import { UserSchemaDatabase } from "../_schemas/databaseSchemas";
import { createId } from "@paralleldrive/cuid2";

export async function createGuests(data: z.infer<typeof UserSchemaDatabase>[]) {
  try {
    await isAuthenticated();

    const result = z.array(UserSchemaDatabase).safeParse(data);

    if (!result.success) throw new Error("Validation failed");

    const parsedData = result.data;

    const allGuestUsers = await prisma.user.createMany({
      data: parsedData,
      skipDuplicates: true,
    });

    return allGuestUsers;
  } catch (error) {
    console.error("Error creating guests:", error);
  }
}

export async function signup(values: z.infer<typeof SignupSchema>) {
  const result = SignupSchema.safeParse(values);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { email, password, fullName } = result.data;

  try {
    await isAuthenticated();

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Email already in use" };

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function getUserByEmail(
  email: z.infer<typeof UserSchemaDatabase.shape.email>,
) {
  try {
    const result = UserSchemaDatabase.shape.email.safeParse(email);

    if (!result.success) throw new Error("Validation failed");

    const parsedEmail = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email: parsedEmail,
      },
      select: {
        email: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function getAllGuests() {
  try {
    const allGuestUsers = await prisma.user.findMany({
      where: { role: "GUEST" },
      orderBy: { id: "asc" },
    });

    return allGuestUsers;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(
  id: z.infer<typeof UserSchemaDatabase.shape.id>,
) {
  try {
    const result = UserSchemaDatabase.shape.id.safeParse(id);

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    const user = await prisma.user.findUnique({
      where: {
        id: parsedId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function updateUser(formData: FormData) {
  const formDataObj = {
    fullName: formData.get("fullName") || "",
    password: formData.get("password") || "",
    passwordConfirm: formData.get("passwordConfirm") || "",
    avatar: formData.get("avatar"),
    userId: formData.get("userId"),
  };

  const result = UpdatedUserSchema.safeParse(formDataObj);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { password, fullName, userId, avatar } = result.data;

  try {
    const jwt = await isAuthenticated();
    if (jwt.sub !== userId) throw new Error("No permission!");

    // const fileBuffer =
    //   avatar?.size !== 0 && avatar
    //     ? Buffer.from(await avatar.arrayBuffer())
    //     : null;

    let imageUrl = null;

    if (avatar.size > 0) {
      const { data: bucketData, error } = await supabase.storage
        .from("images-bucket")
        .upload(`${fullName}${createId()}`, avatar);

      if (error && error.message !== "The resource already exists")
        throw new Error(error.message);

      imageUrl = bucketData?.path;
    }

    const user = await getUserById(userId);

    if (!user) throw new Error("Account not registered");

    const hashedPassword =
      password === "" ? user?.password : await hash(password, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: fullName,
        password: hashedPassword,
        ...(imageUrl && { image: `${bucketUrl}${imageUrl}` }),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
