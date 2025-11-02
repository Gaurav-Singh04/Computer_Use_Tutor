const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        title: 'Team Standup',
        description: 'Daily sync',
        start: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
        color: '#1e88e5'
      },
      {
        title: 'Lunch with Sam',
        description: '',
        start: new Date(new Date().setHours(12, 30, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(13, 30, 0, 0)).toISOString(),
        color: '#43a047'
      },
      {
        title: 'Project Planning',
        description: 'Planning Q4 features',
        start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        color: '#f4511e'
      }
    ],
    skipDuplicates: true
  });
  console.log('Seeded events');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
