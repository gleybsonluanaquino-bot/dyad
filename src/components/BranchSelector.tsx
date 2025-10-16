import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock de dados das filiais
const mockBranches = [
  { id: "01", name: "JANIO DOS BONÉS" },
  { id: "02", name: "FILIAL CENTRO" },
  { id: "03", name: "DEPÓSITO PRINCIPAL" },
];

interface BranchSelectorProps {
  onBranchChange: (branchId: string) => void;
  disabled?: boolean;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ onBranchChange, disabled = false }) => {
  const [selectedBranch, setSelectedBranch] = useState(mockBranches[0].id);

  const handleValueChange = (value: string) => {
    setSelectedBranch(value);
    onBranchChange(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="branch-select">Empresa/Filial</Label>
      <Select 
        value={selectedBranch} 
        onValueChange={handleValueChange} 
        disabled={disabled}
      >
        <SelectTrigger id="branch-select" className="bg-gray-50 dark:bg-gray-700">
          <SelectValue placeholder="Selecione a Filial" />
        </SelectTrigger>
        <SelectContent>
          {mockBranches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              {branch.id} - {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BranchSelector;