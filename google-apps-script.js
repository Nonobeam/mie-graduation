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
  const isAttending = data.isAttending === 'true' || data.isAttending === true;
  
  Logger.log('Processing wish from: ' + name);
  Logger.log('Is attending: ' + isAttending);
  
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
  
  // Check if user already has an attendance record
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  let existingRowIndex = -1;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === name && values[i][2] === 'Tham dự' && !values[i][3]) {
      existingRowIndex = i + 1; // +1 because sheet rows are 1-indexed
      break;
    }
  }
  
  const timestamp = new Date(data.timestamp || new Date());
  const status = isAttending ? 'Tham dự' : 'Không tham dự';
  
  // If attending and has existing attendance record, update it with the message
  if (isAttending && existingRowIndex > 0) {
    sheet.getRange(existingRowIndex, 4).setValue(message); // Update message column
    Logger.log('Updated existing attendance record with wish');
  } else {
    // Otherwise, add a new row
    sheet.appendRow([
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      name,
      status,
      message
    ]);
    Logger.log('Wish saved with status: ' + status);
  }
  
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
