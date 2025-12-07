# Thảo Mie - Graduation Celebration Website 🎓

A beautiful React web application to celebrate Thảo Mie's graduation, allowing visitors to attend the celebration virtually or send wishes.

## Features

- 🎨 **Beautiful UI**: Warm beige/brown color scheme with smooth animations
- 🎓 **Floating Graduation Hats**: Animated decorative elements throughout the site
- 🍪 **User Persistence**: Cookies and localStorage to remember visitors
- 💌 **Wish Collection**: Send wishes that are saved to Google Sheets
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🔒 **Protected Routes**: Ensures users provide their name before accessing features

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management
- **Google Apps Script** - Backend for storing wishes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A Google account (for Google Sheets integration)

### Installation

1. Clone or navigate to the project directory:
```bash
cd mie-graduation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Google Sheets Setup

To enable wish storage in Google Sheets:

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it "Thảo Mie - Graduation Wishes" (or any name you prefer)

2. **Set up Google Apps Script**
   - In your Google Sheet, go to **Extensions > Apps Script**
   - Delete any default code
   - Copy the code from `google-apps-script.js` file
   - Paste it into the Apps Script editor
   - Click the **Save** icon (💾)

3. **Deploy the Web App**
   - Click **Deploy > New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   - Configure:
     - Description: "Graduation Wishes API"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click **Deploy**
   - **Authorize** the app (you may see a warning - click "Advanced" > "Go to [project]")
   - **Copy the Web App URL** (it will look like: https://script.google.com/macros/...)

4. **Update the Application**
   - Open `src/services/api.js`
   - Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your copied Web App URL
   - Save the file

5. **Test the Integration**
   - Restart your dev server if it's running
   - Submit a test wish through the website
   - Check your Google Sheet - you should see the wish appear!

## Project Structure

```
mie-graduation/
├── public/
│   ├── index.html           # HTML entry point
│   └── hat.png             # Graduation hat image
├── src/
│   ├── components/         # Reusable components
│   │   ├── Button.jsx      # Custom button component
│   │   ├── Button.css
│   │   ├── Input.jsx       # Custom input component
│   │   ├── Input.css
│   │   ├── FloatingHat.jsx # Animated floating hat
│   │   └── FloatingHat.css
│   ├── pages/              # Page components
│   │   ├── WelcomePage.jsx # Initial page with name input
│   │   ├── WelcomePage.css
│   │   ├── MenuPage.jsx    # Main menu with two options
│   │   ├── MenuPage.css
│   │   ├── CelebrationPage.jsx # Thank you/celebration page
│   │   ├── CelebrationPage.css
│   │   ├── WishPage.jsx    # Wish submission page
│   │   └── WishPage.css
│   ├── services/           # Service utilities
│   │   ├── storage.js      # Cookie/localStorage management
│   │   └── api.js          # Google Sheets API integration
│   ├── styles/             # Global styles
│   │   ├── theme.js        # Theme configuration
│   │   └── index.css       # Global CSS with animations
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Application entry point
├── google-apps-script.js   # Script for Google Sheets backend
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## User Flow

1. **Welcome Page** (`/`)
   - User enters their name
   - Name is saved to cookies/localStorage
   - Redirected to Menu page

2. **Menu Page** (`/menu`)
   - Shows personalized greeting with user's name
   - Two options:
     - 🎉 **Tham dự** (Attend) - Go to celebration page
     - 💌 **Gửi lời chúc** (Send Wishes) - Go to wish page

3. **Celebration Page** (`/celebration`)
   - Displays warm congratulatory message
   - Beautiful animations and floating hats
   - Inspirational quote
   - Back button to menu

4. **Wish Page** (`/wish`)
   - **First visit**: Form to write and submit a wish
   - **After submission**: Displays previously sent wish
   - Saves locally and to Google Sheets
   - One wish per user (stored in cookies)

## Color Scheme

The design uses a warm, celebratory color palette:

- **Primary**: Beige/Tan (#D4B896, #C9A66B)
- **Background**: Cream/Off-white (#F5F1E8, #EDE7D9)
- **Accent**: Brown (#8B6F47, #6B5233)
- **Text**: Dark brown (#3D2E1F)

## Available Scripts

### `npm run dev`
Starts the Vite development server at http://localhost:5173

### `npm run build`
Builds the production-ready application to the `dist` folder

### `npm run preview`
Preview the production build locally

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Vite
5. Click Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Other Options

- GitHub Pages
- Firebase Hosting
- Cloudflare Pages

## Customization

### Change Colors
Edit `src/styles/theme.js` and `src/styles/index.css` to customize the color scheme

### Change Text Content
All Vietnamese text is in the respective page components. Edit the JSX files in `src/pages/`

### Adjust Animations
Modify animation speeds in `src/styles/index.css` and component-specific CSS files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a personal project for Thảo Mie's graduation celebration.

## Credits

Created with ❤️ for Thảo Mie's graduation celebration
