// client/src/context/CampaignContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CampaignData {
  campaignName: string;
  campaignObjective: string;
  audience: string[];
  metrics: string[];
  startDate: string;
  endDate: string;
  advertisement: string;
  age?: string;
  location?: string;
  gender?: string;
  interests?: string;
  incomeLevel?: string;
  occupation?: string;
}

interface CampaignContextProps {
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
}

const initialCampaignData: CampaignData = {
  campaignName: '',
  campaignObjective: '',
  audience: [],
  metrics: [],
  startDate: '',
  endDate: '',
  advertisement: '',
  age: '',
  location: '',
  gender: '',
  interests: '',
  incomeLevel: '',
  occupation: '',
};

const CampaignContext = createContext<CampaignContextProps | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaignData, setCampaignData] = useState<CampaignData>(initialCampaignData);

  return (
    <CampaignContext.Provider value={{ campaignData, setCampaignData }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextProps => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
