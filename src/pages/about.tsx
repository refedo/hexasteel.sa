import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Stats from '../components/about/Stats';
import Values from '../components/about/Values';
import Team from '../components/about/Team';
import Hero from '../components/common/Hero';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Hexa Steel®</title>
        <meta
          name="description"
          content="Learn about Hexa Steel®'s journey, mission, values, and the team behind our success in steel construction."
        />
      </Head>

      <div>
        {/* Hero Section */}
        <Hero 
          title="About Hexa Steel®"
          subtitle="Building the future with innovative steel solutions and uncompromising quality since 1998."
        />

        {/* Company Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://placehold.co/800x600"
                    alt="Hexa Steel® Facility"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Leading the Way in Steel Construction
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    Since our establishment in 1998, Hexa Steel® has been at the forefront
                    of steel construction innovation in Saudi Arabia. We've grown from a
                    small local operation to a leading regional provider of steel
                    construction solutions.
                  </p>
                  <p>
                    Our state-of-the-art facility, spanning over 50,000 square meters,
                    is equipped with the latest technology in steel fabrication and
                    manufacturing. This enables us to deliver projects of any scale with
                    precision and efficiency.
                  </p>
                  <p>
                    We take pride in our contribution to Saudi Arabia's development,
                    having participated in numerous landmark projects across the
                    kingdom. Our commitment to quality and innovation has earned us the
                    trust of major clients in both public and private sectors.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To deliver innovative and sustainable steel construction solutions that
                  exceed client expectations, while maintaining the highest standards of
                  quality, safety, and environmental responsibility.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading steel construction company in the Middle East,
                  recognized for excellence in innovation, quality, and customer
                  service, while contributing to the region's sustainable development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <Stats />

        {/* Values Section */}
        <Values />

        {/* Team Section */}
        <Team />

        {/* CTA Section */}
        <section className="py-16 bg-primary-500">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help bring your construction project to life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
