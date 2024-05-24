import { updatePassword } from "aws-amplify/auth";

export const handleUpdatePassword = (
  oldPassword: string,
  newPassword: string
) => {
  return updatePassword({ oldPassword, newPassword });
};
