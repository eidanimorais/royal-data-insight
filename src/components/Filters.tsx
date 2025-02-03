import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState, RoyaltyData } from "@/types/data";

interface FiltersProps {
  data: RoyaltyData[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const Filters = ({ data, filters, onFilterChange }: FiltersProps) => {
  const trimestres = Array.from(new Set(data.map((item) => item.TRIMESTRE)));
  const artistas = Array.from(new Set(data.map((item) => item.ARTISTA)));
  const plataformas = Array.from(new Set(data.map((item) => item.PLATAFORMA)));

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
        value={filters.trimestre}
        onValueChange={(value) => onFilterChange("trimestre", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o trimestre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos os trimestres</SelectItem>
          {trimestres.map((trimestre) => (
            <SelectItem key={trimestre} value={trimestre}>
              {trimestre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.artista}
        onValueChange={(value) => onFilterChange("artista", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o artista" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos os artistas</SelectItem>
          {artistas.map((artista) => (
            <SelectItem key={artista} value={artista}>
              {artista}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.plataforma}
        onValueChange={(value) => onFilterChange("plataforma", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione a plataforma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas as plataformas</SelectItem>
          {plataformas.map((plataforma) => (
            <SelectItem key={plataforma} value={plataforma}>
              {plataforma}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};