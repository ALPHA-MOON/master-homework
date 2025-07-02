import { z } from "zod";

const usernameSchema = z
  .string()
  .nonempty("사용자 이름을 입력해주세요.")
  .max(10, "사용자 이름은 10자 이하여야 합니다.");

const emailSchema = z.string().email("올바른 이메일을 입력해주세요.");

const passwordSchema = z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  });

const confirmPasswordSchema = z
  .string()
  .nonempty("비밀번호 확인을 입력해주세요.");

const phoneNumberSchema = z
  .string()
  .nonempty("전화번호를 입력해주세요.")
  .regex(/^010\d{8}$/, "올바른 전화번호 형식이 아닙니다.");

export const BaseUserDTO = z.object({
  username: usernameSchema,
  email: emailSchema,
});

export const UpdateUserDTO = BaseUserDTO.extend({
  password: passwordSchema,
});

export const CreateUserDTO = BaseUserDTO.extend({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  phoneNumber: phoneNumberSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
});
