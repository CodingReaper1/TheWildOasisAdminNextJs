import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../_utils/constants";

export const PasswordConfirmSchema = z.string({
  message: "Only text is allowed",
});

export const FileImageSchema = z
  .instanceof(File)
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB`)
  .refine(
    (file) =>
      file?.size !== 0 ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true,
    "Only .jpg, .jpeg, .png and .webp formats are supported",
  );

export const FileImageSchemaClient = z
  .unknown()
  .refine((fileList) => fileList instanceof FileList, {
    message: `Only image is allowed`,
  })
  .refine(
    (fileList) => fileList?.length === 0 || fileList[0].size <= MAX_FILE_SIZE,
    {
      message: `Max image size is 2MB`,
    },
  )
  .refine(
    (fileList) =>
      fileList?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
    {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    },
  );
