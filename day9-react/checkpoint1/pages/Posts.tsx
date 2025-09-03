import { Link, Outlet } from "react-router-dom";

function Posts() {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
    { id: 3, title: "Third Post" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Posts</h1>
      <ul className="mb-4 underline">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id.toString()} className="text-blue-500">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
}

export default Posts;
