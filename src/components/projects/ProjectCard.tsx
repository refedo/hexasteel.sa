import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: {
    _id: string;
    slug: string;
    title: string;
    description: string;
    location: string;
    category: string;
    images: Array<{
      url: string;
      caption: string;
    }>;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mainImage = project.images[0];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={mainImage?.url || '/images/placeholder-project.jpg'}
            alt={mainImage?.caption || project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block px-3 py-1 text-sm text-white bg-primary-500 rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-200 text-sm">{project.location}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
