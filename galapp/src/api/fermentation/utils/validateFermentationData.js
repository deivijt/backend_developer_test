const validateFermentationData = (fermentationData) => {
  if (
    new Date(fermentationData.end_date) < new Date(fermentationData.start_date)
  ) {
    return {
      isValid: false,
      message: "Invalid data: end_date must be after start_date",
    };
  }

  if (fermentationData.output > fermentationData.input) {
    return {
      isValid: false,
      message: "Invalid data: output must be less than or equal to input",
    };
  }

  return { isValid: true, message: "" };
};

module.exports = validateFermentationData;
