/**
 * Google Apps Script for Graduation Wish Collection
 * NOW WITH PROPER CORS HEADERS FOR PRODUCTION
 */

function doGet(e) {
  return handleCORS();
}

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  return handleCORS();
}

function handleCORS() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

function handleRequest(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = data.name;
    const message = data.message;
    
    if (!name || !message) {
      return createResponse(false, 'Missing required fields');
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Wish Message']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
    
    const timestamp = new Date(data.timestamp || new Date());
    sheet.appendRow([
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      name,
      message
    ]);
    
    return createResponse(true, 'Wish received successfully');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Error: ' + error.toString());
  }
}

function createResponse(success, message) {
  const response = {
    success: success,
    message: message
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
