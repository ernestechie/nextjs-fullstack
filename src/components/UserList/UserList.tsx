import { getAllUsers } from "@/lib/api/user/users";
import SearchUsers from "./SearchUsers";

export default async function UserList() {
  const users = await getAllUsers();

  return (
    <div className="p-6 border border-gray-100 rounded-xl">
      <p className="mb-4 font-semibold">Users</p>
      <SearchUsers />

      <div className="mt-8">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <div key={user._id} className="flex items-center gap-x-2">
              <span>{index + 1}</span>
              <p>{user.username}</p>
            </div>
          ))}

        {!users?.length && (
          <p className="text-2xl text-center text-gray-700 p-8 bg-gray-50 rounded-xl">
            No Users
          </p>
        )}
      </div>
    </div>
  );
}
