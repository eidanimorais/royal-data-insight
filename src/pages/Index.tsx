import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterState, RoyaltyData } from "@/types/data";
import { fetchCSVData, formatCurrency } from "@/utils/csv";
import { Filters } from "@/components/Filters";
import { MetricCard } from "@/components/MetricCard";
import { RoyaltiesChart } from "@/components/RoyaltiesChart";
import { DataTable } from "@/components/DataTable";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    trimestre: "all_trimestres",
    artista: "all_artistas",
    plataforma: "all_plataformas",
  });

  const { data: rawData = [], isLoading } = useQuery({
    queryKey: ["csvData"],
    queryFn: fetchCSVData,
  });

  const filteredData = rawData.filter((item) => {
    return (
      (filters.trimestre === "all_trimestres" || item.TRIMESTRE === filters.trimestre) &&
      (filters.artista === "all_artistas" || item.ARTISTA === filters.artista) &&
      (filters.plataforma === "all_plataformas" || item.PLATAFORMA === filters.plataforma)
    );
  });

  const totalRoyalties = filteredData.reduce(
    (sum, item) => sum + item.ROYALTIES,
    0
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard de Royalties</h1>
          <p className="text-muted-foreground">
            Visualize e analise os dados de royalties musicais
          </p>
        </div>

        <Filters
          data={rawData}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard
            title="Total de Royalties"
            value={formatCurrency(totalRoyalties)}
          />
          <MetricCard
            title="Número de Artistas"
            value={
              Array.from(new Set(filteredData.map((item) => item.ARTISTA)))
                .length.toString()
            }
          />
          <MetricCard
            title="Número de Músicas"
            value={
              Array.from(new Set(filteredData.map((item) => item.MÚSICA)))
                .length.toString()
            }
          />
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Royalties por Artista
          </h2>
          <RoyaltiesChart data={filteredData} />
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Dados Detalhados
          </h2>
          <DataTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Index;