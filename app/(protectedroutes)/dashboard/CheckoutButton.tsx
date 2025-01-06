"use client";

import { useState } from "react";
import Button from "../../_components/Button";
import { updateCheckout } from "@/app/_lib/reservationActions";
import toast from "react-hot-toast";

function CheckoutButton({ reservationId }: { reservationId: number }) {
  const [isCheckingout, setIsCheckingout] = useState(false);
  async function handleCheckout(id: number) {
    setIsCheckingout((bool) => !bool);

    const res = await updateCheckout(id);

    if (res?.error) return toast.error(res.error);

    toast.success(`Reservation #${id} successfully checked out`);

    setIsCheckingout((bool) => !bool);
  }

  return (
    <Button
      variation="primary"
      size="small"
      ariaLabel="Departing"
      onClick={() => handleCheckout(reservationId)}
      disabled={isCheckingout}
    >
      Departing
    </Button>
  );
}

export default CheckoutButton;
