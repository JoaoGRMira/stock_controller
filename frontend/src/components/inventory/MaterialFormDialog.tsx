import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Material, MaterialFormData } from "@/types/material";

const materialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Material name is required")
    .max(100, "Name must be less than 100 characters"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .max(1000000, "Quantity is too large"),
});

interface MaterialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: Material | null;
  onSubmit: (data: MaterialFormData) => void;
}

export function MaterialFormDialog({
  open,
  onOpenChange,
  material,
  onSubmit,
}: MaterialFormDialogProps) {
  const isEditing = Boolean(material);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: material?.name ?? "",
        quantity: material?.quantity ?? 0,
      });
    }
  }, [open, material, reset]);

  const handleFormSubmit = (data: MaterialFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Material" : "Add New Material"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of this raw material."
              : "Enter the details for the new raw material."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Material Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Steel Sheet (1mm)"
              className="h-11"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive animate-fade-in">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Stock Quantity <span className="text-destructive">*</span>
            </Label>
            <Input
              id="quantity"
              type="number"
              min={0}
              placeholder="0"
              className="h-11"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive animate-fade-in">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Save Changes" : "Add Material"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
