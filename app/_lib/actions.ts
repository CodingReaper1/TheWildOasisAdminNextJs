"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { LoginSchema } from "../_schemas/authSchemas";
import { deleteReservations } from "./reservationActions";
import { createCabins, deleteCabins } from "./cabinActions";
import { createReservations } from "../_utils/serverHelpers";
import prisma from "./db";
import { cabins } from "../_data/data-cabins";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const formDataObj = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(formDataObj);

  if (!result.success) return { error: "Invalid credentials" };
  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    console.error(error);
    return { error: "Something went REALLY wrong!" };
  }
}

export async function uploadAll() {
  try {
    await deleteReservations();
    await deleteCabins();

    await createCabins(cabins);
    const data = await createReservations();

    await prisma.reservations.createMany({
      data: data,
    });
    revalidatePath("/dashboard");
    revalidatePath("/reservations", "layout");
    revalidatePath("/cabins", "layout");
  } catch (error) {
    console.log(error);
  }
}
