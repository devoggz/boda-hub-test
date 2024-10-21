import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { FaCoins } from "react-icons/fa6";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Image } from "@nextui-org/react";
import { getAllUsers } from "../../actions/getAllUsers";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers(); // Call the server action
      setUsers(userData); // Set the users to state
    };

    fetchUsers();
  }, []);

  return (
    <Card className="max-w-[600px] mb-6">
      <CardHeader className="flex flex-row h-16 justify-between gap-3">
        <Image
          alt="nextui logo"
          height={48}
          radius="sm"
          src="/images/logoIcon.png"
          width={48}
        />
        <div className="flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-indigo-100 from-10% via-sky-50 via-40% to-emerald-100 to-90% px-4 p-1 rounded-full">
          <StarFilledIcon className="text-yellow-500" />
          <p className="text-sm font-bold text-indigo-600 ">
            National Champions
          </p>
        </div>
        <div className=" flex flex-row gap-3 items-center bg-emerald-200/50 px-4 p-1 rounded-full">
          <FaCoins className="text-emerald-500" />
          <p className="text-sm text-emerald-500 font-bold">Points</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between mb-4"
            >
              <User
                name={user.username} // Username from database
                description={`Rank #${index + 1}`} // Rank based on the index
                avatarProps={{
                  src: `https://i.pravatar.cc/150?u=${user.username}`, // Placeholder avatar using the username
                }}
              />
              <div className="flex flex-row gap-1 items-center">
                <p className="font-bold text-emerald-600 px-3">{user.points}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </CardBody>
    </Card>
  );
}
