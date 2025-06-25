import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils.js";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Mohammad",
    lastName: "Sakib",
    username: "sakib",
    password: "Sakib#123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Saziya",
    lastName: "Parveen",
    username: "saziya243",
    password: "Saziya@293",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Piyush",
    lastName: "Ranjan",
    username: "piyush",
    password: "Piyush@999",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Sharma",
    username: "shubham",
    password: "Shubham@959",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Mohammad",
    lastName: "Sameer",
    username: "sameer001",
    password: "Mohammad@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
