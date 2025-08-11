import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Movies Search</Link>
      <div>
        <Link to="/favorites" className="mr-4 hover:underline">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
