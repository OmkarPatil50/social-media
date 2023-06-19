import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
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
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi,",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: 'Shubham Soni',
    username: "shubhamsoni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "John Doe",
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "Nullam accumsan odio quis tristique fermentum...",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Emma Smith",
    username: "emmasmith",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Michael Johnson",
    username: "michaeljohnson",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "In et turpis ac nisi facilisis pretium at ut augue...",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Sophia Brown",
    username: "sophiabrown",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "Life is like a camera. Focus on what's important, capture the good times, develop from the negatives, and if things don't work out, take another shot.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Oliver Wilson",
    username: "oliverwilson",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Ava Lee",
    username: "avalee",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "The only way to do great work is to love what you do.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Liam Harris",
    username: "liamharris",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "Be the change that you wish to see in the world.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Mia Clark",
    username: "miaclark",
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    userFullName: "Noah Martin",
    username: "noahmartin",
    createdAt: formatDate(),
    updatedAt: formatDate()
  }
];
