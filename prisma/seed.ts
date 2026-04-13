import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import * as dotenv from 'dotenv'

dotenv.config()

const prismaClientSingleton = () => {
    const user = process.env.DB_USERNAME || 'shekza_user';
    const password = process.env.DB_PASSWORD || 'shekza_password';
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '5432';
    const db = process.env.DB_NAME || 'law_firm_db';
    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${db}`;
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

const prisma = prismaClientSingleton()

async function main() {
    console.log('Starting seed process...')

    // 1. CLEAR EXISTING DATA (Optional, but good for clean seeds)
    // await prisma.$transaction([
    //     prisma.article.deleteMany(),
    //     prisma.lawyer.deleteMany(),
    //     prisma.practiceArea.deleteMany(),
    //     prisma.client.deleteMany(),
    //     prisma.media.deleteMany(),
    //     prisma.setting.deleteMany(),
    // ])

    // 2. SEED USERS
    const adminEmail = 'admin@gmail.com'
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { password: 'admin123' },
        create: {
            email: adminEmail,
            name: 'Senior Administrator',
            password: 'admin123',
        },
    })

    // 3. SEED PRACTICE AREAS
    const practiceAreas = [
        { title: 'Corporate Law', slug: 'corporate-law', description: 'Expert legal counsel for business formations, mergers, and institutional operations.', icon: 'Briefcase' },
        { title: 'Criminal Defense', slug: 'criminal-defense', description: 'Aggressive representation across all criminal litigation levels, ensuring your rights are protected.', icon: 'ShieldAlert' },
        { title: 'Family Law', slug: 'family-law', description: 'Compassionate guidance for divorce, custody, and complex family transitions.', icon: 'Users' },
        { title: 'Intellectual Property', slug: 'intellectual-property', description: 'Comprehensive protection for your innovations, trademarks, and creative capital.', icon: 'Lightbulb' },
        { title: 'Real Estate Law', slug: 'real-estate-law', description: 'Strategic advisory for commercial and residential acquisitions, disputes, and financing.', icon: 'Home' },
    ]

    for (const pa of practiceAreas) {
        await prisma.practiceArea.upsert({
            where: { slug: pa.slug },
            update: pa,
            create: pa,
        })
    }

    // 4. SEED LAWYERS
    const lawyers = [
        { name: 'Alexander Sterling, J.D.', slug: 'alexander-sterling', title: 'Senior Managing Partner', email: 'alexander@shekza.com', expertise: 'Corporate Mergers, International Arbitration', bio: 'With over 25 years of experience, Alexander leads our international litigation team.' },
        { name: 'Elena Vane, LL.M.', slug: 'elena-vane', title: 'Director of Family Law', email: 'elena@shekza.com', expertise: 'High-Asset Divorce, Custody Disputes', bio: 'Elena is renowned for her tactical approach to complex family asset preservation.' },
        { name: 'Marcus Thorne', slug: 'marcus-thorne', title: 'Head of Criminal Litigation', email: 'marcus@shekza.com', expertise: 'White-Collar Crime, Serious Felonies', bio: 'Marcus is a former federal prosecutor with a formidable record in the courtroom.' },
        { name: 'Sophia Chen', slug: 'sophia-chen', title: 'Intellectual Property Specialist', email: 'sophia@shekza.com', expertise: 'Patent Law, Tech Trademarks', bio: 'Sophia bridge the gap between innovation and legal protection for Silicon Valley clients.' },
        { name: 'David Miller', slug: 'david-miller', title: 'Real Estate Counsel', email: 'david@shekza.com', expertise: 'Commercial Development, Zoning Law', bio: 'David handles complex real estate transactions exceeding $500M in annual volume.' },
    ]

    for (const lawyer of lawyers) {
        await prisma.lawyer.upsert({
            where: { slug: lawyer.slug },
            update: lawyer,
            create: lawyer,
        })
    }

    // 5. SEED ARTICLES
    const articles = [
        { title: 'The Future of AI in Legal Contracts', slug: 'future-ai-legal', category: 'Technology', excerpt: 'How artificial intelligence is reshaping the way we draft and analyze contracts.', content: 'Full analysis of AI impact on legal precision...', published: true },
        { title: 'Navigating New International Trade Laws', slug: 'international-trade-laws', category: 'Corporate', excerpt: 'Key updates on global commerce regulations for 2026.', content: 'Comprehensive guide to international compliance...', published: true },
        { title: 'Protecting Digital Assets for Next-Gen Founders', slug: 'protecting-digital-assets', category: 'IP Law', excerpt: 'Essential strategies for cryptocurrency and NFT legal protection.', content: 'Detailed roadmap for digital founders...', published: true },
        { title: 'Managing High-Conflict Divorce Assets', slug: 'high-conflict-divorce', category: 'Family', excerpt: 'Best practices for equitable distribution in complex scenarios.', content: 'Strategic considerations for high-value assets...', published: true },
        { title: 'Corporate Ethics in the Sustainable Era', slug: 'corporate-ethics-sustainability', category: 'Governance', excerpt: 'Ensuring your board meets the new ESG legal requirements.', content: 'Framework for modern corporate responsibility...', published: true },
    ]

    for (const article of articles) {
        await prisma.article.upsert({
            where: { slug: article.slug },
            update: article,
            create: article,
        })
    }

    // 6. SEED CLIENTS
    const clients = [
        { name: 'Global Tech Industries', website: 'https://globaltech.com' },
        { name: 'Sterling Maritime Group', website: 'https://sterlingmaritime.com' },
        { name: 'Apex Real Estate Holdings', website: 'https://apexreal.com' },
        { name: 'Vanguard Capital', website: 'https://vanguardcap.com' },
        { name: 'Horizon Bio-Systems', website: 'https://horizonbio.com' },
    ]

    for (const client of clients) {
        await prisma.client.create({ data: client })
    }

    // 7. SEED MEDIA COVERAGE
    const media = [
        { title: 'Top 50 Litigation Firms 2026', url: 'https://lawjournal.com', publisher: 'National Law Journal', date: new Date('2026-01-15') },
        { title: 'Shekza Law Leads Major Tech Merger', url: 'https://bizdaily.com', publisher: 'Business Daily', date: new Date('2026-02-10') },
        { title: 'Expert Commentary on New Privacy Acts', url: 'https://legal-insight.com', publisher: 'Legal Insight', date: new Date('2026-03-05') },
        { title: 'Excellence in Client Advocacy Award', url: 'https://global-awards.com', publisher: 'Global Legal Awards', date: new Date('2025-12-20') },
        { title: 'Spotlight on Corporate Governance', url: 'https://financial-times-fake.com', publisher: 'The Financial Times', date: new Date('2026-04-01') },
    ]

    for (const item of media) {
        await prisma.media.create({ data: item })
    }

    // 8. SEED SETTINGS
    const settings = [
        { key: 'site_name', value: 'Shekza & Co. Law Firm' },
        { key: 'office_address', value: '77 Financial District, 5th Avenue, New York, NY' },
        { key: 'primary_contact', value: '+1 (555) 000-8888' },
        { key: 'business_hours', value: 'Mon-Fri: 08:00 AM - 06:00 PM' },
        { key: 'emergency_hotline', value: '+1 (555) 999-0000' },
    ]

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: setting,
            create: setting,
        })
    }

    console.log('Seed process completed successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
