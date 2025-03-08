"use client";

import { UserTokenData } from "@/helpers/getTokenData";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = UserTokenData & {
  _id: string;
};
interface ApiUser {
  user: User;
}

export default function MainAppPage() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const apiRes = await axios.get(`/api/auth/me`);
        const apiData: ApiUser = await apiRes?.data?.data;
        return apiData;
      } catch (err) {
        console.log(err);
        toast.error(
          err instanceof Error ? err.message : "Unexpected error occured!"
        );
        return null;
      }
    }

    getUserDetails().then((res) => {
      const user = res?.user;
      if (user) setUserData(user);

      console.log("User -> ", user);
    });
  }, []);

  return (
    <div className="p-8 rounded-xl bg-gray-100">
      {userData && (
        <div>
          <p>
            Welcome, <span className="font-bold">{userData.email}</span>
          </p>
        </div>
      )}
    </div>
  );
}
