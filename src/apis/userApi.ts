import { API_URL } from "@/shared/constants/constants";
import { DeactivateUser, UpdateUser } from "@/shared/interfaces/interfaces";
import Cookies from "js-cookie";

const getAccessToken = () => {
  const allCookies = Cookies.get();
  let jwtToken = "";
  if (allCookies) {
    const getAcceessToken = Object.keys(allCookies || []).filter((k) =>
      k.includes("accessToken")
    );
    jwtToken = allCookies[getAcceessToken[0]];
  }

  return jwtToken;
};

export const deactivateUserApi = async (details: DeactivateUser) => {
  const token = getAccessToken();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(details), // Send username in the request body
  };

  try {
    if (!token) throw new Error("401 unauthorized");
    const res = await fetch(`${API_URL}/user/deactivate-user`, requestOptions);
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message);
    }
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export const updateUserDetailsApi = async (details: UpdateUser) => {
  const token = getAccessToken();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(details), // Send username in the request body
  };

  try {
    if (!token) throw new Error("401 unauthorized");

    const res = await fetch(`${API_URL}/user/update-user`, requestOptions);
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message);
    }
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
