import { useState } from "react";
import { RentDetails } from "../types/receipt";

const useRentForm = (initialData: RentDetails) => {
  const [formData, setFormData] = useState<RentDetails>(initialData);

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTenantChange = (index: number, value: string) => {
    const newTenants = [...formData.tenants];
    newTenants[index] = { name: value };
    setFormData({ ...formData, tenants: newTenants });
  };

  const addTenant = () => {
    setFormData({
      ...formData,
      tenants: [...formData.tenants, { name: "" }],
    });
  };

  const handleSubmit = (
    e: React.FormEvent,
    onSubmit: (data: RentDetails) => void
  ) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in formData) {
      if (
        formData[key as keyof RentDetails] === "" ||
        formData[key as keyof RentDetails] === null
      ) {
        alert(`Please add a value for ${key}`);
        return;
      }
    }

    onSubmit(formData);
  };

  return {
    formData,
    handleInputChange,
    handleTenantChange,
    addTenant,
    handleSubmit,
  };
};

export default useRentForm;
