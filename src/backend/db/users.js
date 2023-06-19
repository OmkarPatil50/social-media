import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Noah",
    lastName: "Martin",
    username: "noahmartin",
    password: "noahMartin123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Mia",
    lastName: "Clark",
    username: "miaclark",
    password: "miaClark123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Liam",
    lastName: "Harris",
    username: "liamharris",
    password: "liamHarris123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Ava",
    lastName: "Lee",
    username: "avalee",
    password: "avaLee123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Oliver",
    lastName: "Wilson",
    username: "oliverwilson",
    password: "oliverWilson123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Sophia",
    lastName: "Brown",
    username: "sophiabrown",
    password: "sophiaBrown123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Michael",
    lastName: "Johnson",
    username: "michaeljohnson",
    password: "michaelJohnson123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "Emma",
    lastName: "Smith",
    username: "emmasmith",
    password: "emmaSmith123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johnDoe123",
    createdAt: formatDate(),
    updatedAt: formatDate()
  }
];
