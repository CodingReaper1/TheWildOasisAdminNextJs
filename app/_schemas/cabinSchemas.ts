import { z } from "zod";
import { CabinsSchemaDatabase } from "./databaseSchemas";
import { FileImageSchema } from "./index";

export const CreateCabinSchema = z
  .object({
    name: CabinsSchemaDatabase.shape.name,

    maxCapacity: CabinsSchemaDatabase.shape.maxCapacity,

    regularPrice: CabinsSchemaDatabase.shape.regularPrice,

    discount: CabinsSchemaDatabase.shape.discount,

    description: CabinsSchemaDatabase.shape.description,

    image: FileImageSchema.refine((file) => file.size > 0, "Image is required"),
  })
  .superRefine(({ discount, regularPrice }, ctx) => {
    if (discount >= regularPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Discount should be less than regular price",
        path: ["discount"],
      });
    }
  });

export const CreateCabinsSchema = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: CabinsSchemaDatabase.shape.image,
  })
  .superRefine(({ discount, regularPrice }, ctx) => {
    if (discount >= regularPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Discount should be less than regular price",
        path: ["discount"],
      });
    }
  });

export const UpdateCabinSchema = CreateCabinSchema._def.schema
  .omit({
    image: true,
  })
  .extend({
    image: FileImageSchema.optional(),
    cabinId: CabinsSchemaDatabase.shape.id,
  });
