# 🎮 Bloxtreck Form to Google Sheets Integration

A complete, ready-to-use system that connects a website form to Google Sheets, automatically adding submitted data as new rows.

## 📦 What's Included

This integration bundle contains everything you need:

### 🧩 1. Google Apps Script (`google-apps-script.gs`)
- Receives form submissions via POST requests
- Automatically appends data to your Google Sheet
- Handles CORS properly
- Includes automatic header setup function
- Returns JSON success/error responses

### 🧾 2. HTML Form (`form.html`)
- Beautiful, modern form design with gradient styling
- Two organized sections:
  - **Personal & Contact Information**: Username, Gender/Pronouns, Preferred Contact Method, Location, Profile Picture Upload
  - **Feedback & Preferences**: Contact Time, Multiple Rating Systems (Service, Website, Overall), Comments, Newsletter Subscription
- Fully responsive design (mobile-friendly)
- Built-in validation
- Success/error message display
- Professional UI with smooth animations

### 💻 3. JavaScript Handler (`form-script.js`)
- Uses `fetch()` API for form submission
- Handles form validation
- Displays success/error messages
- Prevents double submissions
- File upload validation (size & type)
- Auto-resets form after successful submission

### ✅ 4. Setup Instructions (`SETUP_INSTRUCTIONS.md`)
- Comprehensive step-by-step guide
- Multiple integration options
- Troubleshooting section
- Success checklist

## 🚀 Quick Start

### Prerequisites
- A Google account
- A Google Sheet named "Bloxtreck" (or any name you prefer)
- A web server to host the HTML form

### Installation Steps

**1. Set Up Google Sheet**
```
1. Open your "Bloxtreck" Google Sheet
2. Go to Extensions → Apps Script
3. Paste the code from google-apps-script.gs
4. Save the script
5. Run setupHeaders() function to add column headers
```

**2. Deploy the Script**
```
1. Click Deploy → New deployment
2. Select Web app
3. Set "Who has access" to "Anyone"
4. Copy the Web App URL
```

**3. Configure the Form**
```
1. Open form-script.js
2. Replace 'YOUR_WEB_APP_URL_HERE' with your Web App URL
3. Save the file
```

**4. Deploy to Your Website**
```
1. Upload form.html and form-script.js to your server
2. Access the form and test it!
```

For detailed instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

## 📊 Form Fields

The form collects the following data:

| Field | Type | Required | Section |
|-------|------|----------|---------|
| Username/Nickname | Text | ✅ Yes | Personal & Contact |
| Gender/Pronouns | Dropdown | ❌ No | Personal & Contact |
| Preferred Contact Method | Radio | ❌ No | Personal & Contact |
| Address/Location | Text | ❌ No | Personal & Contact |
| Profile Picture | File | ❌ No | Personal & Contact |
| Preferred Contact Time | Dropdown | ❌ No | Feedback & Preferences |
| Service Rating | Radio (1-5 stars) | ❌ No | Feedback & Preferences |
| Website Rating | Radio (1-5 stars) | ❌ No | Feedback & Preferences |
| Overall Satisfaction | Radio (1-5 stars) | ❌ No | Feedback & Preferences |
| Additional Comments | Textarea | ❌ No | Feedback & Preferences |
| Newsletter Subscription | Checkbox | ❌ No | Feedback & Preferences |

Plus automatic timestamp for each submission!

## 🎨 Features

### Form Features
- ✨ Modern, gradient-based design
- 📱 Fully responsive (works on all devices)
- ✅ Client-side validation
- 🎯 Clear visual feedback
- 🔒 File type and size validation
- ⏳ Loading states during submission
- 🎉 Success/error message display
- 🔄 Auto-reset after successful submission

### Backend Features
- 🚀 Fast data processing
- 📊 Automatic timestamping
- 🔐 CORS handling
- 📝 Error logging
- 🎯 JSON response format
- 🛡️ Data validation

## 🔧 Customization

### Adding New Fields

**1. Add to HTML form (`form.html`)**
```html
<div class="form-group">
    <label for="newField">New Field</label>
    <input type="text" id="newField" name="newField">
</div>
```

**2. Update JavaScript (`form-script.js`)**
```javascript
const formData = {
    // ... existing fields
    newField: document.getElementById('newField').value.trim()
};
```

**3. Update Apps Script (`google-apps-script.gs`)**
```javascript
var rowData = [
    // ... existing fields
    data.newField || ''
];
```

**4. Add header to Google Sheet**
- Add column header for the new field

### Styling
All styles are inline in `form.html` for easy customization. Key colors:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Success: `#d4edda`
- Error: `#f8d7da`

## 🔒 Security Notes

- The Web App URL is public (anyone can submit)
- Data is stored in your private Google Sheet
- Consider adding reCAPTCHA for production use
- Monitor submissions for spam
- Keep your Web App URL secure

## 🐛 Troubleshooting

### Common Issues

**Form submits but no data in sheet**
- Verify Web App URL is correct
- Check it ends with `/exec` not `/dev`
- Ensure deployment is set to "Anyone" access

**CORS errors in console**
- This is expected with Google Apps Script
- The form will still work correctly
- Uses `no-cors` mode which is required

**File upload not working**
- Current version only records filename
- Full file upload requires additional setup
- Contact for enhancement if needed

For more troubleshooting, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

## 📁 File Structure

```
google-sheets-form-integration/
├── google-apps-script.gs      # Backend script for Google Sheets
├── form.html                  # Complete HTML form with styling
├── form-script.js             # JavaScript submission handler
├── SETUP_INSTRUCTIONS.md      # Detailed setup guide
└── README.md                  # This file
```

## 🎯 Use Cases

Perfect for:
- Contact forms
- Feedback collection
- Survey responses
- Registration forms
- Lead generation
- Customer feedback
- Event registrations
- Support tickets

## 📈 What Happens When Form is Submitted

1. User fills out and submits form
2. JavaScript validates required fields
3. Data is sent to Google Apps Script via POST
4. Script adds new row to Google Sheet with timestamp
5. Success message displayed to user
6. Form resets for new submission
7. Data is immediately visible in your sheet

## 🔄 Updates & Maintenance

To update the form or script:
1. Modify your files locally
2. Upload changes to web server
3. For Apps Script changes:
   - Open Apps Script editor
   - Make changes
   - Deploy → Manage deployments
   - Create new version
   - URL stays the same!

## 💡 Tips

- Test with dummy data first
- Check Google Sheet after each test
- Monitor Apps Script execution logs
- Back up your Google Sheet regularly
- Consider data retention policies
- Add data validation in Google Sheets

## 📞 Support

For issues or questions:
1. Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
2. Review troubleshooting section
3. Check browser console (F12) for errors
4. Verify Apps Script execution logs

## 📄 License

Free to use and modify for your projects!

---

**Created for: Bloxtreck**  
**Integration Type: Google Sheets Form Submission**  
**Version: 1.0**

Ready to collect data automatically! 🚀
