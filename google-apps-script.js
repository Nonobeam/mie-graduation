/**
 * Google Apps Script for Graduation Wish and At tendance Collection
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
    const type = data.type || 'wish'; // Default to wish for backwards compatibility
    
    if (type === 'attendance') {
      return handleAttendance(data);
    } else {
      return handleWish(data);
    }
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Error: ' + error.toString());
  }
}

function handleAttendance(data) {
  const name = data.name;
  
  if (!name) {
    return createResponse(false, 'Missing name');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Attendance');
  
  // Create Attendance sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Attendance');
    sheet.appendRow(['Timestamp', 'Name']);
    sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  }
  
  const timestamp = new Date(data.timestamp || new Date());
  sheet.appendRow([
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    name
  ]);
  
  return createResponse(true, 'Attendance recorded successfully');
}

function handleWish(data) {
  const name = data.name;
  const message = data.message;
  
  if (!name || !message) {
    return createResponse(false, 'Missing required fields');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Wishes');
  
  // Create Wishes sheet if it doesn't exist (or use active sheet)
  if (!sheet) {
    sheet = ss.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Wish Message']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
  }
  
  const timestamp = new Date(data.timestamp || new Date());
  sheet.appendRow([
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    name,
    message
  ]);
  
  return createResponse(true, 'Wish received successfully');
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
