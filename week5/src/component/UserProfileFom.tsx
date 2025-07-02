import type { FC, PropsWithChildren } from "react";
import type { UpdateUserDTO } from "../DTO/user.dto";
import type { UseFormRegister } from "react-hook-form";
import { z } from "zod";

const UserProfileFormRoot: FC<
  PropsWithChildren<{ onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }>
> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const Title: FC<{ title: string }> = ({ title }) => {
  return <h2>{title}</h2>;
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
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        {...register(name as keyof z.infer<typeof UpdateUserDTO>)}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

const Button: FC<{
  type: "submit" | "button";
  onClick?: () => void;
  value: string;
}> = ({ type, onClick, value }) => {
  return (
    <button type={type} onClick={onClick}>
      {value}
    </button>
  );
};

const Message: FC<{ message: string }> = ({ message }) => {
  if (!message) return null;
  return <p>{message}</p>;
};

const UserProfileForm = Object.assign(UserProfileFormRoot, {
  Title,
  Input,
  Button,
  Message,
});

export default UserProfileForm;
