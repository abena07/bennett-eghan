// src/pages/blog/_index.ts

const modules = import.meta.glob('./*.mdx', { eager: true })

const posts = Object.entries(modules).map(([path, mod]: any) => {
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '') // Extract slug from filename

  return {
    slug,
    meta: mod.meta,  // Metadata of the blog post (title, date, etc.)
    component: mod.default, // The content of the MDX file
  }
})

export default posts
