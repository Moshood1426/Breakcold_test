import { RequestHandler, Response, Request } from "express";
import fs from "fs";
import path from "path";

interface SingleUserType {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const usersFolderPath = path.join(__dirname, "../../data/users");

function validateSingleUser(user: any): user is SingleUserType {
  if (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    "name" in user &&
    "email" in user &&
    "avatar" in user &&
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.avatar === "string"
  ) {
    return true;
  }
  return false;
}

const getAllUsers: RequestHandler = (req, res) => {
  fs.readdir(usersFolderPath, (err, files: string[]) => {
    if (err) {
      console.error("Error reading users directory:", err);
      res.status(500).json({ error: "Failed to fetch users." });
    } else {
      const users = files.map((file) => {
        const filePath = path.join(usersFolderPath, file);
        const userData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(userData);
      });
      res.status(200).json(users);
    }
  });
};

const getSingleUser: RequestHandler = async (req, res) => {
  const userId = req.query.id as string;
  const fileName = `${userId}.json`;
  const filePath = path.join(usersFolderPath, fileName);

  try {
    const userData = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(userData));
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(404).json({ error: "User not found." });
  }
};

const addUser: RequestHandler = async (req, res) => {
  const newUser = req.body as SingleUserType;
  const usersFolderPath = path.join(__dirname, "../../data/users");

  const validateNewUser = validateSingleUser(newUser)

  if(!validateNewUser) {
    res.status(401).json({ error: "Bad Request Error" });
  }

  try {
    const files = fs.readdirSync(usersFolderPath);
    const nextUserId = files.length + 1;
    const fileName = `${nextUserId}.json`;
    const filePath = path.join(usersFolderPath, fileName);

    await fs.promises.writeFile(filePath, JSON.stringify(newUser));
    res.status(201).json({ message: "User added successfully." });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user." });
  }
};

export { getAllUsers, getSingleUser, addUser };
