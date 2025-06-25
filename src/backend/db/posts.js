import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */
const postsContent = [
  "📅 Not tomorrow. Not next week.\n✅ Start now, even if it's messy.\nSmall steps >>> No steps.",

  "⚠️ Harsh truth: If you don’t take control, someone else will.\n✊ Be the hero of your own story.",

  "⌛ You get 24 hours, just like everyone else.\n🧠 Protect your attention like your life depends on it—because it does.",

  "🙅‍♂️ No to energy vampires\n🙅‍♀️ No to distractions\n✅ Yes to peace\n✅ Yes to priorities",

  "👀 Don’t post every move.\n💪 Grind in private.\n🏆 Shine in public.",

  "If you think you can’t…\nYou’re right.\nIf you think you can…\nYou’re also right.\n🧠 Upgrade your thoughts.",

  "🔥 Go all in — but don’t rush.\n🌱 Everything good takes time.\nTrust the compound effect.",

  "⛔ Endless content won’t change your life.\n✅ Execution will.\nToday, build something — even if it’s tiny.",

  "👂 They don’t listen when you speak.\n💰 They ask how when you succeed.\nDon’t explain. Just execute.",

  "Your vibe is your superpower.\n⚡ Protect it. Recharge it.\nDon’t let low-energy people drain your fire.",
];

export const posts = [
  {
    _id: uuid(),
    content: postsContent[0],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: "I agree!! to manage what yay?",
      },
    ],
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[2],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: "I agree!!  go for outing. What say?",
      },
    ],
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[1],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: uuid(), username: "janedoe", text: "I like  outing. What say?" },
    ],
    username: "shubham",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[3],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: "I agree!! Feels like . What say?",
      },
    ],
    username: "shubham",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[4],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: "I do listen this , What say?",
      },
    ],
    username: "sameer001",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[5],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: uuid(), username: "janedoe", text: "I manage my day with this.?" },
    ],
    username: "sameer001",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[6],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: uuid(), username: "janedoe", text: "Very Best outing. What say?" },
    ],
    username: "saziya243",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[7],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },

    comment: [{ _id: uuid(), username: "janedoe", text: "I agree! What say?" }],
    username: "saziya243",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[8],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: " Feels like we should go for outing.",
      },
    ],
    username: "piyush",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: postsContent[9],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: uuid(),
        username: "janedoe",
        text: "I agree!! I will meet. What say?",
      },
    ],
    username: "sakib",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
