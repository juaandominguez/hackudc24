import { notFound } from "next/navigation";
import { Form, FormType, SpecificFormType } from "./types";

const API_URL = "https://131b6ea8-87b5-4141-969d-29d7f4ad6b58.mock.pstmn.io";
export const getAllFormTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/formTypes`);
    const form: FormType[] = await response.json();
    return form;
  } catch (error) {
    return [];
  }
};

export const getFormTypeById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/v1/formTypes/${id}`);
  if (response.status === 404) {
    notFound();
  }
  const form: SpecificFormType = await response.json();
  return form;
};

export const getAllForms = async () => {
  const response = await fetch(`${API_URL}/api/v1/forms`);
  const forms: Form[] = await response.json();
  return forms;
};

export const getFormById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/v1/forms/${id}`);
  const forms: Form = await response.json();
  return forms;
};


