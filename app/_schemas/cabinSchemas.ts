import { z } from "zod";
import { CabinsSchemaDatabase } from "./databaseSchemas";
import { FileImageSchema, FileImageSchemaClient } from "./index";

type SuperValidateTypes = {
  discount: number;
  regularPrice: number;
};

const superValidate = (
  { discount, regularPrice }: SuperValidateTypes,
  ctx: z.RefinementCtx,
) => {
  if (discount >= regularPrice) {
    ctx.addIssue({
      code: "custom",
      message: "Discount should be less than regular price",
      path: ["discount"],
    });
  }
};

export const CreateCabinSchema = z
  .object({
    name: CabinsSchemaDatabase.shape.name,

    maxCapacity: CabinsSchemaDatabase.shape.maxCapacity,

    regularPrice: CabinsSchemaDatabase.shape.regularPrice,

    discount: CabinsSchemaDatabase.shape.discount,

    description: CabinsSchemaDatabase.shape.description,

    image: FileImageSchema.refine((file) => file.size > 0, "Image is required"),
  })
  .superRefine(superValidate);

export const CreateCabinsSchema = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: CabinsSchemaDatabase.shape.image,
  })
  .superRefine(superValidate);

export const UpdateCabinSchema = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: FileImageSchema.optional(),
    cabinId: CabinsSchemaDatabase.shape.id,
  })
  .superRefine(superValidate);

// Seperating client and server side schema is nessesary since with normal handler type of file is fileList
export const CreateCabinSchemaClient = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: FileImageSchemaClient.refine(
      (fileList) => fileList?.length === 1 && fileList[0].size > 0,
      "Image is required",
    ),
  })
  .superRefine(superValidate);

export const UpdateCabinSchemaClient = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: FileImageSchemaClient.optional(),
    cabinId: CabinsSchemaDatabase.shape.id,
  })
  .superRefine(superValidate);
