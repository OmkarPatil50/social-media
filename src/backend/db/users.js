import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 1,
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 2,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'johnDoe456',
    createdAt: '2023-06-21 12:34:56',
    updatedAt: '2023-06-21 12:34:56',
  },
  {
    _id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    password: 'janeSmith789',
    createdAt: '2023-06-21 12:34:56',
    updatedAt: '2023-06-21 12:34:56',
  },
  {
    _id: 4,
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    password: 'alice123',
    createdAt: '2023-06-21 12:34:56',
    updatedAt: '2023-06-21 12:34:56',
  },
  {
    _id: 5,
    firstName: 'Bob',
    lastName: 'Williams',
    username: 'bobwilliams',
    password: 'bob456',
    createdAt: '2023-06-21 12:34:56',
    updatedAt: '2023-06-21 12:34:56',
  },
];
