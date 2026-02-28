# Bloxtreck Form - Google Sheets Integration Setup

## Overview
This guide will help you set up the integration between your Bloxtreck contact form and Google Sheets using Google Apps Script.

## Step 1: Create/Open Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Either create a new spreadsheet or open an existing one
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
   The ID is the long string between `/d/` and `/edit`

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Replace the default `Code.gs` content with the code from `google-apps-script.js`
4. Update the configuration at the top of the script:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE';
   const SHEET_NAME = 'Form Responses'; // Or whatever you want to name the tab
   ```

## Step 3: Deploy the Web App

1. In Apps Script, click **"Deploy"** → **"New deployment"**
2. Choose type: **"Web app"**
3. Set the following:
   - **Description**: "Bloxtreck Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **"Deploy"**
5. **Copy the Web App URL** - you'll need this for the next step

## Step 4: Update Your Form Script

The Web App URL from step 3 should replace the current URL in your `form-script.js`:
```javascript
const WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

## Step 5: Test the Integration

1. Open `form.html` in your browser
2. Fill out and submit the form
3. Check your Google Spreadsheet - you should see:
   - A new tab called "Form Responses" (if it didn't exist)
   - Column headers automatically created
   - Your form data in a new row

## What Gets Recorded

The spreadsheet will capture these fields:
- **Timestamp** - When the form was submitted
- **Username/Nickname** - Required field
- **Gender/Pronouns** - Optional selection
- **Preferred Contact Method** - Email, Phone, or Both
- **Email Address** - If contact method includes email
- **Phone Number** - If contact method includes phone
- **Location** - Optional address/location
- **Preferred Contact Time** - When they prefer to be contacted
- **Service Rating** - 1-5 star rating
- **Website Rating** - 1-5 star rating
- **Overall Satisfaction** - 1-5 star rating
- **Additional Comments** - Free text feedback
- **Newsletter Subscription** - Yes/No
- **Profile Picture** - File name (actual file not uploaded)

## Troubleshooting

### Form doesn't submit
- Check the browser console for errors
- Verify the Web App URL is correct
- Ensure the Apps Script is deployed and accessible to "Anyone"

### Data not appearing in spreadsheet
- Check the Apps Script logs (View → Logs)
- Verify the SPREADSHEET_ID is correct
- Make sure you have edit permissions on the spreadsheet

### Testing the Apps Script
Run the `testFormSubmission()` function in Apps Script to verify everything works:
1. In Apps Script editor, select `testFormSubmission` from the function dropdown
2. Click the "Run" button
3. Check your spreadsheet for a test row

## Security Notes
- The Web App is set to "Anyone" access to allow form submissions
- No sensitive data should be processed through this form
- Consider adding additional validation in the Apps Script if needed

## File Structure
```
google-sheets-form-integration/
├── form.html              # Your contact form
├── form.css               # Form styling
├── form-script.js         # Client-side JavaScript (updated with your URL)
├── google-apps-script.js  # Server-side code for Google Apps Script
└── SETUP-INSTRUCTIONS.md  # This file
```