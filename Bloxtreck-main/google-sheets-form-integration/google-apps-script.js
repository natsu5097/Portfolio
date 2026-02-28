/**
 * Google Apps Script for Bloxtreck Form Integration
 * Updated to match your existing spreadsheet format
 */

// Configuration - Update these values
const SPREADSHEET_ID = '17X56KlEbtXoqO07Wmi-cnaucl1s6SaV_D_3e01MiKqk';
const SHEET_NAME = 'Sheet1'; // Using your current sheet name

/**
 * Handle POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Write data to spreadsheet
    writeToSpreadsheet(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to save data: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Write form data to Google Sheets
 */
function writeToSpreadsheet(data) {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Prepare the row data matching YOUR headers exactly
    const rowData = [
      data.username || '',                    // Username/Nickname
      data.gender || '',                      // Gender
      data.email || '',                       // Email
      data.phone || '',                       // Phone no
      data.location || '',                    // Address/Location
      data.profilePicture || 'No file uploaded', // Files
      data.contactTime || '',                 // Preferred Time
      data.serviceRating || '',               // Service Rating
      data.websiteRating || '',               // Website Rating
      data.overallRating || '',               // Overall Satisfaction
      data.comments || '',                    // Additional Comments
      data.newsletter || 'No'                 // Subscription
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data successfully written to spreadsheet');
    
  } catch (error) {
    console.error('Error writing to spreadsheet:', error);
    throw error;
  }
}

/**
 * Test function to verify the script works
 */
function testFormSubmission() {
  const testData = {
    username: 'TestUser123',
    gender: 'They/Them',
    email: 'test@example.com',
    phone: '+1-555-0123',
    location: 'New York, USA',
    contactTime: 'Evening (6 PM - 12 AM)',
    serviceRating: '5',
    websiteRating: '4',
    overallRating: '5',
    comments: 'This is a test submission to verify the integration works correctly.',
    newsletter: 'Yes',
    profilePicture: 'test-image.jpg'
  };
  
  try {
    writeToSpreadsheet(testData);
    console.log('Test submission successful!');
  } catch (error) {
    console.error('Test submission failed:', error);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h2>Bloxtreck Form Integration - Google Apps Script</h2>
    <p>This web app is running successfully!</p>
    <p>Timestamp: ${new Date()}</p>
    <p>Use POST requests to submit form data.</p>
  `);
}