import { usePosts } from "@/queries/Post/usePostService";

const PostList = () => {
  const { isPending, isError, data, error } = usePosts();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostList;
