import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma"

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    where: {published: true},
    include: {
      author: {
        select: {name: true},
      },
    }
  });

  return {
    props: {posts},
    revalidate: 10,
  }
}


type Props = {
  posts: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main className="flex gap-8 justify-center items-center">
          {props.posts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
