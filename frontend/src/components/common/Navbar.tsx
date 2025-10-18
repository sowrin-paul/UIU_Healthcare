import React from "react";

interface NavbarProps {
  user?: { name: string };
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="font-bold text-lg">UIU HealthCare</div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.name}</span>
            <button onClick={onLogout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
