import { motion } from 'framer-motion';
import Image from 'next/image';

const team = [
  {
    name: 'Ahmed Al-Sayed',
    role: 'Chief Executive Officer',
    image: 'https://placehold.co/400x400',
    bio: 'With over 20 years of experience in steel construction, Ahmed leads our company with vision and expertise.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Technical Director',
    image: 'https://placehold.co/400x400',
    bio: 'Sarah brings innovative engineering solutions and technical excellence to every project.',
  },
  {
    name: 'Mohammed Al-Rahman',
    role: 'Operations Manager',
    image: 'https://placehold.co/400x400',
    bio: 'Mohammed ensures smooth project execution and maintains our high quality standards.',
  },
  {
    name: 'David Chen',
    role: 'Design Manager',
    image: 'https://placehold.co/400x400',
    bio: 'David leads our design team in creating innovative and efficient steel structures.',
  },
];

export default function Team() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the experienced professionals leading Hexasteel towards excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary-500 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
