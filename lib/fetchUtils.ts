// SPDX-License-Identifier: LICENSE.md

import { notFound } from "next/navigation";
import { Form, FormType, SpecificFormType } from "./types";

const API_URL = process.env.NEXT_PUBLIC_URL;
export const getAllFormTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/formtypes`);
    const form: FormType[] = await response.json();
    return form;
  } catch (error) {
    return [];
  }
};

export const getFormTypeById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/formtypes/${id}`);
  if (response.status === 404) {
    notFound();
  } else if (!response.ok) {
    throw new Error("Error fetching form type");
  }
  const form: SpecificFormType = await response.json();
  return form;
};

export const getAllForms: () => Promise<Form[]> = async () => {
  const response = await fetch(`${API_URL}/api/forms`);
  if (!response.ok) {
    throw new Error("Error fetching forms");
  }
  const forms: Form[] | Form = await response.json();
  if (Array.isArray(forms)) {
    return forms;
  }
  return [forms];
};

export const getFormById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/forms/${id}`);
  if (response.status === 404) {
    notFound();
  } else if (!response.ok) {
    throw new Error("Error fetching form");
  }
  const forms: Form = await response.json();
  return forms;
};

export const postForm = async (postForm: {}) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postForm),
  };

  const response = await fetch(`${API_URL}/api/forms/`, options);

  return response;
};

export const postSchema = async (postForm: {}) => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postForm),
  };

  const response = await fetch(`${API_URL}/api/formtypes/`, options);

  return response;
};
