import { db } from './index';
import { categories, schemes } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Insert categories
  const categoryData = [
    {
      name: 'Farmers',
      slug: 'farmers',
      icon: '🌾',
      description: 'Government schemes for farmers and agricultural workers',
    },
    {
      name: 'Unemployed Youth',
      slug: 'unemployed-youth',
      icon: '🎓',
      description: 'Skill development and employment schemes for youth',
    },
    {
      name: 'Women',
      slug: 'women',
      icon: '👩',
      description: 'Empowerment schemes for women',
    },
    {
      name: 'Students',
      slug: 'students',
      icon: '📚',
      description: 'Educational schemes and scholarships',
    },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  // Get category IDs
  const farmersCategory = insertedCategories.find(c => c.slug === 'farmers')!;
  const youthCategory = insertedCategories.find(c => c.slug === 'unemployed-youth')!;

  // Insert schemes for farmers
  const farmerSchemes = [
    {
      categoryId: farmersCategory.id,
      title: 'PM-KISAN',
      slug: 'pm-kisan',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Income support of ₹6,000 per year to small and marginal farmers through direct bank transfer.',
      benefits: 'Direct income support of ₹6,000 per year in three equal installments',
      eligibility: 'Small and marginal farmers with cultivable land',
      howToApply: 'Apply through official PM-KISAN portal or visit nearest Common Service Centre',
      officialLink: 'https://pmkisan.gov.in/',
      imageUrl: '/images/pm-kisan.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      slug: 'pradhan-mantri-fasal-bima-yojana',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Crop insurance scheme providing financial support to farmers in case of any crop failure.',
      benefits: 'Comprehensive insurance coverage for crops against natural calamities',
      eligibility: 'All farmers growing notified crops in notified areas',
      howToApply: 'Apply through nearest bank, CSC, or online portal',
      officialLink: 'https://pmfby.gov.in/',
      imageUrl: '/images/fasal-bima.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Kisan Credit Card',
      slug: 'kisan-credit-card',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Offers affordable short-term credit to farmers, helping them cover cultivation and harvesting costs easily.',
      benefits: 'Credit facility at subsidized interest rates for agricultural needs',
      eligibility: 'All farmers including tenant farmers, sharecroppers',
      howToApply: 'Apply through any bank branch with land records',
      officialLink: 'https://www.india.gov.in/spotlight/kisan-credit-card',
      imageUrl: '/images/kcc.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Pradhan Mantri Krishi Sinchai Yojana',
      slug: 'pradhan-mantri-krishi-sinchai-yojana',
      ministry: 'Ministry of Jal Shakti',
      description: 'Improves irrigation facilities and promotes efficient water use under the vision "Har Khet Ko Pani".',
      benefits: 'Irrigation infrastructure, micro-irrigation support',
      eligibility: 'Individual farmers, self-help groups, cooperatives',
      howToApply: 'Apply through state agriculture departments',
      officialLink: 'https://pmksy.gov.in/',
      imageUrl: '/images/pmksy.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Paramparagat Krishi Vikas Yojana',
      slug: 'paramparagat-krishi-vikas-yojana',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Encourages organic farming by providing financial assistance and training for eco-friendly, traditional practices.',
      benefits: 'Financial assistance for organic farming, training, certification',
      eligibility: 'Farmers willing to adopt organic farming practices',
      howToApply: 'Contact state agriculture department or district office',
      officialLink: 'https://pgsindia-ncof.gov.in/',
      imageUrl: '/images/pkvy.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'National Agriculture Market',
      slug: 'national-agriculture-market',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'A digital trading platform that links farmers with buyers directly, ensuring better prices and transparent deals.',
      benefits: 'Better price discovery, transparent transactions, pan-India market access',
      eligibility: 'All farmers can register and trade',
      howToApply: 'Register on e-NAM portal',
      officialLink: 'https://www.enam.gov.in/',
      imageUrl: '/images/enam.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Soil Health Card Scheme',
      slug: 'soil-health-card-scheme',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Provides soil health cards to farmers for optimal fertilizer usage.',
      benefits: 'Free soil testing, personalized recommendations for fertilizer use',
      eligibility: 'All farmers',
      howToApply: 'Contact nearest soil testing laboratory or agriculture office',
      officialLink: 'https://soilhealth.dac.gov.in/',
      imageUrl: '/images/shc.png',
    },
    {
      categoryId: farmersCategory.id,
      title: 'Sub-Mission on Agricultural Mechanization',
      slug: 'sub-mission-on-agricultural-mechanization',
      ministry: 'Ministry of Agriculture and Farmer Welfare',
      description: 'Offers financial assistance to farmers for purchasing modern farm machinery and equipment.',
      benefits: 'Subsidy on agricultural machinery, custom hiring centers',
      eligibility: 'Individual farmers, cooperatives, FPOs',
      howToApply: 'Apply through state agriculture department',
      officialLink: 'https://agricoop.nic.in/',
      imageUrl: '/images/smam.png',
    },
  ];

  // Insert schemes for unemployed youth
  const youthSchemes = [
    {
      categoryId: youthCategory.id,
      title: 'Pradhan Mantri Kaushal Vikas Yojana',
      slug: 'pradhan-mantri-kaushal-vikas-yojana',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Free, industry-aligned skill training and certification in IT, AI, healthcare, and other emerging sectors.',
      benefits: 'Free skill training, certification, placement assistance',
      eligibility: 'Indian youth aged 15-45 years',
      howToApply: 'Register on PMKVY portal or visit nearest training center',
      officialLink: 'https://www.pmkvyofficial.org/',
      imageUrl: '/images/pmkvy.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
      slug: 'deen-dayal-upadhyaya-grameen-kaushalya-yojana',
      ministry: 'Ministry of Rural Development',
      description: 'Trains rural youth (15–35 years) in market-driven sectors to enhance employability and job readiness.',
      benefits: 'Free training, placement support, post-placement tracking',
      eligibility: 'Rural youth aged 15-35 years',
      howToApply: 'Register through DDU-GKY portal',
      officialLink: 'https://ddugky.gov.in/',
      imageUrl: '/images/ddugky.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'Jan Shikshan Sansthan',
      slug: 'jan-shikshan-sansthan',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Provides vocational training to school dropouts and women from disadvantaged groups in rural and urban areas.',
      benefits: 'Free vocational training, skill development',
      eligibility: 'School dropouts, neo-literates, disadvantaged groups',
      howToApply: 'Contact nearest JSS center',
      officialLink: 'https://www.msde.gov.in/',
      imageUrl: '/images/jss.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'National Apprenticeship Promotion Scheme',
      slug: 'national-apprenticeship-promotion-scheme',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Encourages companies to hire apprentices with government-funded stipends and training cost reimbursements.',
      benefits: 'Stipend support, on-the-job training, industry exposure',
      eligibility: 'Youth aged 14 years and above',
      howToApply: 'Register on National Apprenticeship portal',
      officialLink: 'https://apprenticeshipindia.gov.in/',
      imageUrl: '/images/naps.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'National Career Service',
      slug: 'national-career-service',
      ministry: 'Ministry of Labour & Employment',
      description: 'Online career portal offering job listings, career counselling, and skill-matching tools for youth.',
      benefits: 'Job search, career counseling, skill gap analysis',
      eligibility: 'All job seekers',
      howToApply: 'Register on NCS portal',
      officialLink: 'https://www.ncs.gov.in/',
      imageUrl: '/images/ncs.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'Pradhan Mantri Mudra Yojana',
      slug: 'pradhan-mantri-mudra-yojana',
      ministry: 'Ministry of Finance',
      description: 'Provides collateral-free loans up to ₹10 lakh to youth for starting small businesses and self-employment ventures.',
      benefits: 'Loans up to ₹10 lakh without collateral in three categories: Shishu, Kishore, Tarun',
      eligibility: 'Small business owners, entrepreneurs, artisans',
      howToApply: 'Apply through banks, NBFCs, MFIs',
      officialLink: 'https://www.mudra.org.in/',
      imageUrl: '/images/mudra.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'Prime Minister Employment Generation Programme',
      slug: 'prime-minister-employment-generation-programme',
      ministry: 'Ministry of Micro, Small & Medium Enterprises',
      description: 'Offers financial support to unemployed youth to set up manufacturing or service enterprises.',
      benefits: 'Margin money subsidy for setting up new enterprises',
      eligibility: 'Individuals above 18 years',
      howToApply: 'Apply through KVIC/KVIB/DIC',
      officialLink: 'https://www.kviconline.gov.in/pmegpeportal/',
      imageUrl: '/images/pmegp.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'PM Street Vendor\'s AtmaNirbhar Nidhi',
      slug: 'pm-street-vendors-atmanirbhar-nidhi',
      ministry: 'Ministry of Housing & Urban Affairs',
      description: 'Micro-loan scheme for street vendors and youth entrepreneurs to expand small businesses.',
      benefits: 'Collateral-free working capital loan up to ₹10,000',
      eligibility: 'Street vendors, small entrepreneurs',
      howToApply: 'Apply through designated banks',
      officialLink: 'https://pmsvanidhi.mohua.gov.in/',
      imageUrl: '/images/svanidhi.png',
    },
    {
      categoryId: youthCategory.id,
      title: 'PM Vishwakarma Yojana',
      slug: 'pm-vishwakarma-yojana',
      ministry: 'Ministry of Micro, Small & Medium Enterprises',
      description: 'Provides free training, toolkits, and collateral-free loans up to ₹2 lakh to support traditional artisans.',
      benefits: 'Skill training, toolkit incentive, credit support',
      eligibility: 'Traditional artisans and craftspeople',
      howToApply: 'Register on PM Vishwakarma portal',
      officialLink: 'https://pmvishwakarma.gov.in/',
      imageUrl: '/images/vishwakarma.png',
    },
  ];

  const allSchemes = [...farmerSchemes, ...youthSchemes];
  const insertedSchemes = await db.insert(schemes).values(allSchemes).returning();
  console.log(`✅ Inserted ${insertedSchemes.length} schemes`);

  console.log('✨ Database seeded successfully!');
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  });
