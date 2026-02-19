import readingTimesData from './reading-times.json';

interface MdxModule {
  meta: {
    title: string;
    date?: string;
    description?: string;
    image?: string;
    tags?: string[];
    readingTime?: number;
  };
  default: React.ComponentType;
}

interface BlogPost {
  slug: string;
  meta: MdxModule['meta'] & { readingTime?: number };
  component: React.ComponentType;
}

const modules = import.meta.glob<MdxModule>('./*.mdx', { eager: true });
const readingTimes: Record<string, number> = readingTimesData as Record<string, number>;

const posts: BlogPost[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || '';
  const readingTime = mod.meta.readingTime ?? readingTimes[slug];

  return {
    slug,
    meta: { ...mod.meta, readingTime },
    component: mod.default,
  };
});

export default posts;