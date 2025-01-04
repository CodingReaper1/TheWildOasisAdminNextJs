"use client";

import Input from "../../_components/Input";
import Form from "../../_components/Form";
import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Textarea from "../../_components/Textarea";
import FormRow from "../../_components/FormRow";

import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import { createCabin, updateCabin } from "@/app/_lib/cabinActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCabinSchemaClient } from "@/app/_schemas/cabinSchemas";
import { useState, useTransition } from "react";

type CreateCabinFormProps = {
  cabinToEdit?: Partial<Prisma.CabinsGetPayload<object>>;
  onCloseModal?: () => void;
  handleCreate: (cabin: Prisma.CabinsGetPayload<object>) => void;
  handleEdit: (cabin: Prisma.CabinsGetPayload<object>) => void;
};

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
  handleCreate,
  handleEdit,
}: CreateCabinFormProps) {
  const {
    id: editId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabinToEdit;
  const isEditSession = !!editId;

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof CreateCabinSchemaClient>>({
    resolver: zodResolver(CreateCabinSchemaClient),
    defaultValues: {
      name: isEditSession ? name : "",
      maxCapacity: isEditSession ? maxCapacity : 0,
      regularPrice: isEditSession ? regularPrice : 0,
      discount: isEditSession ? discount : 0,
      description: isEditSession ? description : "",
    },
  });

  const [, startTransition] = useTransition();

  const [image, setImage] = useState<File>(new File([], ""));

  async function onSubmit(values: z.infer<typeof CreateCabinSchemaClient>) {
    if (!isEditSession) toast.success("Cabin successfully created!");
    if (isEditSession) toast.success("Cabin successfully edited!");
    reset();
    onCloseModal?.();

    startTransition(async () => {
      if (!isEditSession) {
        handleCreate({
          ...values,
          id: Math.random(),
          image: "/loading.png",
          createdAt: new Date(),
        });
      } else {
        handleEdit({
          ...values,
          id: Math.random(),
          image: "/loading.png",
          createdAt: new Date(),
        });
      }

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (value instanceof FileList) formData.append(key, image);
        formData.append(key, value.toString());
      }

      let res;
      if (!isEditSession) res = await createCabin(formData);
      if (isEditSession) res = await updateCabin(formData);

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

      <Input hidden id="cabinId" defaultValue={editId} />

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
        <Button ariaLabel="Create cabin">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
