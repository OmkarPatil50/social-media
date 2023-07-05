import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 1,
    image: 'https://loremflickr.com/320/240/littlegirl',
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 2,
    image: 'https://loremflickr.com/320/240/dog',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'johnDoe456',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 3,
    image: 'https://loremflickr.com/320/240/mountain',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    password: 'janeSmith789',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 4,
    image: 'https://loremflickr.com/320/240/river',
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    password: 'alice123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 5,
    image: 'https://loremflickr.com/320/240/boy',
    firstName: 'Bob',
    lastName: 'Williams',
    username: 'bobwilliams',
    password: 'bob456',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
