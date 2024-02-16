interface FormField {
  field_id: number;
  field_name: string;
  field_type: "text" | "number" | "date" | "selection" | "checkbox";
  field_order: number;
  field_description: string;
  field_required: boolean;
  field_readonly: boolean;
  field_default_value: string;
  field_group: string;
  field_validations: {};
  field_dependent_on?: {
    field_id: number;
    field_value: string;
  };
}

export interface FormType {
  form_type_id: number;
  form_type_name: string;
}

export interface SpecificFormType {
  form_type_id: number;
  form_type_name: string;
  title_field: {
    field_description: string;
  };
  form_type_description: string;
  form_groups?: [
    {
      group_id: string;
      group_name: string;
      group_order: number;
      group_description: string;
    }
  ];
  form_fields: FormField[];
}

export interface Form {
  form_id: number;
  form_type_id: number;
  title_field: string;
  form_fields: {
    field_id: number;
    field_value: string;
  };
}
