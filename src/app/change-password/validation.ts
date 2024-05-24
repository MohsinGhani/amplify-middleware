import * as Yup from "yup";

const changePasswordValidation = Yup.object({
  oldPassword: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), "Passwords must match"],
      "Passwords must match"
    )
    .required("Required"),
});
export default changePasswordValidation;
