/**
 * Google Apps Script for Thảo Mie Graduation Wishes
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete the default code and paste this entire script
 * 4. Click the Deploy button > New deployment
 * 5. Select "Web app" as type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy
 * 9. Copy the Web App URL
 * 10. Paste the URL in src/services/api.js (replace GOOGLE_SCRIPT_URL)
 * 
 * IMPORTANT: After updating this code, you MUST create a NEW deployment
 * (Deploy > New deployment) for changes to take effect!
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If this is the first run, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Wish Message']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
    
    // Add the wish data
    const timestamp = new Date(data.timestamp || new Date());
    const name = data.name || 'Anonymous';
    const message = data.message || '';
    
    sheet.appendRow([
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      name,
      message
    ]);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Wish received successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional - for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Google Apps Script is running',
      message: 'Use POST request to submit wishes'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
