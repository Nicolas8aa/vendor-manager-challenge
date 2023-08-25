import { getSession } from "next-auth/react";

export const fetchClient = async (path: string, options: RequestInit) => {
  const session = await getSession();

  return fetch(`http://localhost:3001${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { "x-access-token": session.user.accessToken }),
    },
  });
};
