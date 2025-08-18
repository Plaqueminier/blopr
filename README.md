# Blopr - Blood Pressure Tracker

A simple and intuitive web application for tracking blood pressure and heart rate measurements.

## Features

- **Easy Data Entry**: Quick form to input systolic, diastolic, and heart rate values
- **Data Validation**: Ensures entered values are within normal medical ranges
- **Data Persistence**: Automatically saves entries to browser's local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Interface**: Modern, user-friendly design with gradient backgrounds

## Usage

1. Open `index.html` in your web browser
2. Enter your blood pressure readings:
   - Systolic pressure (70-250 mmHg)
   - Diastolic pressure (40-150 mmHg) 
   - Heart rate (40-200 bpm)
3. Click "Add Entry" to save your measurement
4. View all your entries in the table below
5. Delete entries using the "Delete" button if needed

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Storage**: Browser localStorage for data persistence
- **Responsive**: Mobile-first design with CSS Grid and Flexbox
- **Validation**: Client-side input validation with range checks

## File Structure

```
blopr/
├── index.html    # Main application file with HTML, CSS, and JavaScript
├── script.js     # JavaScript functionality (currently inline)
└── README.md     # This file
```

## Browser Compatibility

Works in all modern browsers that support:
- localStorage API
- CSS Grid and Flexbox
- ES6 JavaScript features

## License

Open source project for personal health tracking.