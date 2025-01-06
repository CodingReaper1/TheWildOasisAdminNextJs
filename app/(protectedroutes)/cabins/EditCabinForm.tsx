"use client";

import Input from "../../_components/Input";
import Form from "../../_components/Form";
import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Textarea from "../../_components/Textarea";
import FormRow from "../../_components/FormRow";

import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import { updateCabin } from "@/app/_lib/cabinActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCabinSchemaClient } from "@/app/_schemas/cabinSchemas";
import { useState, useTransition } from "react";

type CreateCabinFormProps = {
  cabinToEdit: Prisma.CabinsGetPayload<object>;
  onCloseModal?: () => void;
  handleEdit: (cabin: Prisma.CabinsGetPayload<object>) => void;
};

function EditCabinForm({
  cabinToEdit,
  onCloseModal,
  handleEdit,
}: CreateCabinFormProps) {
  const {
    id: editId,
    image: editImage,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabinToEdit;

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof UpdateCabinSchemaClient>>({
    resolver: zodResolver(UpdateCabinSchemaClient),
    defaultValues: {
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      cabinId: editId,
    },
  });

  const [, startTransition] = useTransition();

  const [image, setImage] = useState<File>(new File([], ""));

  async function onSubmit(values: z.infer<typeof UpdateCabinSchemaClient>) {
    toast.success("Cabin successfully edited!");
    reset();
    onCloseModal?.();

    startTransition(async () => {
      handleEdit({
        ...values,
        id: editId,
        image: image.size === 0 ? editImage : "",
        createdAt: new Date(),
      });

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (value instanceof FileList) formData.append(key, image);
        formData.append(key, value.toString());
      }

      const res = await updateCabin(formData);

      if (res?.error) toast.error(res.error);
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" register={register} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" register={register} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" register={register} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" register={register} />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea id="description" register={register} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          register={register}
          onChange={(e) => setImage(e?.target?.files?.[0] || new File([], ""))}
        />
      </FormRow>

      <Input type="number" hidden id="cabinId" register={register} />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          ariaLabel="Cancel"
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button ariaLabel="Edit cabin">Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
