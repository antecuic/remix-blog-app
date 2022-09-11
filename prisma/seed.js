const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seed() {
  await Promise.all(getPosts().map((post) => db.post.create({ data: post })));
}

seed();

function getPosts() {
  return [
    {
      title: "Post 1 title",
      body: "Post 1 body",
    },
    {
      title: "Post 2 title",
      body: "Post 2 body",
    },
    {
      title: "Post 3 title",
      body: "Post 3 body",
    },
  ];
}
