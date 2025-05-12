// src/pages/blog/_index.ts

interface MdxModule {
    meta: {
      title: string;
      date?: string;
      // Add other possible meta fields here
    };
    default: React.ComponentType;
  }
  
  interface BlogPost {
    slug: string;
    meta: MdxModule['meta'];
    component: React.ComponentType;
  }
  
  const modules = import.meta.glob<MdxModule>('./*.mdx', { eager: true });
  
  const posts: BlogPost[] = Object.entries(modules).map(([path, mod]) => {
    const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || '';
  
    return {
      slug,
      meta: mod.meta,
      component: mod.default,
    };
  });
  
  export default posts;