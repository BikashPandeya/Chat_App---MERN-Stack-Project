import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Menu } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [open, setOpen] = useState(false); // <-- Sidebar open state for mobile

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const reversed = users.slice().reverse(); // Reverse the users array for display
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : reversed;
 

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden btn btn-ghost btn-circle my-2 ml-2"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="size-6" />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          h-full lg:h-screen w-64 max-w-[80vw] border-r border-base-300 flex flex-col transition-all duration-200
          bg-base-100 z-50 fixed top-0 left-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-72
        `}
        style={{ minHeight: "100vh" }}
      >
        {/* Close button for mobile */}
        <div className="flex items-center gap-2 p-2 border-b border-base-300">
          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <span className="text-xl">&times;</span>
          </button>
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 flex items-center gap-1 w-full justify-start px-2">
          <label className="cursor-pointer flex items-center gap-1">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-xs lg:hidden">
              Show Online ({Math.max(onlineUsers.length - 1, 0)})
            </span>
            <span className="text-xs lg:text-sm hidden lg:inline">
              Show online only
            </span>
          </label>
          <span className="text-xs text-zinc-500 hidden lg:inline">
            ({onlineUsers.length - 1} online)
          </span>
        </div>

        <div className="overflow-y-auto w-full py-3 pb-6 flex-1">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setOpen(false); // auto-close sidebar on mobile after selecting
              }}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
              `}
            >
              {/* Profile pic at left */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
              {/* Name (full name) right after profile pic, only on mobile */}
              <span className="font-medium text-sm truncate lg:hidden">{user.fullName}</span>
              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 mt-5">
              No Online Users
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
