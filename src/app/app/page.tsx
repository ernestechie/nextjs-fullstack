import UserList from "@/components/UserList/UserList";
import { getAllUsers, getMeDetails } from "@/lib/api/users";

export default async function MainAppPage() {
  const meQuery = await getMeDetails();
  const allUsersQuery = await getAllUsers();

  const [meDetails, allUsers] = await Promise.all([meQuery, allUsersQuery]);

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
      <UserList users={allUsers} />
    </div>
  );
}
