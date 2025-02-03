import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoyaltyData } from "@/types/data";
import { formatCurrency } from "@/utils/csv";

interface DataTableProps {
  data: RoyaltyData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trimestre</TableHead>
            <TableHead>Artista</TableHead>
            <TableHead>Música</TableHead>
            <TableHead>Plataforma</TableHead>
            <TableHead className="text-right">Royalties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.TRIMESTRE}</TableCell>
              <TableCell>{row.ARTISTA}</TableCell>
              <TableCell>{row.MÚSICA}</TableCell>
              <TableCell>{row.PLATAFORMA}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(row.ROYALTIES)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};