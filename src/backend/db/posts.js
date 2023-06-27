import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 1,
    content: 'Hey there! This is Adarsh BalikaasDbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: 'Adarsh Balika',
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 2,
    content: 'Hey there! This is Alice Johnson asDbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: 'Alice Johnson',
    username: 'alicejohnson',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
