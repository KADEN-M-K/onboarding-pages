import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import Step1ClientType from './Step1ClientType';
import Step2CompanyInfo from './Step2CompanyInfo';
import Step3Contacts from './Step3Contacts';
import Step4Review from './Step4Review';

export type ClientAddress = {
  country?: string;
  region?: string;
  city?: string;
  street?: string;
  building?: string;
  postalCode?: string;
};

export type SwiftAddress = {
  clientName?: string;
  addressLine?: string;
  city?: string;
};

export type OnboardingData = {
  mdmlegalstatus?:
    | 'Юридическое лицо'
    | 'Индивидуальный предприниматель'
    | 'Глава КФХ'
    | 'Адвокат'
    | 'Нотариус';

  isResident?: boolean;
  isCurResident?: boolean;
  isBranch?: boolean;
  isClientVED?: boolean;
  registryCountry?: string;

  name?: string;
  fullName?: string;
  nameEn?: string;
  fullNameEn?: string;

  tin?: string;
  ogrn?: string;
  ogrnip?: string;
  registryNumber?: string;

  registryDate?: Date;
  taxRegistryDate?: Date;

  kpp?: string;
  largeKpp?: string;
  kio?: string;
  okpo?: string;
  okato?: string;
  okogu?: string;
  okfs?: string;
  okopf?: string;
  okved?: string;
  additionalOkved?: string[];
  oktmo?: string;

  professionalLicenseNumber?: string;
  professionalLicenseIssueDate?: Date;

  email?: string[];
  phone?: string[];

  mainAddress?: ClientAddress;
  factAddress?: ClientAddress;
  postAddress?: ClientAddress;

  swiftAddress?: SwiftAddress;
};

const steps = ['Тип клиента', 'Реквизиты', 'Контакты', 'Подтверждение'];

export default function OnboardingFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1ClientType onNext={handleNext} initialData={data} />;
      case 1:
        return <Step2CompanyInfo onNext={handleNext} onBack={handleBack} initialData={data} />;
      case 2:
        return <Step3Contacts onNext={handleNext} onBack={handleBack} initialData={data} />;
      case 3:
        return <Step4Review data={data} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStep()}
    </Box>
  );
}
