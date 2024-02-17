# FormFlow

![This is an alt text.](/public/foto1.png "Page hero.")

Our API manages dynamic forms, allowing to create and retrieve forms based on predefined types. It is designed to be used in mobile applications that require the creation and management of dynamic forms, such as those used in data collection and surveys.

## Usage
The API is provided as as an OpenAPI 3.0 specification that can be used to generate server and client code in a variety of languages or as a reference for manual implementation or extension.

## API Endpoints

The API contains the following methods:

- GET /api/formTypes: Retrieves available form types.
- GET /api/formTypes/{form_type_id}: Get a detailed form type.
- POST /api/formTypes: Create a new formType/Schema.
- GET /api/forms: Retrieves all created forms, optionally filtered by type.
- POST /api/forms: Creates a new form based on an existing type.
- GET /api/forms/{form_id}: Retrieves a specific form by its ID.
  
## Form model

The proposed form model describes the various fields, groups, and validations that compose a form, providing insights into how data is organized and processed. Understanding the Form Model is essential for developers looking to interact with the API for creating and managing dynamic forms.

### Form schema

- form_type_id: Unique identifier of the form type.
- form_type_name: Name of the form type.
- form_type_description: Description of the form type.
- title_field: Title of the form.
- form_fields: List of fields that compose the form.
- form_groups: List of groups that organize the fields within the form.

### Form field schema

- field_id: Unique identifier of the field.
- field_name: Name of the field.
- field_type: Type of the field (text, number, date, selection, etc.).
- field_order: Order of the field within the form.
- field_required: Indicates if the field is required.
- field_description: Description of the field.
- field_readonly: Indicates if the field is read-only.
- field_default_value: Default value of the field.
- field_group: Identifier of the group the field belongs to.
- field_dependent_on: Defines the dependency of the field on another field.
- field_validations: List of validations applicable to the field. For fields that require options, this field will contain the list of options in the options attribute.

### Field Groups

Optionally, fields can be organized into groups to provide a better user experience and organization. When this happens, the form_groups attribute will contain a list of groups, each with the following attributes:

- group_id: Unique identifier of the group.
- group_name: Name of the group.
- group_description: Description of the group.
- group_order: Order of the group within the form.

Additionally, the field_group attribute of each field will contain the identifier of the group the field belongs to.

### Dependent Fields

Fields can be dependent on other fields, meaning that their visibility or required status is dependent on the value of another field. This is defined by the field_dependent_on attribute, which contains the identifier of the field the current field is dependent on and the value that triggers the dependency:

- field_dependent_on:
  - field_id: Identifier of the field the current field is dependent on.
  - field_value: Value that triggers the dependency.

### Field Validations

- field_validations: List of validations applicable to the field.

### Available Field Types

- text: Allows input of text.
- number: Allows input of numeric values.
- date: Allows selection of a date.
- select: Presents a list of options for selection.
- checkbox: Allows selection of boolean values.

These field types cover a variety of data input and selection needs within the form, providing flexibility and functionality to effectively capture information, but can be extended to include additional types as needed.
