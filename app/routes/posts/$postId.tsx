import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { Post } from "@prisma/client";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { postId } = params;

  const post = await db.post.findFirst({ where: { id: postId } });

  return post;
};

export default function Post() {
  const post = useLoaderData<Post>();

  return (
    <div>
      <h1>Single post id = {post.id}</h1>
      <p>{post.body}</p>
    </div>
  );
}
