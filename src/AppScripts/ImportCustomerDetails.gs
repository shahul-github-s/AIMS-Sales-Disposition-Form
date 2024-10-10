function doGet(e) {
  Logger.log(JSON.stringify(e)); // Log the event object for debugging

  if (!e.parameter || !e.parameter.mobileNumber) {
    return ContentService.createTextOutput(JSON.stringify({error: "Missing parameter: mobileNumber"})).setMimeType(ContentService.MimeType.JSON);
  }

  var mobileNumber = e.parameter.mobileNumber;

  var ss = SpreadsheetApp.openById('1aZxBI71yzqnsTGIMThAT9FIV-LubCgGA6DkVX54baCo'); // Your Google Sheet ID
  var sheet = ss.getSheetByName('Customer Data'); // Ensure this is the correct sheet name
  var range = sheet.getDataRange();
  var values = range.getValues();

  var response = {};

  for (var i = 1; i < values.length; i++) {
    if (values[i][2] == mobileNumber) {
      response.customerName = values[i][0]; // Column 0
      response.gender = values[i][4]; // Column 4
      response.location = values[i][5]; // Column 5
      response.dateOfBirth = values[i][3]; // Column 3
      response.unsettledAmount = values[i][14]; // Column 12
      response.discountAmount = values[i][13]; // Column 11
      break;
    }
  }

  if (!response.customerName) {
    response.error = "";
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
