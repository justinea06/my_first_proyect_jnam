import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Limpiar datos existentes
  await prisma.user.deleteMany()
  await prisma.tenant.deleteMany()
  console.log('🗑️ Existing data deleted')

  // Crear tenants
  const tenant1 = await prisma.tenant.create({ data: { name: 'Tech Solutions Inc.' } })
  const tenant2 = await prisma.tenant.create({ data: { name: 'Marketing Pro Agency' } })
  const tenant3 = await prisma.tenant.create({ data: { name: 'Consulting Experts LLC' } })

  // Hash de contraseñas
  const hashedPassword1 = await bcrypt.hash('password123', 10)
  const hashedPassword2 = await bcrypt.hash('securepass', 10)

  // Crear usuarios
  const adminTenant1 = await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin Tech Solutions',
      password: hashedPassword1,
      telephone: '+1-555-0101',
      role: Role.ADMIN,
      tenantId: tenant1.id,
    },
  })

  const userTenant1 = await prisma.user.create({
    data: {
      email: 'user@techsolutions.com',
      name: 'John Developer',
      password: hashedPassword2,
      telephone: '+1-555-0102',
      role: Role.USER,
      tenantId: tenant1.id,
    },
  })

  const adminTenant2 = await prisma.user.create({
    data: {
      email: 'admin@marketingpro.com',
      name: 'Admin Marketing Pro',
      password: hashedPassword1,
      telephone: '+1-555-0201',
      role: Role.ADMIN,
      tenantId: tenant2.id,
    },
  })

  const userTenant2 = await prisma.user.create({
    data: {
      email: 'user@marketingpro.com',
      name: 'Sarah Designer',
      password: hashedPassword2,
      telephone: '+1-555-0202',
      role: Role.USER,
      tenantId: tenant2.id,
    },
  })

  const adminTenant3 = await prisma.user.create({
    data: {
      email: 'admin@consultingexperts.com',
      name: 'Admin Consulting Experts',
      password: hashedPassword1,
      telephone: '+1-555-0301',
      role: Role.ADMIN,
      tenantId: tenant3.id,
    },
  })

  const userTenant3 = await prisma.user.create({
    data: {
      email: 'user@consultingexperts.com',
      name: 'Michael Consultant',
      password: hashedPassword2,
      telephone: '+1-555-0302',
      role: Role.USER,
      tenantId: tenant3.id,
    },
  })

  console.log('✅ Seed completed successfully!')

  return {
    tenants: [tenant1, tenant2, tenant3],
    users: [adminTenant1, userTenant1, adminTenant2, userTenant2, adminTenant3, userTenant3],
  }
}

main()
  .then(async (result) => {
    console.log(`Tenants created: ${result.tenants.length}`)
    console.log(`Users created: ${result.users.length}`)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
