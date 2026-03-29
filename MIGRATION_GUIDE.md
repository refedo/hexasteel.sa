# MongoDB to PostgreSQL Migration Guide

This guide outlines the steps to migrate the Hexa Steel website from MongoDB to PostgreSQL using Prisma ORM.

## Prerequisites

1. PostgreSQL installed and running
2. Node.js and npm installed (already confirmed)

## Step 1: Environment Setup

Create or update your `.env` file with the following:

```
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/hexasteel?schema=public"

# NextAuth configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:4500
```

Replace `username`, `password`, and potentially the host and port with your actual PostgreSQL credentials.

## Step 2: Database Setup

Run the setup script to initialize the database and run migrations:

```bash
node scripts/setup-db.js
```

This will:
- Generate the Prisma client
- Create the database tables based on the schema
- Set up the initial migration

## Step 3: API Route Migration

For each API route, follow this pattern to migrate from MongoDB/Mongoose to Prisma:

1. Replace MongoDB imports with Prisma:
   ```typescript
   // Old
   import { connectDB } from '../../../lib/mongodb';
   import ModelName from '../../../models/ModelName';
   
   // New
   import prisma from '../../../lib/prisma';
   ```

2. Replace Mongoose queries with Prisma queries:

   | MongoDB/Mongoose | Prisma |
   |-----------------|--------|
   | `Model.find(query)` | `prisma.model.findMany({ where: query })` |
   | `Model.findById(id)` | `prisma.model.findUnique({ where: { id } })` |
   | `Model.findOne({ field: value })` | `prisma.model.findFirst({ where: { field: value } })` |
   | `Model.create(data)` | `prisma.model.create({ data })` |
   | `Model.updateOne(query, data)` | `prisma.model.update({ where: query, data })` |
   | `Model.deleteOne(query)` | `prisma.model.delete({ where: query })` |
   | `Model.countDocuments(query)` | `prisma.model.count({ where: query })` |

3. Handle relationships differently:
   ```typescript
   // MongoDB - separate queries
   const project = await Project.findById(id);
   const images = await Image.find({ projectId: id });
   
   // Prisma - include relationships
   const project = await prisma.project.findUnique({
     where: { id },
     include: { images: true }
   });
   ```

## Step 4: Authentication Update

Update the NextAuth configuration to use Prisma instead of Mongoose:

1. Replace the MongoDB connection with Prisma
2. Update the user lookup and authentication logic
3. Ensure proper session handling

See the example in `src/pages/api/auth/[...nextauth].prisma.ts`

## Step 5: Testing

After migrating each API route:

1. Test the route functionality
2. Verify data is being stored correctly in PostgreSQL
3. Check for any errors or performance issues

## Step 6: Deployment

Once all routes are migrated and tested:

1. Update your production environment variables
2. Run migrations on the production database
3. Deploy the updated application

## Common Issues and Solutions

- **Type Errors**: Prisma provides better TypeScript support than Mongoose, so you may need to update your types
- **Query Differences**: Prisma queries are structured differently from Mongoose queries
- **Relationship Handling**: Prisma handles relationships through the schema and includes, while Mongoose uses refs
- **Transaction Support**: Use Prisma transactions for operations that need to be atomic

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
