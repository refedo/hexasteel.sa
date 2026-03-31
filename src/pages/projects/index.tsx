import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Hero from '../../components/common/Hero';
import ProjectsShowcase from '../../components/projects/ProjectsShowcase';
import SEO from '../../components/common/SEO';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Our Projects"
        description="Explore Hexa Steel®'s portfolio of completed steel construction projects across Saudi Arabia — industrial facilities, commercial complexes, warehouses, and specialized structures."
        canonical="/projects"
        keywords="steel construction projects, PEB projects Saudi Arabia, industrial buildings portfolio, Hexa Steel projects"
      />

      <main>
        <Hero
          title="Our Projects"
          subtitle="Discover our diverse portfolio of steel construction projects, showcasing innovation and excellence in every sector."
        />
        <ProjectsShowcase />
      </main>
    </>
  );
}
