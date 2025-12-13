/**
 * Google Apps Script for Graduation Wish and Attendance Collection
 * Uses form submission - NO CORS needed!
 */

// Test endpoint - visit the URL to see if deployment works
function doGet(e) {
  const output = ContentService.createTextOutput(
    'Google Apps Script is working! Use POST to submit data.'
  ).setMimeType(ContentService.MimeType.TEXT);
  
  // Add CORS headers
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return output;
}

function doPost(e) {
  try {
    Logger.log('doPost called');
    Logger.log('Event: ' + JSON.stringify(e));
    
    // Safety check
    if (!e) {
      Logger.log('ERROR: Event object is undefined');
      return createResponse(false, 'No event data');
    }
    
    // Form data comes in e.parameter
    const data = e.parameter || {};
    Logger.log('Parameter data: ' + JSON.stringify(data));
    
    // Check if we have any data
    if (Object.keys(data).length === 0) {
      Logger.log('WARNING: No parameter data received');
      return createResponse(false, 'No data received');
    }
    
    const type = data.type || 'wish';
    Logger.log('Processing type: ' + type);
    
    if (type === 'attendance') {
      return handleAttendance(data);
    } else {
      return handleWish(data);
    }
    
  } catch (error) {
    Logger.log('ERROR in doPost: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return createResponse(false, error.toString());
  }
}

function handleAttendance(data) {
  const name = data.name;
  
  if (!name) {
    return createResponse(false, 'Missing name');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Responses');
  
  // Create unified sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    sheet.appendRow(['Timestamp', 'Name', 'Status', 'Message']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  const timestamp = new Date(data.timestamp || new Date());
  sheet.appendRow([
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    name,
    'Tham dự',  // Status column
    ''  // No message for attendance
  ]);
  
  Logger.log('Attendance recorded for: ' + name);
  return createResponse(true, 'Attendance recorded');
}

function handleWish(data) {
  const name = data.name;
  const message = data.message;
  
  Logger.log('Processing wish from: ' + name);
  
  if (!name || !message) {
    return createResponse(false, 'Missing required fields');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Responses');
  
  // Create unified sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    sheet.appendRow(['Timestamp', 'Name', 'Status', 'Message']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  const timestamp = new Date(data.timestamp || new Date());
  sheet.appendRow([
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    name,
    'Không tham dự',  // Status column
    message
  ]);
  
  Logger.log('Wish saved successfully');
  return createResponse(true, 'Wish received');
}

function createResponse(success, message) {
  const output = ContentService
    .createTextOutput(JSON.stringify({ success: success, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers to allow browser to read the response
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return output;
}
