# Hexa Steel Website

A modern, professional website for Hexa Steel showcasing steel structure manufacturing capabilities, projects, and services.

## Features

- Timeline of steel structure manufacturing processes
- FAQ section - Done
- Knowledge Centre - Done
- Completed Projects Gallery - Done
- Elite Clients Showcase - Done
- Testimonials - Done
- Blog - Done
- Team Management - Done
- Products and Services Catalog - Done
Products and services tab to include and segregate tehe following
- PEB (with all types, multi-span, single span, multi-gable, lean-to, cantilever, arch, 
- steel structure with all its types
- Cold formed sections (purlins, girts, C-channels)
- Sheeting
- Accessories
- Coating (either painting, fire-proofingm or galvanization)
- Piping
- Tanks & vessels
- Overhead cranes
- Grating, 
- Catwalks,
- Handrails 
- Shear Stud
- Deck panels 

Services 
- design services 
- Consultation
- Technical Support

- Machinery Section - Done
- Design Capabilities - Done
- Admin Panel for Content Management - Done
- Chatbot
- Initiatives - Done
- Hexa Academy - Done
- Join us (recruitment page) - Done
- Gobal search bar - Done
- Documentation Downloads - Done
- Want to be a partner


- Quick Quote System 
- Vendor Procurement Portal 


now, lets make sure that everything on frontend can be edited through the admin panel, lets develop one by one 
- Timeline
- Elite Clients
- About us page
- Products page, 
- Factory capabilities
- Initiatives, 
- contact us page information

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MongoDB
- Next Auth
- Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
├── components/       # Reusable UI components
├── pages/           # Next.js pages
├── public/          # Static assets
├── styles/          # Global styles
├── lib/            # Utility functions and configurations
├── models/         # MongoDB models
├── types/          # TypeScript type definitions
└── contexts/       # React contexts
```
