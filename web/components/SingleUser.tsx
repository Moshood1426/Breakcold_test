import SingleUserType from "@/dto/types";
import React from "react";

const SingleUser: React.FC<SingleUserType> = ({ id, name, email, avatar }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="w-16 h-16 rounded-full mb-2"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
    </div>
  );
};

export default SingleUser;
