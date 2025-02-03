import Papa from 'papaparse';
import { RoyaltyData } from '../types/data';

export const fetchCSVData = async (): Promise<RoyaltyData[]> => {
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1CWU5MqsrllSzIxb8vn91_vpftimOXAN2hF737HVPATI/export?format=csv';
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  
  try {
    const response = await fetch(corsProxyUrl + googleSheetsUrl, {
      headers: {
        'Origin': window.location.origin
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
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
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};