import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { OnboardingData } from './OnboardingFlow';

interface Props {
  data: OnboardingData;
  onBack: () => void;
  onSubmit?: () => void;
}

const renderRow = (label: string, value?: string | boolean | number) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2">{String(value ?? '—')}</Typography>
  </Box>
);

const renderSection = (title: string, rows: { label: string; value?: any }[]) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" gutterBottom>{title}</Typography>
    <Box>
      {rows.map(({ label, value }) => renderRow(label, value))}
    </Box>
  </Box>
);

export default function Step4Review({ data, onBack, onSubmit }: Props) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Проверка данных
      </Typography>

      {/* Идентификация */}
      {renderSection('Основные сведения', [
        { label: 'Тип клиента', value: data.mdmlegalstatus },
        { label: 'ИНН', value: data.tin },
        { label: 'ОГРН / ОГРНИП', value: data.registryNumber },
        { label: 'Страна регистрации', value: data.registryCountry },
        { label: 'Головная организация / Филиал', value: data.isBranch ? 'Филиал' : 'Головная' },
        { label: 'Налоговый резидент', value: data.isResident ? 'Да' : 'Нет' },
        { label: 'Валютный резидент', value: data.isCurResident ? 'Да' : 'Нет' },
        { label: 'Клиент ВЭД', value: data.isClientVED ? 'Да' : 'Нет' },
      ])}

      {/* Реквизиты */}
      {renderSection('Реквизиты', [
        { label: 'КПП', value: data.kpp },
        { label: 'КПП (крупный налогоплательщик)', value: data.largeKpp },
        { label: 'Код ИФНС (КИО)', value: data.kio },
        { label: 'Дата регистрации', value: data.registryDate?.toLocaleDateString() },
        { label: 'Дата постановки на учёт', value: data.taxRegistryDate?.toLocaleDateString() },
      ])}

      {/* Классификаторы */}
      {renderSection('Коды классификации', [
        { label: 'ОКПО', value: data.okpo },
        { label: 'ОКАТО', value: data.okato },
        { label: 'ОКОГУ', value: data.okogu },
        { label: 'ОКФС', value: data.okfs },
        { label: 'ОКОПФ', value: data.okopf },
        { label: 'ОКТМО', value: data.oktmo },
        { label: 'Основной ОКВЭД', value: data.okved },
      ])}

      {/* Дополнительные ОКВЭД */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Дополнительные ОКВЭД</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(data.additionalOkved ?? []).map((code, i) => (
            <Chip key={i} label={code} variant="outlined" />
          ))}
        </Box>
      </Box>

      {/* Наименование */}
      {renderSection('Наименование организации', [
        { label: 'Краткое наименование (RU)', value: data.name },
        { label: 'Полное наименование (RU)', value: data.fullName },
        { label: 'Краткое наименование (EN)', value: data.nameEn },
        { label: 'Полное наименование (EN)', value: data.fullNameEn },
      ])}

      {/* Контакты */}
      {renderSection('Контактные данные', [
        { label: 'Телефон', value: data.phone },
        { label: 'Email', value: data.email },
      ])}

      {/* Адреса */}
      {['mainAddress', 'factAddress', 'postAddress'].map((key) => {
        const addr = data[key as keyof OnboardingData] as any;
        return (
          <Box key={key} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              {
                key === 'mainAddress' ? 'Юридический адрес' :
                key === 'factAddress' ? 'Фактический адрес' :
                'Почтовый адрес'
              }
            </Typography>
            {addr ? (
              <>
                {renderRow('Страна', addr.country)}
                {renderRow('Регион', addr.region)}
                {renderRow('Город', addr.city)}
                {renderRow('Улица', addr.street)}
                {renderRow('Дом', addr.house)}
                {renderRow('Индекс', addr.postalCode)}
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">—</Typography>
            )}
          </Box>
        );
      })}

      {/* SWIFT */}
      {renderSection('Международный адрес (SWIFT)', [
        { label: 'Наименование клиента', value: data.swiftAddress?.clientName },
        { label: 'Адрес', value: data.swiftAddress?.addressLine },
        { label: 'Город', value: data.swiftAddress?.city },
      ])}

      {/* Навигация */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Назад
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Завершить
        </Button>
      </Box>
    </Box>
  );
}