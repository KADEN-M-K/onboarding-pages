import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { OnboardingData } from './OnboardingFlow';

type AddressKey = 'mainAddress' | 'factAddress' | 'postAddress';

interface Props {
  initialData: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function Step3Contacts({ initialData, onNext, onBack }: Props) {
  const [phones, setPhones] = useState<string[]>(
    initialData.phone ? (Array.isArray(initialData.phone) ? initialData.phone : [initialData.phone]) : ['']
  );
  const [emails, setEmails] = useState<string[]>(
    initialData.email ? (Array.isArray(initialData.email) ? initialData.email : [initialData.email]) : ['']
  );

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
      phone: phones,
      email: emails,
      ...addresses
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Контакты и адреса
      </Typography>

      {/* Контакты */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Телефоны
      </Typography>
      {phones.map((phone, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label={`Телефон #${index + 1}`}
            value={phone}
            onChange={(e) => {
              const updated = [...phones];
              updated[index] = e.target.value;
              setPhones(updated);
            }}
            fullWidth
          />
          <IconButton onClick={() => setPhones(phones.filter((_, i) => i !== index))}>
            <Remove />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => setPhones([...phones, ''])} startIcon={<Add />} variant="outlined" sx={{ mb: 3 }}>
        Добавить телефон
      </Button>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Email
      </Typography>
      {emails.map((email, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label={`Email #${index + 1}`}
            value={email}
            onChange={(e) => {
              const updated = [...emails];
              updated[index] = e.target.value;
              setEmails(updated);
            }}
            fullWidth
          />
          <IconButton onClick={() => setEmails(emails.filter((_, i) => i !== index))}>
            <Remove />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => setEmails([...emails, ''])} startIcon={<Add />} variant="outlined" sx={{ mb: 4 }}>
        Добавить email
      </Button>

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