"use server";

import prisma from "./db";
import { revalidatePath } from "next/cache";
import { getToday } from "../_utils/helpers";
import { isAuthenticated } from "../_utils/serverHelpers";
import { z } from "zod";
import { ReservationsSchemaDatabase } from "../_schemas/databaseSchemas";
import { UpdateCheckinSchema } from "../_schemas/reservationSchemas";

// export async function createDummyReservations() {
//   try {
//     await isAuthenticated();

//     await deleteReservations();

//     const data = await createReservations();

//     await prisma.reservations.createMany({
//       data: data,
//     });
//     revalidatePath("/dashboard");
//     revalidatePath("/reservations");
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function getAllReservationsWithCount() {
  try {
    const count = await prisma.reservations.count();

    const reservations = await prisma.reservations.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        cabin: {
          select: {
            name: true,
          },
        },
      },
    });

    return { reservations, count };
  } catch (error) {
    console.error(error);
    return { reservations: [], count: 0 };
  }
}

export async function getReservation(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    const reservation = await prisma.reservations.findUnique({
      where: { id: parsedId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            countryFlag: true,
            nationalID: true,
            nationality: true,
          },
        },
        cabin: {
          select: {
            name: true,
          },
        },
      },
    });

    return reservation;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllReservations() {
  try {
    const reservations = await prisma.reservations.findMany();

    return reservations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllStays() {
  try {
    const stays = await prisma.reservations.findMany({
      where: {
        user: {
          role: "GUEST",
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return stays;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStaysTodayActivity() {
  try {
    const activities = await prisma.reservations.findMany({
      where: {
        OR: [
          {
            status: "unconfirmed",
            startDate: getToday(),
          },
          {
            status: "checked-in",
            endDate: getToday(),
          },
        ],
        user: {
          role: "GUEST",
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
          select: {
            name: true,
            nationality: true,
            nationalID: true,
            countryFlag: true,
          },
        },
      },
    });

    return activities;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateCheckout(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.reservations.update({
      where: {
        id: parsedId,
      },
      data: {
        status: "checked-out",
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/reservations", "layout");
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking out" };
  }
}

export async function updateCheckin(data: z.infer<typeof UpdateCheckinSchema>) {
  const result = UpdateCheckinSchema.safeParse(data);

  try {
    await isAuthenticated();

    if (!result.success) throw new Error("Validation failed");

    const { id, extrasPrice, hasBreakfast, totalPrice } = result.data;

    await prisma.reservations.update({
      where: {
        id,
      },
      data: { hasBreakfast, extrasPrice, totalPrice, status: "checked-in" },
    });
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking in" };
  } finally {
    revalidatePath("/dashboard");
    revalidatePath("/reservations", "layout");
  }
}

export async function deleteReservations() {
  try {
    await isAuthenticated();

    await prisma.reservations.deleteMany();
    revalidatePath("/reservations", "layout");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReservation(
  id: z.infer<typeof ReservationsSchemaDatabase.shape.id>,
) {
  const result = ReservationsSchemaDatabase.shape.id.safeParse(id);

  try {
    await isAuthenticated();
    if (!result.success) throw new Error("Validation failed");

    const parsedId = result.data;

    await prisma.reservations.delete({
      where: {
        id: parsedId,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/reservations", "layout");
  }
}
