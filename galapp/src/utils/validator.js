const databaseService = require("./databaseService");

/**
 * Validates form fields against a predefined schema.
 *
 * @param {string} formId - Form schema identifier.
 * @param {Object} data - Form data to validate.
 * @returns {Promise<boolean>} True if valid, false otherwise.
 */
async function validateFormFields(formId, data) {
  const forms = await databaseService.get("forms");

  const formSchema = forms[formId];
  if (!formSchema) return false;

  const requiredFields = formSchema.fields.map((field) => field.field);

  if (!requiredFields.length) return false;

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) return false;
  }

  if (Object.keys(data).some((key) => !requiredFields.includes(key))) {
    return false;
  }

  return true;
}

module.exports = {
  validateFormFields,
};
