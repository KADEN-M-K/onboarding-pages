import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button
} from '@mui/material';
import { OnboardingData } from './OnboardingFlow';

type AddressKey = 'mainAddress' | 'factAddress' | 'postAddress';

interface Props {
  initialData: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function Step3Contacts({ initialData, onNext, onBack }: Props) {
  const [phone, setPhone] = useState(initialData.phone || '');
  const [email, setEmail] = useState(initialData.email || '');

  const [addresses, setAddresses] = useState<Partial<OnboardingData>>({
    mainAddress: initialData.mainAddress || {},
    factAddress: initialData.factAddress || {},
    postAddress: initialData.postAddress || {},
    swiftAddress: initialData.swiftAddress || {},
  });

  const handleAddressChange = (
    type: AddressKey,
    field: string,
    value: string
  ) => {
    setAddresses(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const renderAddressBlock = (label: string, type: AddressKey) => {
    const address = addresses[type] || {};
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Страна"
            value={address.country || ''}
            onChange={(e) => handleAddressChange(type, 'country', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
          <TextField
            label="Регион"
            value={address.region || ''}
            onChange={(e) => handleAddressChange(type, 'region', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
          <TextField
            label="Город"
            value={address.city || ''}
            onChange={(e) => handleAddressChange(type, 'city', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
          <TextField
            label="Улица"
            value={address.street || ''}
            onChange={(e) => handleAddressChange(type, 'street', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
          <TextField
            label="Дом"
            value={address.building || ''}
            onChange={(e) => handleAddressChange(type, 'house', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
          <TextField
            label="Индекс"
            value={address.postalCode || ''}
            onChange={(e) => handleAddressChange(type, 'postalCode', e.target.value)}
            fullWidth
            sx={{ flex: '0 1 48%' }}
          />
        </Box>
      </Box>
    );
  };

  const renderSwiftAddressBlock = () => {
    const swift = addresses.swiftAddress || {};
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Международный адрес (SWIFT)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Наименование клиента"
            value={swift.clientName || ''}
            onChange={(e) =>
              setAddresses((prev) => ({
                ...prev,
                swiftAddress: {
                  ...prev.swiftAddress,
                  clientName: e.target.value,
                },
              }))
            }
            fullWidth
          />
          <TextField
            label="Адрес"
            value={swift.addressLine || ''}
            onChange={(e) =>
              setAddresses((prev) => ({
                ...prev,
                swiftAddress: {
                  ...prev.swiftAddress,
                  address: e.target.value,
                },
              }))
            }
            fullWidth
          />
          <TextField
            label="Город"
            value={swift.city || ''}
            onChange={(e) =>
              setAddresses((prev) => ({
                ...prev,
                swiftAddress: {
                  ...prev.swiftAddress,
                  city: e.target.value,
                },
              }))
            }
            fullWidth
          />
        </Box>
      </Box>
    );
  };

  const handleSubmit = () => {
    onNext({
      phone,
      email,
      ...addresses
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Контакты и адреса
      </Typography>

      {/* Контакты */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <TextField
          label="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ flex: '0 1 48%' }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ flex: '0 1 48%' }}
        />
      </Box>

      {/* Адреса */}
      {renderAddressBlock('Юридический адрес', 'mainAddress')}
      {renderAddressBlock('Фактический адрес', 'factAddress')}
      {renderAddressBlock('Почтовый адрес', 'postAddress')}
      {renderSwiftAddressBlock()}

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