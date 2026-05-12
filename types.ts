export interface Program {
  id: string;
  name: string;
  displayName: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  badge: string | null;
  ctaText: string;
}

export interface ContentData {
  meta: {
    lastUpdated: string;
    version: string;
  };
  contact: {
    coachName: string;
    phone: string;
    email: string;
    whatsappGroup: string;
    googleBusiness: string;
  };
  programs: Record<string, Program>;
  whatsapp: {
    preFillTemplate: string;
    freeTrialTemplate: string;
  };
  paymentInstructions: {
    upiId: string;
    steps: string[];
  };
  emailTemplates: {
    welcomeSubject: string;
    welcomeNote: string;
  };
}
