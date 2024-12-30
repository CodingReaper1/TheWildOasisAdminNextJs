import "server-only";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { subtractDates } from "./helpers";
import { getAllGuests } from "../_lib/authActions";
import { getAllCabins } from "../_lib/cabinActions";
import { isFuture, isPast, isToday } from "date-fns";

import { reservations as dummyReservations } from "../_data/data-reservations";
import { cabins as dummyCabins } from "../_data/data-cabins";

export async function isAuthenticated() {
  const all_cookies = cookies().getAll();
  const headers = new Headers();

  all_cookies.forEach((cookie) => {
    headers.set("cookie", `${cookie.name}=${cookie.value};`);
  });

  const req = {
    headers,
  };

  const secureCookie = process.env.NODE_ENV === "production";
  const cookieName = secureCookie
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const jwt = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie,
    salt: cookieName,
  });

  // If not authenticated throw error
  if (!!!jwt) throw new Error("Not authenticated");

  return jwt;
}

export async function createReservations() {
  try {
    const allCabins = await getAllCabins();

    const allCabinIds = allCabins?.map((cabin) => cabin.id);

    const allGuestUsers = await getAllGuests();

    const allUserIds = allGuestUsers?.map((user) => user.id);

    const finalReservations = dummyReservations
      .map((reservation, index) => {
        const cabin = dummyCabins.at(reservation.cabinId - 1);
        const numNights = subtractDates(
          reservation.endDate,
          reservation.startDate,
        );

        if (!cabin) return null;

        const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

        const extrasPrice = reservation.hasBreakfast
          ? numNights * 15 * reservation.numGuests
          : 0; // hardcoded breakfast price
        const totalPrice = cabinPrice + extrasPrice;

        const cabinId = allCabinIds?.at(index % allCabinIds.length);
        const userId = allUserIds?.at(index % allUserIds.length);

        if (!cabinId || !userId) throw new Error("Invalid cabinId or userId.");

        let status = "unconfirmed";
        if (
          isPast(new Date(reservation.endDate)) &&
          !isToday(new Date(reservation.endDate))
        )
          status = "checked-out";
        if (
          (isFuture(new Date(reservation.endDate)) ||
            isToday(new Date(reservation.endDate))) &&
          isPast(new Date(reservation.startDate)) &&
          !isToday(new Date(reservation.startDate))
        )
          status = "checked-in";

        return {
          ...reservation,
          numNights,
          cabinPrice,
          extrasPrice,
          totalPrice,
          cabinId,
          userId,
          status,
        };
      })
      .filter((reservation) => reservation !== null);

    return finalReservations;
  } catch (error) {
    return [];
    console.error(error);
  }
}
