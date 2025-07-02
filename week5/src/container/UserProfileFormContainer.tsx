import { useState } from "react";
import UserProfileForm from "../component/UserProfileFom";
import { UpdateUserDTO } from "../DTO/user.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserProfileFormContainer = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState<UpdateUserDTO>({
    username: "홍길동",
    email: "hong@example.com",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserDTO>>({
    resolver: zodResolver(UpdateUserDTO),
    defaultValues: userInfo,
  });

  const onSubmit = (data: z.infer<typeof UpdateUserDTO>) => {
    console.log(data);
    setUserInfo(data);
    setIsEditing(false);
    reset(data);
  };

  const handleEdit = () => {
    reset(userInfo);
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(userInfo);
    setIsEditing(false);
  };

  return (
    <>
      <UserProfileForm onSubmit={handleSubmit(onSubmit)}>
        <UserProfileForm.Title title="사용자 프로필" />
        <UserProfileForm.Input
          label="사용자 이름"
          type="text"
          name="username"
          register={register}
          disabled={!isEditing}
          placeholder="사용자 이름을 입력하세요"
        />
        <UserProfileForm.Input
          label="이메일"
          type="email"
          name="email"
          register={register}
          disabled={!isEditing}
          placeholder="이메일을 입력하세요"
        />
        <UserProfileForm.Input
          label="새 비밀번호"
          type="password"
          name="password"
          register={register}
          disabled={!isEditing}
          placeholder={isEditing ? "새 비밀번호를 입력하세요 (선택사항)" : ""}
        />
        <UserProfileForm.Message
          message={
            errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            ""
          }
        />
        {!isEditing ? (
          <UserProfileForm.Button
            type="button"
            onClick={handleEdit}
            value="수정하기"
          />
        ) : (
          <>
            <UserProfileForm.Button type="submit" value="저장하기" />
            <UserProfileForm.Button
              type="button"
              onClick={handleCancel}
              value="취소"
            />
          </>
        )}
      </UserProfileForm>
    </>
  );
};

export default UserProfileFormContainer;
