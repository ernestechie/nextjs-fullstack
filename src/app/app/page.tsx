import UserList from "@/components/UserList/UserList";
import { getMeDetails } from "@/lib/api/user/users";
import React, { Suspense } from "react";
import Loading from "./loading";

export default async function MainAppPage() {
  const meDetails = await getMeDetails();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="p-8 rounded-xl bg-gray-100">
        {meDetails && (
          <p>
            Welcome, <span className="font-bold">{meDetails.email}</span>
          </p>
        )}
      </div>

      {/* User List */}
      <Suspense fallback={<Loading />}>
        <UserList />
      </Suspense>
    </div>
  );
}
