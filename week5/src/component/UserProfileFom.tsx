import type { FC, PropsWithChildren } from "react";
import type { UpdateUserDTO } from "../DTO/user.dto";
import type { UseFormRegister } from "react-hook-form";
import {
  Form,
  Label,
  InputField,
  TitleStyled,
  PrimaryButton,
  OutlineButton,
  MessageStyled,
  InputGroup,
} from "../styled/styled";
import { z } from "zod";

const UserProfileFormRoot: FC<
  PropsWithChildren<{ onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }>
> = ({ children, onSubmit }) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

const Title: FC<{ title: string }> = ({ title }) => {
  return <TitleStyled>{title}</TitleStyled>;
};

const Input: FC<{
  label: string;
  name: string;
  disabled: boolean;
  placeholder: string;
  type: string;
  register: UseFormRegister<z.infer<typeof UpdateUserDTO>>;
}> = ({ label, name, disabled, placeholder, type, register }) => {
  return (
    <InputGroup>
      <Label htmlFor={name}>{label}</Label>
      <InputField
        type={type}
        id={name}
        {...register(name as keyof z.infer<typeof UpdateUserDTO>)}
        disabled={disabled}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};

type ButtonProps = {
  type: "submit" | "button";
  onClick?: () => void;
  value: string;
};

const Button = {
  Primary: ({ type, onClick, value }: ButtonProps) => (
    <PrimaryButton type={type} onClick={onClick}>
      {value}
    </PrimaryButton>
  ),
  Outline: ({ type, onClick, value }: ButtonProps) => (
    <OutlineButton type={type} onClick={onClick}>
      {value}
    </OutlineButton>
  ),
};

const Message: FC<{ message: string }> = ({ message }) => {
  if (!message) return null;
  return <MessageStyled>{message}</MessageStyled>;
};

const UserProfileForm = Object.assign(UserProfileFormRoot, {
  Title,
  Input,
  Button,
  Message,
});

export default UserProfileForm;
