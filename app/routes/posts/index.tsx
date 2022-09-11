import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type Post = {
  id: string;
  title: string;
  createdAt: Date;
};

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return posts;
};

export default function PostItems() {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map(({ id, title, createdAt }) => (
          <li key={id}>
            <Link to={id.toString()}>
              <h3>{title}</h3>
              {new Date(createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
