function doGet() {
  const sheetName = "Sales Report"; // Replace with your sheet name
  const sheet = SpreadsheetApp.openById(
    "1XbBbTd5wQwaZ_MFKo7MFE39hkxtNw4XRTzzhTxg2g8s"
  ).getSheetByName(sheetName);

  // Specify cell ranges for "Employees Name" and "Lead Count"
  const employeesRange = sheet.getRange("C223:K223").getValues()[0]; // Row of names
  const leadCountsRange = sheet.getRange("F36:N36").getValues()[0]; // Row of lead counts

  // Transform the data into JSON
  const jsonData = employeesRange
    .map((name, index) => {
      if (name) {
        return {
          "Employees Name": name,
          "Lead Count": leadCountsRange[index] || 0, // Ensure a default value if empty
        };
      }
      return null; // Skip empty names
    })
    .filter((item) => item); // Remove nulls

  // Return JSON as a string (for use in a web app or logging)
  return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(
    ContentService.MimeType.JSON
  );
}
