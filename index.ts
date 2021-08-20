import { PrismaClient } from '@prisma/client'
import { hostname } from 'os'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']})

async function main() {
    while (true) {
        const inserts = Array.from(Array(20).keys()).map(_ => insertData())
        await Promise.all(inserts)
        await new Promise(r => setTimeout(r, 10000));
    }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


async function insertData() {
    const uuid = uuidv4();
    console.log('inserting uuid:', uuid, 'from:', hostname())
    await prisma.data.create({
        data: {
            hostname: hostname(),
            data: uuid,
        }
    })
}
