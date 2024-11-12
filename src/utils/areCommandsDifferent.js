module.exports = (existingCommand, localCommand) => {
  // Helper function to check if choices differ between existing and local commands
  const areChoicesDifferent = (existingChoices, localChoices) => {
    for (const localChoice of localChoices) {
      // Look for the corresponding choice in existing choices
      const existingChoice = existingChoices?.find(
        (choice) => choice.name === localChoice.name
      );

      // If the choice doesn't exist or has a different value, return true
      if (!existingChoice || localChoice.value !== existingChoice.value) {
        return true;
      }
    }
    // Return false if no differences were found
    return false;
  };

  // Helper function to check if options differ between existing and local commands
  const areOptionsDifferent = (existingOptions, localOptions) => {
    for (const localOption of localOptions) {
      // Find corresponding option in the existing options
      const existingOption = existingOptions?.find(
        (option) => option.name === localOption.name
      );

      // Return true if the option doesn't exist in existing options
      if (!existingOption) {
        return true;
      }

      // Check if any property of the option differs, or if choices differ
      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || []
        )
      ) {
        return true;
      }
    }
    // Return false if no differences were found in options
    return false;
  };

  // Check if command descriptions or options differ, using helper functions
  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true; // Return true if there are any differences
  }

  return false; // Return false if the commands are the same
};
