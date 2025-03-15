"use client";

import { useState } from "react";

export default function SearchUsers() {
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Search users..."
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1"
        />

        <button
          title={isSearching ? "Searching Users" : "Search User"}
          type="button"
          disabled={isSearching}
          className="size-12"
        >
          <i
            className={
              "pi" + (isSearching ? " pi-spinner animate-spin" : " pi-search")
            }
          />
        </button>
      </div>
    </div>
  );
}
