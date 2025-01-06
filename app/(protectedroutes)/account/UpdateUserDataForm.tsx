"use client";

import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Form from "../../_components/Form";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";

import { updateUser } from "../../_lib/authActions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Spinner from "../../_components/Spinner";
import { useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { UpdatedUserSchemaClient } from "@/app/_schemas/authSchemas";

function UpdateUserDataForm() {
  const session = useSession();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof UpdatedUserSchemaClient>>({
    resolver: zodResolver(UpdatedUserSchemaClient),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const [image, setImage] = useState<File>(new File([], ""));
  const ref = useRef<HTMLFormElement | null>(null);

  async function onSubmit(values: z.infer<typeof UpdatedUserSchemaClient>) {
    startTransition(async () => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (value instanceof FileList) formData.append(key, image);
        formData.append(key, value.toString());
      }

      const res = await updateUser(formData);

      if (res?.error) toast.error(res.error);

      toast.success("Account successfully updated!");
      session.update();

      // If you do reset with react hook form avatar/image becomes undefined
      ref?.current?.reset();
    });
  }

  if (!session.data) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} useRef={ref}>
      <FormRow label="Email address">
        <Input defaultValue={session.data?.user.email} disabled />
      </FormRow>

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          register={register}
          defaultValue={session.data?.user.name}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Avatar image" error={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          register={register}
          disabled={isPending}
          onChange={(e) => setImage(e?.target?.files?.[0] || new File([], ""))}
        />
      </FormRow>

      <Input
        hidden
        id="userId"
        defaultValue={session.data.user.id}
        register={register}
      />

      <FormRow>
        <Button
          ariaLabel="Reset"
          type="reset"
          variation="secondary"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button ariaLabel="Update account" disabled={isPending}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
