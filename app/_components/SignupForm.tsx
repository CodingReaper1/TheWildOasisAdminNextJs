"use client";

import Button from "../_components/Button";
import Form from "../_components/Form";
import FormRow from "../_components/FormRow";
import Input from "../_components/Input";
import toast from "react-hot-toast";
import { signup } from "../_lib/authActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "../_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    startTransition(async () => {
      const res = await signup(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account created succesfully");
      reset();
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          register={register}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
