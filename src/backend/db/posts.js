import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 1,
    content: 'Hey there! This is Adarsh Balika',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },
  {
    _id: 4,
    content: 'Hey there! This is Alice Johnson',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },
  {
    _id: 2,
    content: 'Hello, everyone! Just wanted to say hi!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 3,
    content: 'Its a beautiful day.Enjoying the sunshine!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 4,
    content: 'Just had a delicious meal. Feeling satisfied!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 5,
    content: 'Watching my favorite TV show. Can not wait for the next episode!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Bob",
    lastName: "Williams",
    username: "bobwilliams",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },
  {
    _id: 1,
    content: 'Just finished reading a great book. Highly recommend!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },

  {
    _id: 2,
    content: 'Excited about my upcoming vacation. Can not wait to relax on the beach!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 3,
    content: 'Just adopted a new puppy. Meet my adorable fur baby!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 4,
    content: 'Attended a fascinating conference today. Learned so much!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 5,
    content: 'Enjoying a cup of coffee and catching up on some work.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Bob",
    lastName: "Williams",
    username: "bobwilliams",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },
  {
    _id: 1,
    content: 'Had a productive day at work. Accomplished all my tasks!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },

  {
    _id: 2,
    content: 'Exploring new hiking trails in the mountains. Amazing views!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 3,
    content: 'Cooked a delicious meal from scratch. Feeling like a chef!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 4,
    content: 'Enjoying a relaxing evening with a good book and a cup of tea.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 5,
    content: 'Attending a live concert tonight. Can not wait to experience the music!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Bob",
    lastName: "Williams",
    username: "bobwilliams",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  },

  {
    _id: 1,
    content: 'Just returned from a refreshing morning run. Feeling energized!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 1,
    content: 'Celebrating a milestone achievement today. Hard work pays off!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 1,
    content: 'Enjoying a relaxing weekend getaway. Taking a break from the hustle and bustle.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 1,
    content: 'Trying out a new recipe in the kitchen. Fingers crossed for delicious results!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
  ,
  {
    _id: 1,
    content: 'Enjoying a movie night with friends. Popcorn and laughter all around!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    id: uuid()
  }
];
