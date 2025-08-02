import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
    await prisma.posts.create({
        data: {
            text: 'Espero que gostem desse projeto',
            value: 0,
        },
    });
    await prisma.posts.create({
        data: {
            text: 'O objetivo desse projeto era um chat onde o usuario poderia fixar esses posts conforme a quantidade de pontos que ele tivesse',
            value: 0,
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
