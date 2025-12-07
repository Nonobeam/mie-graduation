/**
 * Google Apps Script for Graduation Wish and Attendance Collection
 * Uses form submission - NO CORS needed!
 */

// Test endpoint - visit the URL to see if deployment works
function doGet(e) {
  return ContentService.createTextOutput(
    'Google Apps Script is working! Use POST to submit data.'
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    Logger.log('doPost called');
    Logger.log('Event: ' + JSON.stringify(e));
    
    // Safety check
    if (!e) {
      Logger.log('ERROR: Event object is undefined');
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'No event data' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Form data comes in e.parameter
    const data = e.parameter || {};
    Logger.log('Parameter data: ' + JSON.stringify(data));
    
    // Check if we have any data
    if (Object.keys(data).length === 0) {
      Logger.log('WARNING: No parameter data received');
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'No data received' })
      ).setMimeType(ContentService.MimeType.JSON);
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
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
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
  return ContentService
    .createTextOutput(JSON.stringify({ success: success, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
