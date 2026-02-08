import { Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Material } from "@/types/material";

interface MaterialsTableProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onDelete: (material: Material) => void;
}

export function MaterialsTable({ materials, onEdit, onDelete }: MaterialsTableProps) {
  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No materials found</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Get started by adding your first raw material to the inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Material Name</TableHead>
            <TableHead className="font-semibold text-right w-32">Stock Qty</TableHead>
            <TableHead className="text-right w-28">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material, index) => (
            <TableRow
              key={material.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <TableCell className="font-medium">{material.name}</TableCell>
              <TableCell className="text-right tabular-nums">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    material.quantity <= 10
                      ? "bg-destructive/10 text-destructive"
                      : material.quantity <= 50
                      ? "bg-warning/10 text-warning"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {material.quantity.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => onEdit(material)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {material.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(material)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {material.name}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
