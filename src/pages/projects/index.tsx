import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Hero from '../../components/common/Hero';
import ProjectsShowcase from '../../components/projects/ProjectsShowcase';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Our Projects - Hexasteel</title>
        <meta
          name="description"
          content="Explore our portfolio of successful steel construction projects across industrial, commercial, residential, and infrastructure sectors."
        />
      </Head>

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
