"use client";

import Empty from "@/app/_components/Empty";
import Form from "../../_components/Form";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";
import { Prisma } from "@prisma/client";
import { updateSettings } from "@/app/_lib/settingsActions";
import toast from "react-hot-toast";
import { useTransition } from "react";

type UpdateSettingsFormProps = {
  settings?: Prisma.SettingsGetPayload<object> | null;
};

function UpdateSettingsForm({ settings }: UpdateSettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  if (!settings?.id) return <Empty resourceName="settings" />;

  const {
    minimumReservationLength,
    maxReservationLength,
    maxGuestsPerReservation,
    breakFastPrice,
  } = settings;

  async function handleBlur(
    e: React.FocusEvent<HTMLInputElement>,
    field: string,
  ) {
    startTransition(async () => {
      const { value } = e.target;

      if (!value) return;

      const res = await updateSettings({ value: +value, field });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Setting successfully updated!");
    });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/reservation">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumReservationLength}
          disabled={isPending}
          onBlur={(e) => handleBlur(e, "minimumReservationLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/reservation">
        <Input
          type="number"
          id="max-nights"
          disabled={isPending}
          defaultValue={maxReservationLength}
          onBlur={(e) => handleBlur(e, "maxReservationLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/reservation">
        <Input
          type="number"
          id="max-guests"
          disabled={isPending}
          defaultValue={maxGuestsPerReservation}
          onBlur={(e) => handleBlur(e, "maxGuestsPerReservation")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isPending}
          defaultValue={breakFastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
