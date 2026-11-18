import React from 'react';
import { HustlePassData } from '../../types';
import { DanfoCard } from './DanfoCard';
import { ReceiptCard } from './ReceiptCard';
import { IdCard } from './IdCard';
import { MidnightCard } from './MidnightCard';

export const ThemeCard: React.FC<{ pass: HustlePassData }> = ({ pass }) => {
  switch (pass.theme) {
    case 'receipt':
      return <ReceiptCard pass={pass} />;
    case 'id':
      return <IdCard pass={pass} />;
    case 'midnight':
      return <MidnightCard pass={pass} />;
    case 'danfo':
    default:
      return <DanfoCard pass={pass} />;
  }
};
