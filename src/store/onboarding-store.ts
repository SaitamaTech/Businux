import { create } from "zustand";

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  salary?: string;
}

interface OnboardingState {
  step: number;
  totalSteps: number;
  businessInfo: {
    companyName: string;
    businessType: string;
    address: string;
    phone: string;
    email: string;
    employees: string;
  };
  staff: StaffMember[];
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateBusinessInfo: (partial: Partial<OnboardingState["businessInfo"]>) => void;
  addStaff: (member: Omit<StaffMember, "id">) => void;
  removeStaff: (id: string) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  step: 1,
  totalSteps: 5,
  businessInfo: {
    companyName: "TechFlow Solutions Ltd.",
    businessType: "Software Company",
    address: "123 Innovation Drive, Victoria Island, Lagos, Nigeria",
    phone: "+234 812 345 6789",
    email: "hello@techflowsolutions.com",
    employees: "25 – 50 employees",
  },
  staff: [
    { id: "s1", name: "John Olawale", position: "CEO", department: "Management", salary: "₦2,500,000" },
    { id: "s2", name: "Amina Yusuf", position: "Product Manager", department: "Product", salary: "₦1,800,000" },
    { id: "s3", name: "Michael Okafor", position: "Software Engineer", department: "Engineering", salary: "₦1,500,000" },
    { id: "s4", name: "Blessing Sunday", position: "UI/UX Designer", department: "Design", salary: "₦1,200,000" },
  ],
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, s.totalSteps) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  updateBusinessInfo: (partial) => set((s) => ({ businessInfo: { ...s.businessInfo, ...partial } })),
  addStaff: (member) => set((s) => ({ staff: [...s.staff, { ...member, id: crypto.randomUUID() }] })),
  removeStaff: (id) => set((s) => ({ staff: s.staff.filter((m) => m.id !== id) })),
}));
