import { z } from "zod";
import {
  FileImageSchema,
  FileImageSchemaClient,
  PasswordConfirmSchema,
} from "./index";
import { UserSchemaDatabase } from "./databaseSchemas";

type SuperValidateTypes = {
  passwordConfirm: string;
  password: string;
};

const superValidate = (
  { passwordConfirm, password }: SuperValidateTypes,
  ctx: z.RefinementCtx,
) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["passwordConfirm"],
    });
  }
};

export const LoginSchema = z.object({
  email: UserSchemaDatabase.shape.email,

  password: z
    .string({
      message: "Only text is allowed",
    })
    .min(1, {
      message: "Password is required",
    }),
});

export const SignupSchema = z
  .object({
    fullName: UserSchemaDatabase.shape.name,

    email: UserSchemaDatabase.shape.email,

    password: z
      .string({
        message: "Only text is allowed",
      })
      .min(8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: PasswordConfirmSchema,
  })
  .superRefine(superValidate);

export const UpdatedUserSchema = z
  .object({
    fullName: UserSchemaDatabase.shape.name,

    password: z
      .string({
        message: "Only text is allowed",
      })
      .refine((password) => password === "" || password.length >= 8, {
        message: "Password needs a minimum of 8 characters",
      }),

    passwordConfirm: PasswordConfirmSchema,

    avatar: FileImageSchema,

    userId: UserSchemaDatabase.shape.id,
  })
  .superRefine(superValidate);

export const UpdatedUserSchemaClient = UpdatedUserSchema._def.schema
  .omit({
    avatar: true,
  })
  .extend({
    avatar: FileImageSchemaClient,
  })
  .superRefine(superValidate);
