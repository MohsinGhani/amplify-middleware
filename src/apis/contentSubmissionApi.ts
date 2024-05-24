import { API_URL } from "@/shared/constants/constants";

export const contentSubmissionApi = async (details: any) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details), // Send username in the request body
  };

  try {
    const res = await fetch(`${API_URL}/content-submission`, requestOptions);
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message);
    }
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
