export type AgencyTier = 'free' | 'verified' | 'premium'

export interface Agency {
  id: string
  name: string
  location: string
  zipCode: string
  rating: number
  reviewCount: number
  services: string[]
  description: string
  verified: boolean
  hiring: boolean
  tier: AgencyTier
  yearsInBusiness?: number
  languages?: string[]
  benefits?: string[]
  responseTime?: string
  staffCount?: number
}

export interface Caregiver {
  id: string
  name: string
  location: string
  zipCode: string
  experience: string
  rating: number
  reviewCount: number
  skills: string[]
  description: string
  verified: boolean
  tier: AgencyTier
  available: boolean
  certificate: string
  avatar: string
  languages?: string[]
  responseTime?: string
  completedJobs?: number
}

export interface Job {
  id: string
  title: string
  agencyName: string
  location: string
  zipCode: string
  type: string
  salary: string
  description: string
  requirements: string[]
  postedAt: string
  verified: boolean
  tier: AgencyTier
}

export const mockAgencies: Agency[] = [
  // ===== ZIP 11201 - Brooklyn (6 agencies: 2 premium, 2 verified, 2 free) =====
  
  // Premium tier agency #1
  {
    id: '1',
    name: 'Sunrise Home Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.8,
    reviewCount: 124,
    services: ['Personal Care', 'Companionship', 'Medication Management', 'Skilled Nursing'],
    description: 'Providing compassionate home care services for over 15 years. Our dedicated team of certified professionals ensures the highest quality of care for your loved ones.',
    verified: true,
    hiring: true,
    tier: 'premium',
    yearsInBusiness: 15,
    languages: ['English', 'Spanish', 'Russian'],
    benefits: ['Health Insurance', '401(k)', 'Paid Time Off', 'Training Programs'],
    responseTime: 'Usually responds within 1 hour',
    staffCount: 150,
  },
  // Premium tier agency #2
  {
    id: '2',
    name: 'Park Slope Caregivers',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.9,
    reviewCount: 118,
    services: ['Dementia Care', '24/7 Monitoring', 'Specialized Memory Care', 'Respite Care'],
    description: 'High-quality care specifically tailored for patients with memory loss. Our certified dementia care specialists provide round-the-clock monitoring and support.',
    verified: true,
    hiring: true,
    tier: 'premium',
    yearsInBusiness: 10,
    languages: ['English', 'Spanish', 'French', 'Creole'],
    benefits: ['Health Insurance', '401(k)', 'Signing Bonus', 'Career Development'],
    responseTime: 'Usually responds within 1 hour',
    staffCount: 85,
  },
  // Verified tier agency #1
  {
    id: '3',
    name: 'Brooklyn Bridge Home Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.7,
    reviewCount: 92,
    services: ['Post-Op Care', 'Mobility Assistance', 'Physical Therapy'],
    description: 'Specializing in post-surgical recovery and rehabilitation support.',
    verified: true,
    hiring: true,
    tier: 'verified',
    yearsInBusiness: 6,
    languages: ['English', 'Polish', 'Russian'],
  },
  // Verified tier agency #2
  {
    id: '4',
    name: 'Brooklyn Heights Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.5,
    reviewCount: 38,
    services: ['Companionship', 'Meal Prep', 'Transportation'],
    description: 'Local care services from neighbors you can trust. Serving Brooklyn Heights families since 2020.',
    verified: true,
    hiring: true,
    tier: 'verified',
    yearsInBusiness: 4,
    languages: ['English', 'Hebrew'],
  },
  // Free tier agency #1
  {
    id: '5',
    name: 'Heights Health Services',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.4,
    reviewCount: 45,
    services: ['Senior Companionship', 'Light Housekeeping'],
    description: 'Providing friendly and reliable support for seniors in Brooklyn Heights.',
    verified: false,
    hiring: false,
    tier: 'free',
  },
  // Free tier agency #2
  {
    id: '6',
    name: 'Elite Home Assistance',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.6,
    reviewCount: 73,
    services: ['Nursing Care', 'Wound Management'],
    description: 'Professional medical home care provided by registered nurses.',
    verified: false,
    hiring: true,
    tier: 'free',
  },

  // ===== Other ZIP codes =====
  
  // Manhattan - Verified
  {
    id: '7',
    name: 'CareFirst Agency',
    location: 'Manhattan, NY',
    zipCode: '10001',
    rating: 4.6,
    reviewCount: 89,
    services: ['Skilled Nursing', 'Physical Therapy', 'Personal Care'],
    description: 'Licensed agency specializing in skilled nursing and rehabilitation.',
    verified: true,
    hiring: false,
    tier: 'verified',
    yearsInBusiness: 8,
    languages: ['English', 'Spanish'],
  },
  // Queens - Premium
  {
    id: '8',
    name: 'Golden Years Care',
    location: 'Queens, NY',
    zipCode: '11375',
    rating: 4.9,
    reviewCount: 156,
    services: ['Dementia Care', 'Respite Care', 'Live-in Care', 'Memory Support'],
    description: 'Expert care for seniors with memory conditions. Award-winning dementia care specialists with compassionate and highly trained staff.',
    verified: true,
    hiring: true,
    tier: 'premium',
    yearsInBusiness: 12,
    languages: ['English', 'Chinese', 'Korean'],
    benefits: ['Health Insurance', 'Dental', 'Vision', 'Paid Time Off'],
    responseTime: 'Usually responds within 30 minutes',
    staffCount: 200,
  },
  // Bronx - Free
  {
    id: '9',
    name: 'Helping Hands NYC',
    location: 'Bronx, NY',
    zipCode: '10451',
    rating: 4.5,
    reviewCount: 67,
    services: ['Personal Care', 'Housekeeping', 'Meal Preparation'],
    description: 'Affordable and reliable home care services.',
    verified: false,
    hiring: true,
    tier: 'free',
  },
]

export const mockCaregivers: Caregiver[] = [
  // Premium
  {
    id: '1',
    name: 'Maria Santos',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '8 years',
    rating: 4.9,
    reviewCount: 45,
    skills: ['CPR Certified', 'Dementia Care', 'Medication Management', 'Physical Therapy'],
    description: 'Specializing in dementia and Alzheimer\'s care with certified experience. Providing compassionate, round-the-clock support with a focus on preserving dignity and independence.',
    verified: true,
    tier: 'premium',
    available: true,
    certificate: 'HHA / CNA',
    avatar: 'MS',
    languages: ['English', 'Spanish'],
    responseTime: 'Responds within 1 hour',
    completedJobs: 134,
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '12 years',
    rating: 5.0,
    reviewCount: 78,
    skills: ['Registered HHA', 'Wound Care', 'IV Management', 'Post-Op Care'],
    description: 'Registered Home Health Aide with extensive experience in post-surgical recovery. I provide individualized and professional medical care tailored to each patient\'s unique needs.',
    verified: true,
    tier: 'premium',
    available: true,
    certificate: 'Registered HHA',
    avatar: 'ER',
    languages: ['English', 'Russian'],
    responseTime: 'Responds within 30 minutes',
    completedJobs: 219,
  },
  // Verified
  {
    id: '3',
    name: 'James Wilson',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '5 years',
    rating: 4.7,
    reviewCount: 32,
    skills: ['Physical Therapy Aide', 'Mobility Assistance', 'First Aid'],
    description: 'Dedicated to helping seniors maintain mobility. I assist with daily exercise routines and physical therapy homework in a safe and supportive environment.',
    verified: true,
    tier: 'verified',
    available: true,
    certificate: 'Physical Therapy Aide',
    avatar: 'JW',
    languages: ['English'],
    completedJobs: 45,
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '7 years',
    rating: 4.8,
    reviewCount: 62,
    skills: ['Companionship', 'Meal Preparation', 'Light Housekeeping'],
    description: 'Experienced in creating a warm, comfortable home environment. I specialize in nutritious meal preparation and providing engaging companionship for elderly clients.',
    verified: true,
    tier: 'verified',
    available: false,
    certificate: 'PCA',
    avatar: 'SJ',
    languages: ['English', 'French'],
    completedJobs: 89,
  },
  // Free
  {
    id: '5',
    name: 'David Chen',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '3 years',
    rating: 4.6,
    reviewCount: 21,
    skills: ['Companionship', 'Light Housekeeping', 'Transportation'],
    description: 'Friendly and reliable caregiver available for errands, appointments, and general household support. Excellent driving record and positive attitude.',
    verified: false,
    tier: 'free',
    available: true,
    certificate: 'PCA',
    avatar: 'DC',
  },
  {
    id: '6',
    name: 'Fatima Ali',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '1 year',
    rating: 4.4,
    reviewCount: 12,
    skills: ['Grocery Shopping', 'Companionship', 'Pet Care'],
    description: 'Energetic and caring companion for your loved ones. I enjoy helping with daily tasks, reading, and ensuring a safe and positive daily routine.',
    verified: false,
    tier: 'free',
    available: true,
    certificate: 'HHA',
    avatar: 'FA',
  },
]

export const mockJobs: Job[] = [
  // Premium
  {
    id: '1',
    title: 'Live-in Caregiver',
    agencyName: 'Sunrise Home Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    type: 'Full-time',
    salary: '$800-1000/week',
    description: 'Seeking experienced caregiver for live-in position with elderly client.',
    requirements: ['HHA Certificate', '3+ years experience', 'Valid drivers license'],
    postedAt: '2 days ago',
    verified: true,
    tier: 'premium',
  },
  {
    id: '2',
    title: 'Weekend Caregiver',
    agencyName: 'Golden Years Care',
    location: 'Queens, NY',
    zipCode: '11375',
    type: 'Part-time',
    salary: '$20-25/hr',
    description: 'Part-time weekend position for dementia care specialist.',
    requirements: ['Dementia care experience', 'CPR Certified', 'References required'],
    postedAt: '1 week ago',
    verified: true,
    tier: 'premium',
  },
  // Verified
  {
    id: '3',
    title: 'Home Health Aide',
    agencyName: 'CareFirst Agency',
    location: 'Manhattan, NY',
    zipCode: '10001',
    type: 'Full-time',
    salary: '$18-22/hr',
    description: 'Multiple positions available for certified HHAs.',
    requirements: ['HHA Certificate', 'Background check', 'Reliable transportation'],
    postedAt: '3 days ago',
    verified: true,
    tier: 'verified',
  },
  // Free
  {
    id: '4',
    title: 'Night Shift Caregiver',
    agencyName: 'Helping Hands NYC',
    location: 'Bronx, NY',
    zipCode: '10451',
    type: 'Full-time',
    salary: '$22-28/hr',
    description: 'Overnight caregiver needed for post-surgery recovery patient.',
    requirements: ['Night shift availability', 'Medical experience preferred', 'CPR Certified'],
    postedAt: '5 days ago',
    verified: false,
    tier: 'free',
  },
]

export function searchByZipCode<T extends { zipCode: string }>(
  items: T[],
  zipCode: string
): T[] {
  if (!zipCode.trim()) return items
  return items.filter((item) =>
    item.zipCode.startsWith(zipCode.trim())
  )
}
