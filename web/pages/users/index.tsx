//DO THE USERS PAGE HERE AND THE MODAL TO ADD NEW USER ALSO HERE
import { useEffect, useState } from "react";
import SingleUser from "@/components/SingleUser";
import SingleUserType from "@/dto/types";

interface AllUsersProps {
  data: SingleUserType[];
}

const AllUsers: React.FC<AllUsersProps> = (data) => {
  const [users, setUsers] = useState<SingleUserType[]>([]);
  const [error, setError] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { msg: "Something went wrong. try again later" };
    }
  };

  useEffect(() => {
    fetchAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => setError("Something went wrong, Try again later"));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {error ? (
        <p>{error}</p>
      ) : (
        users.map((user) => <SingleUser key={user.id} {...user} />)
      )}
    </div>
  );
};

export default AllUsers;
