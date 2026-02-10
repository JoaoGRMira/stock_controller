import { Button } from "@/components/ui/button";
import { Trash2, Package2 } from "lucide-react";
import { ProductRawMaterial } from "@/types/inventory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MaterialListProps {
  associations: ProductRawMaterial[];
  onRemove: (id: number) => void;
}

export function MaterialList({
  associations,
  onRemove,
}: MaterialListProps) {
  if (associations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-12 animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Package2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-sm font-medium">
          No materials associated
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add raw materials using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">
                Raw Material
              </TableHead>
              <TableHead className="font-semibold text-right">
                Required Quantity
              </TableHead>
              <TableHead className="font-semibold text-right">
                Available Stock
              </TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {associations.map((association, index) => (
              <TableRow
                key={association.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="font-medium">
                    {association.rawMaterial.name}
                  </div>
                </TableCell>

                <TableCell className="text-right tabular-nums">
                  {association.requiredQuantity}
                </TableCell>

                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {association.rawMaterial.quantity}
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(association.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-secondary px-5 py-4">
        <div>
          <p className="text-sm text-secondary-foreground/70">
            Total Materials
          </p>
          <p className="text-xs text-secondary-foreground/50">
            {associations.length} material
            {associations.length !== 1 ? "s" : ""} associated
          </p>
        </div>
        <p className="text-2xl font-semibold text-secondary-foreground tabular-nums">
          {associations.length}
        </p>
      </div>
    </div>
  );
}