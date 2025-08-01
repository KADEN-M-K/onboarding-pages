import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { OnboardingData } from './OnboardingFlow';

interface Props {
  initialData: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function Step2CompanyInfo({ initialData, onNext, onBack }: Props) {
  const [form, setForm] = useState<Partial<OnboardingData>>(initialData);
  const [additionalOkved, setAdditionalOkved] = useState<string[]>(initialData.additionalOkved || []);

  const handleChange = (key: keyof OnboardingData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleOkvedChange = (index: number, value: string) => {
    const updated = [...additionalOkved];
    updated[index] = value;
    setAdditionalOkved(updated);
  };

  const addOkvedField = () => setAdditionalOkved((prev) => [...prev, '']);
  const removeOkvedField = (index: number) =>
    setAdditionalOkved((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    onNext({ ...form, additionalOkved });
  };

  const renderInput = (label: string, key: keyof OnboardingData, half = false, isDate = false) => (
    <Box sx={{ flex: half ? '0 1 48%' : '1 1 100%' }}>
      <TextField
        label={label}
        value={form[key] || ''}
        onChange={(e) => handleChange(key, e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        placeholder={isDate ? 'ДД.ММ.ГГГГ' : undefined}
      />
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Реквизиты организации
      </Typography>

      {/* Наименования */}
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Наименование организации
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {renderInput('Краткое наименование (RU)', 'name', true)}
        {renderInput('Полное наименование (RU)', 'fullName', true)}
        {renderInput('Краткое наименование (EN)', 'nameEn', true)}
        {renderInput('Полное наименование (EN)', 'fullNameEn', true)}
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Сведения о регистрации
      </Typography>
      {/* Реквизиты */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {renderInput('Регистрационный номер в стране регистрации', 'registryNumber', true)}
        {renderInput('КИО', 'kio', true)}
        {renderInput('Дата постановки на учёт', 'taxRegistryDate', true, true)}
        {renderInput('Дата регистрации', 'registryDate', true, true)}
        {renderInput('КПП', 'kpp', true)}
        {renderInput('КПП крупнейшего налогоплательщика', 'largeKpp', true)}
      </Box>

      {/* Классификаторы */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Коды классификации
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {renderInput('ОКПО', 'okpo', true)}
        {renderInput('ОКАТО', 'okato', true)}
        {renderInput('ОКОГУ', 'okogu', true)}
        {renderInput('ОКФС', 'okfs', true)}
        {renderInput('ОКОПФ', 'okopf', true)}
        {renderInput('ОКТМО', 'oktmo', true)}
        {renderInput('Основной ОКВЭД', 'okved', true)}
      </Box>

      {/* Дополнительные ОКВЭД */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Дополнительные ОКВЭД
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {additionalOkved.map((code, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label={`Доп. ОКВЭД #${index + 1}`}
              value={code}
              onChange={(e) => handleOkvedChange(index, e.target.value)}
              fullWidth
            />
            <IconButton onClick={() => removeOkvedField(index)} size="large">
              <Remove />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addOkvedField} startIcon={<Add />} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Добавить ОКВЭД
        </Button>
      </Box>

      {/* Навигация */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Назад
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Далее
        </Button>
      </Box>
    </Box>
  );
}