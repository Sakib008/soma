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
    _id: 'postId1',
    content: postsContent[0],
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId2',
        username: "janedoe",
        text: "I agree!! to manage what yay?",
      },
    ],
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId3',
    content: postsContent[2],
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId4',
        username: "janedoe",
        text: "I agree!!  go for outing. What say?",
      },
    ],
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId5',
    content: postsContent[1],
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: 'postId6', username: "janedoe", text: "I like  outing. What say?" },
    ],
    username: "shubham",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId7',
    content: postsContent[3],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId8',
        username: "janedoe",
        text: "I agree!! Feels like . What say?",
      },
    ],
    username: "shubham",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId9',
    content: postsContent[4],
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId10',
        username: "janedoe",
        text: "I do listen this , What say?",
      },
    ],
    username: "sameer001",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId11',
    content: postsContent[5],
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: 'postId12', username: "janedoe", text: "I manage my day with this.?" },
    ],
    username: "sameer001",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId13',
    content: postsContent[6],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      { _id: 'postId14', username: "janedoe", text: "Very Best outing. What say?" },
    ],
    username: "saziya243",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId15',
    content: postsContent[7],
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },

    comment: [{ _id: 'postId16', username: "janedoe", text: "I agree! What say?" }],
    username: "saziya243",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId17',
    content: postsContent[8],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId18',
        username: "janedoe",
        text: " Feels like we should go for outing.",
      },
    ],
    username: "piyush",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId19',
    content: postsContent[9],
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId20',
        username: "janedoe",
        text: "I agree!! I will meet. What say?",
      },
    ],
    username: "sakib",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId21',
    content: "You Don't reach at the level of you Goal,✨🎇👔 You fall on the level of your system.🎑🎑",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId22',
        username: "janedoe",
        text: "I agree!! I will meet. What say?",
      },
    ],
    username: "sakib",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'postId23',
    content: "Success Comes from 😎, Sacrifice and Sacrifice get strong with the Decipline.🎄🎈",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comment: [
      {
        _id: 'postId24',
        username: "janedoe",
        text: "I agree!! I will meet. What say?",
      },
    ],
    username: "sakib",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
