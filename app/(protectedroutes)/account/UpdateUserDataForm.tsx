"use client";

import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Form from "../../_components/Form";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";

import { useFormState } from "react-dom";
import { updateUser } from "../../_lib/authActions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Spinner from "../../_components/Spinner";
import { useRef } from "react";

function UpdateUserDataForm() {
  const session = useSession();

  const ref = useRef<HTMLFormElement>(null);

  const [errors, action] = useFormState(
    async (_: void | null | object, formData: FormData) => {
      const res = await updateUser(formData);

      if (res?.zodErrors) return { zodErrors: res.zodErrors };

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account successfully updated!");
      session.update();
      ref.current?.reset();
    },
    null,
  );

  if (!session.data) return <Spinner />;

  return (
    <Form action={action} useRef={ref}>
      <FormRow label="Email address">
        <Input defaultValue={session.data?.user.email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors?.zodErrors.fullName?.at(0)}>
        <Input
          type="text"
          defaultValue={session.data?.user.name}
          id="fullName"
        />
      </FormRow>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.zodErrors?.password?.at(0)}
      >
        <Input type="password" id="password" autoComplete="current-password" />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.zodErrors.passwordConfirm?.at(0)}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors?.zodErrors.avatar?.at(0)}>
        <FileInput id="avatar" accept="image/*" />
      </FormRow>
      <Input hidden id="userId" defaultValue={session.data.user.id} />
      <FormRow>
        <Button ariaLabel="Reset" type="reset" variation="secondary">
          Cancel
        </Button>
        <Button ariaLabel="Update account">Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
