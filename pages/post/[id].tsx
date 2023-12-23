import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = parseInt(params?.id as string, 10)
  const post = await prisma.post.findUnique({
    where: {
      id: postId.toString()
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div className="bg-blue-200 p-8">
        <h2 className="text-red">{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
      </div>
      <div className="mt-8"></div>
      <button className="cursor-pointer"></button>
    </Layout>
  )
}

export default Post
