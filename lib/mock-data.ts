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
  available: boolean
  hourlyRate: string
  avatar: string
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
}

export const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Sunrise Home Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.8,
    reviewCount: 124,
    services: ['Personal Care', 'Companionship', 'Medication Management'],
    description: 'Providing compassionate home care services for over 15 years.',
    verified: true,
    hiring: true,
  },
  {
    id: '2',
    name: 'CareFirst Agency',
    location: 'Manhattan, NY',
    zipCode: '10001',
    rating: 4.6,
    reviewCount: 89,
    services: ['Skilled Nursing', 'Physical Therapy', 'Personal Care'],
    description: 'Licensed agency specializing in skilled nursing and rehabilitation.',
    verified: true,
    hiring: false,
  },
  {
    id: '3',
    name: 'Golden Years Care',
    location: 'Queens, NY',
    zipCode: '11375',
    rating: 4.9,
    reviewCount: 156,
    services: ['Dementia Care', 'Respite Care', 'Live-in Care'],
    description: 'Expert care for seniors with memory conditions.',
    verified: true,
    hiring: true,
  },
  {
    id: '4',
    name: 'Helping Hands NYC',
    location: 'Bronx, NY',
    zipCode: '10451',
    rating: 4.5,
    reviewCount: 67,
    services: ['Personal Care', 'Housekeeping', 'Meal Preparation'],
    description: 'Affordable and reliable home care services.',
    verified: false,
    hiring: true,
  },
  {
    id: '5',
    name: 'Brooklyn Bridge Home Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.7,
    reviewCount: 92,
    services: ['Post-Op Care', 'Mobility Assistance'],
    description: 'Specializing in post-surgical recovery and rehabilitation support.',
    verified: true,
    hiring: true,
  },
  {
    id: '6',
    name: 'Heights Health Services',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.4,
    reviewCount: 45,
    services: ['Senior Companionship', 'Light Housekeeping'],
    description: 'Providing friendly and reliable support for seniors in Brooklyn Heights.',
    verified: true,
    hiring: false,
  },
  {
    id: '7',
    name: 'Park Slope Caregivers',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.9,
    reviewCount: 118,
    services: ['Dementia Care', '24/7 Monitoring'],
    description: 'High-quality care specifically tailored for patients with memory loss.',
    verified: true,
    hiring: true,
  },
  {
    id: '8',
    name: 'Elite Home Assistance',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.6,
    reviewCount: 73,
    services: ['Nursing Care', 'Wound Management'],
    description: 'Professional medical home care provided by registered nurses.',
    verified: false,
    hiring: true,
  },
  {
    id: '9',
    name: 'Brooklyn Heights Care',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    rating: 4.5,
    reviewCount: 38,
    services: ['Companionship', 'Meal Prep'],
    description: 'Local care services from neighbors you can trust.',
    verified: true,
    hiring: true,
  },
]

export const mockCaregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Maria Santos',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '8 years',
    rating: 4.9,
    reviewCount: 45,
    skills: ['CPR Certified', 'Dementia Care', 'Medication Management'],
    available: true,
    hourlyRate: '$18-22/hr',
    avatar: 'MS',
  },
  {
    id: '2',
    name: 'James Wilson',
    location: 'Manhattan, NY',
    zipCode: '10001',
    experience: '5 years',
    rating: 4.7,
    reviewCount: 32,
    skills: ['Physical Therapy Aide', 'Mobility Assistance', 'First Aid'],
    available: true,
    hourlyRate: '$20-25/hr',
    avatar: 'JW',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    location: 'Queens, NY',
    zipCode: '11375',
    experience: '12 years',
    rating: 5.0,
    reviewCount: 78,
    skills: ['Registered HHA', 'Wound Care', 'IV Management'],
    available: false,
    hourlyRate: '$25-30/hr',
    avatar: 'ER',
  },
  {
    id: '4',
    name: 'David Chen',
    location: 'Brooklyn, NY',
    zipCode: '11201',
    experience: '3 years',
    rating: 4.6,
    reviewCount: 21,
    skills: ['Companionship', 'Light Housekeeping', 'Transportation'],
    available: true,
    hourlyRate: '$15-18/hr',
    avatar: 'DC',
  },
]

export const mockJobs: Job[] = [
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
  },
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
  },
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
