import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};


const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter();
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="text-current p-8 bg-red-500 hover:bg-blue-500 cursor-pointer text-zinc-50" onClick={() => router.push("/post/[id]", `/post/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
