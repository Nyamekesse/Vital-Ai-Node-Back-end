import  {PrismaClient, User} from '@prisma/client'
const prisma = new PrismaClient()

const organizations = [
  {
    name: 'City Hospital',
    location: 'kumasi-stadium',
  },
  {
    name: 'Lapaz Community Hospital',
    location: 'abeka-lapaz',
  },
  {
    name: 'County Hospital',
    location: 'kumasi-abrepo',
  },
  {
    name: 'Manhyia Hospital',
    location: 'kumasi',
  },
  {
    name: 'Mary Theresa Hospital',
    location: 'Dodi Papase',
  },
  {
    name: 'Sacred Heart Hospital',
    location: 'weme',
  },
  {
    name: 'Wellspan Health',
    location: 'aborkutsine',
  },
  {
    name: 'Christian care center',
    location: 'accra',
  },
  {
    name: 'Hill Top Surgical Hospital',
    location: 'achimota',
  },
  {
    name: 'LEKMA Hospital',
    location: 'accra',
  },
  {
    name: 'C&J General Hospital',
    location: 'sekumono',
  },
];

async function seedOrganization(){
    await prisma.organization.deleteMany()
    for(const organization of organizations){
        await prisma.organization.create({data: organization})
    }
}
async function seed(){
    await prisma.organization.deleteMany()
    await prisma.user.deleteMany()
    for(const organization of organizations){
        await prisma.organization.create({data: organization})
    }
}


seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });