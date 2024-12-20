"use server";

import { Prisma } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { getToday } from "../_utils/helpers";
import { PAGE_SIZE } from "../_utils/constants";

export async function deleteReservations() {
  try {
    await prisma.reservations.deleteMany();
    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReservation(id: number) {
  try {
    await prisma.reservations.delete({
      where: {
        id,
      },
    });

    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
  }
}

export async function createDummyReservations(
  data: Prisma.ReservationsCreateManyInput[],
) {
  try {
    await prisma.reservations.createMany({
      data: data,
    });
    revalidatePath("/reservations");
  } catch (error) {
    console.error(error);
  }
}

export async function getReservationsAfterDate(date: string) {
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        createdAt: {
          gte: new Date(date), // Records created after or on date
          lte: new Date(getToday({ end: true })), // Records up to the end of today
        },
      },
      select: {
        createdAt: true,
        totalPrice: true,
        extrasPrice: true,
      },
    });

    return reservations;
  } catch (error) {
    console.error(error);
  }
}

export async function getStaysAfterDate(date: string) {
  try {
    const stays = await prisma.reservations.findMany({
      where: {
        startDate: {
          gte: new Date(date), // Records with startDate >= provided date
          lte: new Date(getToday()), // Records with startDate <= today
        },
        user: {
          role: "GUEST",
        },
      },
      include: {
        user: true,
      },
    });

    return stays;
  } catch (error) {
    console.error(error);
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
  }
}

export async function updateCheckout(id: number) {
  try {
    await prisma.reservations.update({
      where: {
        id,
      },
      data: {
        status: "checked-out",
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking out" };
  }
}

type UpdateCheckinTypes = {
  id: number;
  hasBreakfast?: true;
  extrasPrice?: number;
  totalPrice?: number;
};

export async function updateCheckin({
  id,
  hasBreakfast,
  extrasPrice,
  totalPrice,
}: UpdateCheckinTypes) {
  try {
    await prisma.reservations.update({
      where: {
        id,
      },
      data: { hasBreakfast, extrasPrice, totalPrice, status: "checked-in" },
    });
  } catch (error) {
    console.error(error);
    return { error: "There was an error while checking in" };
  }
}

type GetReservationsTypes = {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
};

export async function getReservations({
  filter,
  sortBy,
  page,
}: GetReservationsTypes) {
  try {
    const where: Record<string, string> = {};

    // FILTER
    if (filter) where[filter.field] = filter.value;

    // PAGINATION
    const skip = page ? (page - 1) * PAGE_SIZE : 0;
    const take = PAGE_SIZE;

    // SORTING
    const orderBy = sortBy ? { [sortBy.field]: sortBy.direction } : undefined;

    // COUNT TOTAL RECORDS
    const totalRecords = await prisma.reservations.count({ where });

    // QUERY
    const reservations = await prisma.reservations.findMany({
      where,
      orderBy,
      skip,
      take,
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

    return { reservations, count: totalRecords };
  } catch (error) {
    console.error(error);
    return { reservations: [], count: 0 };
  }
}

export async function getReservation(id: number) {
  try {
    const reservation = await prisma.reservations.findUnique({
      where: { id },
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