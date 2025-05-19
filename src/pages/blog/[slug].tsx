// src/pages/blog/[slug].tsx

import { useParams } from 'react-router-dom'
import posts from './_index'

export default function BlogPost() {
  const { slug } = useParams()  
  const post = posts.find((p) => p.slug === slug)  

  if (!post) return <p>Post not found 😢</p> 

  const PostComponent = post.component

  return (
    <article className="prose prose-p:text-[18px] prose-li:text-[18px] max-w-3xl pb-32">
      <h2 className="text-[32px]">{post.meta.title}</h2>
      <p className="text-[18px] text-[#494949]">{post.meta.date}</p>
      <PostComponent />
    </article>
  )
}
