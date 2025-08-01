import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from '@mui/material';
import { OnboardingData } from './OnboardingFlow';

interface Props {
  initialData: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

const mdmlegalstatuss = [
  { value: 'Юридическое лицо', label: 'Юридическое лицо' },
  { value: 'Индивидуальный предприниматель', label: 'Индивидуальный предприниматель' },
  { value: 'Глава КФХ', label: 'Глава КФХ' },
  { value: 'Адвокат', label: 'Адвокат' },
  { value: 'Нотариус', label: 'Нотариус' },
] as const;

type Mdmlegalstatus = typeof mdmlegalstatuss[number]['value'];

const countries = [
  'Российская Федерация',
  'США',
  'Германия',
  'Китай',
  'Казахстан',
];

type HierarchicalStatus = 'Головная организация' | 'Филиал';

export default function Step1ClientType({ initialData, onNext }: Props) {
  const [inn, setInn] = useState(initialData.tin || '');
  const [ogrn, setOgrn] = useState(initialData.registryNumber || '');
  const [clientType, setClientType] = useState<Mdmlegalstatus | ''>(initialData.mdmlegalstatus || '');
  const [registryCountry, setRegistryCountry] = useState(initialData.registryCountry || 'Российская Федерация');
  const [isBranch, setIsBranch] = useState<HierarchicalStatus>(initialData.isBranch ? 'Филиал' : 'Головная организация');
  const [isClientVed, setIsClientVed] = useState(initialData.isClientVED || false);
  const [isResident, setIsResident] = useState(initialData.isResident ?? true);
  const [isCurResident, setIsCurResident] = useState(initialData.isCurResident ?? true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const autoSet = () => {
      const startsWith9909 = inn.startsWith('9909');
      const isRussia = registryCountry === 'Российская Федерация';

      if (startsWith9909 || !isRussia) {
        setIsResident(false);
        setIsCurResident(false);
      } else {
        setIsResident(true);
        setIsCurResident(true);
      }
    };

    autoSet();
  }, [inn, registryCountry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inn) {
      setError('ИНН обязателен');
      return;
    }

    if (!/^\d{10,12}$/.test(inn)) {
      setError('ИНН должен содержать 10 или 12 цифр');
      return;
    }

    if (!clientType) {
      setError('Выберите тип клиента');
      return;
    }

    if (!registryCountry) {
      setError('Выберите страну регистрации');
      return;
    }

    if (isResident && !ogrn) {
      setError('ОГРН обязателен для налоговых резидентов');
      return;
    }

    const formData: Partial<OnboardingData> = {
      tin: inn,
      registryNumber: ogrn || undefined,
      mdmlegalstatus: clientType,
      registryCountry,
      isBranch: isBranch === 'Филиал',
      isClientVED: isClientVed,
      isResident,
      isCurResident,
    };

    onNext(formData);
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4} p={3} component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" mb={3}>
        Онбординг корпоративного клиента
      </Typography>

      <TextField
        label="ИНН"
        value={inn}
        onChange={(e) => setInn(e.target.value.replace(/\D/g, ''))}
        required
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 12 }}
      />

      <TextField
        label="ОГРН"
        value={ogrn}
        onChange={(e) => setOgrn(e.target.value.replace(/\D/g, ''))}
        required={isResident}
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 15 }}
        helperText={isResident ? 'Обязательно для налоговых резидентов' : ''}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="client-type-label">Тип клиента</InputLabel>
        <Select
          labelId="client-type-label"
          value={clientType}
          label="Тип клиента"
          onChange={(e) => setClientType(e.target.value as Mdmlegalstatus)}
        >
          {mdmlegalstatuss.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="country-label">Страна регистрации</InputLabel>
        <Select
          labelId="country-label"
          value={registryCountry}
          label="Страна регистрации"
          onChange={(e) => setRegistryCountry(e.target.value)}
        >
          {countries.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="hierarchical-status-label">Иерархический статус</InputLabel>
        <Select
          labelId="hierarchical-status-label"
          value={isBranch}
          label="Иерархический статус"
          onChange={(e) => setIsBranch(e.target.value as HierarchicalStatus)}
        >
          <MenuItem value="Головная организация">Головная организация</MenuItem>
          <MenuItem value="Филиал">Филиал</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={isClientVed}
            onChange={(e) => setIsClientVed(e.target.checked)}
          />
        }
        label="Клиент ВЭД?"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isResident}
            onChange={(e) => setIsResident(e.target.checked)}
          />
        }
        label="Налоговый резидент"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isCurResident}
            onChange={(e) => setIsCurResident(e.target.checked)}
          />
        }
        label="Валютный резидент"
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box mt={3}>
        <Button variant="contained" type="submit" fullWidth>
          Далее
        </Button>
      </Box>
    </Box>
  );
}