// UserSection.tsx
import React from 'react';
import { User, LogOut, Mail, LogIn } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const UserSection: React.FC = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const handleSignup = () =>
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });

  const handleLogout = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  return (
    <div className="px-4">
      <div className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        User Data
      </div>
      <nav className="space-y-1 border-l-[1px] dark:border-gray-600">
        <div className="px-4">
          <nav className="space-y-1">
            <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <h2>
                      {user?.name != user?.email
                        ? user?.name
                        : user?.nickname}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail />
                    <p
                      className="font-normal text-md dark:text-gray-300 text-gray-500 break-all line-clamp-1"
                      title={user?.email}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <button
                      className="p-3 py-1 text-red-400 border border-red-400 active:bg-red-100 rounded-lg"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center gap-2">
                        <LogOut /> <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p>Guest 🤡 </p>
                  <div>
                    <button
                      className="p-3 py-1 border border-blue-500 text-blue-500 rounded-lg active:bg-blue-100"
                      onClick={handleSignup}
                    >
                      <div className="flex items-center gap-2">
                        <LogIn /> <span>Login</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default UserSection;
