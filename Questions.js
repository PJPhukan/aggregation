// Questions
//Todo: total fruits

// 1. How many users are active ?
[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "ActiveUsers",
  },
][
  // 2. What is the avarage age of the users?
  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age",
      },
    },
  }
][
  // 3.List the top 5 most common favorite fruits amount the users?
  ({
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1, //it count element in group wise
      },
    },
  },
  {
    $sort: {
      count: -1, //It sort the grouping value
    },
  },
  {
    $limit: 5, //limit
  })
];

// 4.Find the total number of males and females?
[
  {
    $group: {
      _id: "$gender",
      genderCount: {
        $sum: 1,
      },
    },
  },
][
  // 5. Which country has the highest number of registered users?
  ({
    $group: {
      _id: "$company.location.country",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  })
];

//6. List all unique eye colors present in the collection?
[
  {
    $group: {
      _id: "$eyeColor",
      totalEyeColor: {
        $sum: 1,
      },
    },
  },
];

//7. What is the average number of tags per user?

[
  {
    $unwind: {
      path: "$tags",
    },
  },
  {
    $group: {
      _id: "$_id",
      totalTags: {
        $sum: 1,
      },
    },
  },
  {
    $group: {
      _id: null,
      averageTags: {
        $avg: "$totalTags",
      },
    },
  },
];

// another way to do this
[
  {
    $addFields: {
      numberofTags: {
        $size: {
          $ifNull: ["$tags", []],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      averageTags: {
        $avg: "$numberofTags",
      },
    },
  },
];

// 8. How many users are present
[
  {
    $group: {
      _id: null,
      totalDocumnet: {
        $sum: 1,
      },
    },
  },
];

// 9.How many users have 'enim' as one of their tags ?
[
  {
    $match: {
      tags: "enim",
    },
  },
  {
    $count: "Result",
  },
];

// 10.What are the names and age of users who are inactive and have velit as a tag" ?
[
  {
    $match: {
      isActive: false,
    },
  },
  {
    $match: {
      tags: "velit",
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
][
  //another way to solve this question

  // 11.How many users have a phone number starting with '+(940)'
  ({
    $match: {
      "company.phone": /^\+1 \(940\)/,
    },
  },
  {
    $count: "result",
  })
];

// 12.Who has registered the most recently?
[
  {
    $sort: {
      registered: -1,
    },
  },
  {
    $limit: 4,
  },
  {
    $project: {
      name: 1,
      age: 1,
      registered: 1,
    },
  },
][
  // 13.Categorize users by their favorite fruit ?
  {
    $group: {
      _id: "$favoriteFruit",
      users: {
        $push: "$name",
      },
    },
  }
];

//14.How many users have 'ad' as the second tag in their list of tags?
[
  {
    $match: {
      "tags.1": "ad",
    },
  },
  {
    $count: "result",
  },
];

// 15.Find users who have both 'enim' and 'id' as their tags ?
[
  {
    $match: {
      tags: {
        $all: ["enim", "id"],
      },
    },
  },
  {
    $count: "result",
  },
];
// 16. List all companies located in the USA with their corresponding user count?
[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      totalUser: {
        $sum: 1,
      },
    },
  },
]

//Project operations
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },{
    $addFields: {
      author_details: {
        $first:"$author_details"
      }
    }
  }
]

//another way to do this 
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details",
    },
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0],
      },
    },
  }
]
