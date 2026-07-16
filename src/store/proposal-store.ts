import { create } from "zustand";

interface ProposalState {
  step: number;
  title: string;
  templateId: string;
  setStep: (n: number) => void;
  setTitle: (t: string) => void;
  setTemplateId: (id: string) => void;
}

export const useProposalStore = create<ProposalState>()((set) => ({
  step: 3,
  title: "AI Integration Solution for TechFlow Solutions Ltd.",
  templateId: "software-development",
  setStep: (n) => set({ step: n }),
  setTitle: (t) => set({ title: t }),
  setTemplateId: (id) => set({ templateId: id }),
}));
