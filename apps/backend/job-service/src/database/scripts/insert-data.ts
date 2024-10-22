import configs from '@/src/config';
import { JobModel } from '@/src/database/models/job.model';
import mongoose from 'mongoose';

// Sample user data
const jobs = [
  {
    companyId: "66fe8b4e6da18f5670e0c9b5",
    title: "UI/UX Designer",
    position: ["Project Management", "Design"],
    workMode: ["On-Site"],
    location: "Phnom Penh",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "789 Road, Sihanoukville",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 3680,
    max_salary: 4376,
    job_opening: 1,
    type: ["Internship", "Contract"],
    schedule: ["Part-Time"],
    required_experience: ["3-5 year", "5 year up", "No"],
    benefit: ["Paid leave", "Health insurance"],
    deadline: "2024-11-30",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  },
  {
    companyId: "66fe7090ebfe2a1e9b967e49",
    title: "Project Manager",
    position: ["Frontend Development"],
    workMode: ["Hybrid"],
    location: "Sihanoukville",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "123 Street, Phnom Penh",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 3027,
    max_salary: 4354,
    job_opening: 1,
    type: ["Contract", "Internship"],
    schedule: ["Full-Time"],
    required_experience: ["1-3 year"],
    benefit: ["Health insurance"],
    deadline: "2025-01-17",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  },
  {
    companyId: "66fe7090ebfe2a1e9b967e49",
    title: "UI/UX Designer",
    position: ["Frontend Development", "Marketing", "Design"],
    workMode: ["Hybrid"],
    location: "Kampong Cham",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "123 Street, Phnom Penh",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 4276,
    max_salary: 4481,
    job_opening: 1,
    type: ["Contract"],
    schedule: ["Flexible-Hours", "Part-Time"],
    required_experience: ["5 year up", "No"],
    benefit: ["Paid leave"],
    deadline: "2025-01-02",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  },
  {
    companyId: "66fe7090ebfe2a1e9b967e49",
    title: "Marketing Specialist",
    position: ["Backend Development", "Marketing"],
    workMode: ["Remote", "Hybrid"],
    location: "Phnom Penh",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "789 Road, Sihanoukville",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 1673,
    max_salary: 3900,
    job_opening: 5,
    type: ["Contract"],
    schedule: ["Full-Time"],
    required_experience: ["No", "1-3 year"],
    benefit: ["Health insurance"],
    deadline: "2024-12-10",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  },
  {
    companyId: "66fe7090ebfe2a1e9b967e49",
    title: "Marketing Specialist",
    position: ["Marketing", "Design", "Backend Development"],
    workMode: ["Remote"],
    location: "Siem Reap",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "123 Street, Phnom Penh",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 681,
    max_salary: 4553,
    job_opening: 3,
    type: ["Contract"],
    schedule: ["Project-Based"],
    required_experience: ["1-3 year", "5 year up"],
    benefit: ["Health insurance", "Remote work", "Paid leave"],
    deadline: "2024-12-13",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  },
  {
    companyId: "66fe8b4e6da18f5670e0c9b5",
    title: "Marketing Specialist",
    position: ["Frontend Development", "Project Management"],
    workMode: ["On-Site"],
    location: "Phnom Penh",
    requirement: "Bachelor's degree in relevant field with industry experience.",
    address: "456 Avenue, Siem Reap",
    description: "Job description here. Responsibilities include managing projects, designing systems, etc.",
    min_salary: 377,
    max_salary: 3132,
    job_opening: 5,
    type: ["Contract", "Internship"],
    schedule: ["Project-Based"],
    required_experience: ["5 year up", "1-3 year"],
    benefit: ["Paid leave"],
    deadline: "2024-12-06",
    createdAt: "2024-10-22 02:57:57",
    updatedAt: "2024-10-22 02:57:57",
  }
];

// Function to connect to the database and insert data
const insertData = async () => {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log('Connected to MongoDB.');
    const inserted = await JobModel.create(jobs);
    console.log('Data inserted:', inserted);
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

insertData();
