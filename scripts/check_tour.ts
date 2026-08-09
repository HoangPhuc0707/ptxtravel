import 'dotenv/config';
import prisma from '../lib/prisma';

async function main() {
  const tour = await prisma.tour.findFirst({
    where: {
      title: {
        contains: 'Vũng Tàu',
      }
    }
  });
  console.log(JSON.stringify(tour, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
