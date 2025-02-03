import Papa from 'papaparse';
import { RoyaltyData } from '../types/data';

export const fetchCSVData = async (): Promise<RoyaltyData[]> => {
  const response = await fetch(
    'https://docs.google.com/spreadsheets/d/1CWU5MqsrllSzIxb8vn91_vpftimOXAN2hF737HVPATI/export?format=csv'
  );
  const csvText = await response.text();
  
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        const processedData = results.data.map((row: any) => ({
          ...row,
          ROYALTIES: parseFloat(row.ROYALTIES.replace('.', '').replace(',', '.'))
        }));
        resolve(processedData as RoyaltyData[]);
      }
    });
  });
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};