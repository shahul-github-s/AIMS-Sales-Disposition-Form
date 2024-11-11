function generateDailyPasswords() {
  // Open the specific sheet using the provided sheet ID and sheet name
  var sheet = SpreadsheetApp.openById(
    "1-y9Ef_OY6Kn3p5TlYczwktmMTegQdIqEEUavyw_abSk"
  ).getSheetByName("Login Credentials");

  // Get all data in the sheet (employee names and IDs) starting from row 2
  var data = sheet.getRange("A2:B" + sheet.getLastRow()).getValues(); // Get employee names and IDs

  // Loop through all rows and generate a unique 6-digit password for each employee
  for (var i = 0; i < data.length; i++) {
    // Generate a 6-digit random number
    var randomPassword = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number

    // Set the generated password in the corresponding cell in column C (employees' passwords)
    sheet.getRange(i + 2, 3).setValue(randomPassword); // Column C (starting at row 2)
  }
}
