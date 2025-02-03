import Papa from 'papaparse';
import { RoyaltyData } from '../types/data';
import { toast } from "@/components/ui/use-toast";

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
      throw new Error(`Erro HTTP! status: ${response.status}`);
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
          toast({
            title: "Sucesso!",
            description: "Dados carregados com sucesso.",
          });
          resolve(processedData as RoyaltyData[]);
        },
        error: (error) => {
          toast({
            variant: "destructive",
            title: "Erro!",
            description: "Erro ao processar o arquivo CSV: " + error.message,
          });
          throw error;
        }
      });
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: "Erro ao buscar dados: " + (error as Error).message,
    });
    throw error;
  }
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};