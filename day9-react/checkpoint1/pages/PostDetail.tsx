import { useParams } from "react-router-dom";

function PostDetail() {
  const { postId } = useParams();

  return (
    <div className="mt-8 border rounded bg-gray-100">
      <h1 className="text-2xl font-semibold mb-2">Post Detail</h1>
      <p className="text-orange-500">
        Showing details for post ID:{" "}
        <span className="font-mono text-black">{postId}</span>
      </p>
    </div>
  );
}

export default PostDetail;
