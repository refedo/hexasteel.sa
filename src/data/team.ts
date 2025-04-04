export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  linkedinUrl?: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Eng. Walid Dami',
    position: 'CEO & Founder',
    bio: 'A visionary leader with over 20 years in steel construction, pioneering innovation and excellence in the Saudi steel building industry.',
    linkedinUrl: 'https://linkedin.com/in/refedo',
    image: '/team/walid-dami.jpg'
  },
  {
    id: '2',
    name: 'Eng. Ehab Samir',
    position: 'Operations Manager',
    bio: 'Expert in operational excellence, ensuring efficient project execution and optimal resource management across all company activities.',
    linkedinUrl: 'https://www.linkedin.com/in/ehab-samir-algohary-3b0936200/',
    image: '/team/ehab-samir.jpg'
  },
  {
    id: '3',
    name: 'Mr. Wael El Sayed',
    position: 'Finance Manager',
    bio: 'Strategic financial expert driving Hexasteel\'s growth through robust fiscal management and innovative financial planning.',
    linkedinUrl: 'https://www.linkedin.com/in/wael-mohamed-sayed-2a155b84/',
    image: '/team/wael-el-sayed.jpg'
  },
  {
    id: '4',
    name: 'Eng. Mohammed Sayed',
    position: 'Design Manager',
    bio: 'Innovative design leader specializing in cutting-edge structural solutions that prioritize safety, efficiency, and sustainability.',
    image: '/team/mohammed-sayed.jpg'
  },
  {
    id: '5',
    name: 'Eng. Mohammed Masadeh',
    position: 'Sales Manager',
    bio: 'Dynamic sales strategist with deep industry knowledge, driving market expansion through client-focused solutions and relationships.',
    linkedinUrl: 'https://www.linkedin.com/in/mohammad-masadeh-2a5764113/',
    image: '/team/mohammed-masadeh.jpg'
  },
  {
    id: '6',
    name: 'Eng. Mohammed Kanaan',
    position: 'Projects Manager',
    bio: 'Seasoned project manager ensuring seamless execution of complex steel construction projects from concept to completion.',
    linkedinUrl: 'https://www.linkedin.com/in/mohammed-kanaan-a7815319a/',
    image: '/team/mohammed-kanaan.jpg'
  },
  {
    id: '7',
    name: 'Mr. Mohammed Ahmed',
    position: 'Supply Chain Manager',
    bio: 'Supply chain specialist optimizing material sourcing and logistics to ensure timely project delivery and cost efficiency.',
    image: '/team/mohammed-ahmed.jpg'
  },
  {
    id: '8',
    name: 'Eng. Nada Al Sahwish',
    position: 'Business Development',
    bio: 'Strategic business developer identifying new opportunities and partnerships to strengthen Hexasteel\'s market position.',
    linkedinUrl: 'https://www.linkedin.com/in/nada-al-shaweish-5b8a46178/',
    image: '/team/nada-al-sahwish.jpg'
  },
  {
    id: '9',
    name: 'Mrs. Ghofran Bukhari',
    position: 'Procurement Manager',
    bio: 'Procurement expert maximizing value through strategic sourcing and strong vendor relationships in the steel construction sector.',
    linkedinUrl: 'https://www.linkedin.com/in/ghofran-bukhari-37388229a/',
    image: '/team/ghofran-bukhari.jpg'
  }
];
