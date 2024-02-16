import { FormType, SpecificFormType } from "./types";

const API_URL = "https://131b6ea8-87b5-4141-969d-29d7f4ad6b58.mock.pstmn.io";
export const getAllForms = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/formTypes`);
    const form: FormType[] = await response.json();
    return form;
  } catch (error) {
    return [];
  }
};

export const getFormById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/v1/formTypes/${id}`);
  const form: SpecificFormType = await response.json();
  return form;
};
