"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "@/components/ForgotPassword/ResetPasswordForm";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return <>{!username ? <ForgotPasswordForm /> : <ResetPasswordForm />}</>;
};

export default ForgotPassword;
