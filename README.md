## Disney Character Explorer:
This is a frontend app that allows users to explore Disney characters, search for them, filter by movie or TV show, and manage favorites. The app is built using Lit (web components) and vanilla JavaScript.

## Features:
Search: Search Disney characters by name.
Filter: Filter characters based on their appearance in movies or TV shows.
Favorites: Add characters to your favorites and persist them using localStorage.
Profile View: View detailed information about each character on their individual profile page.

## Tech Stack
- Vanilla JavaScript
- Lit (Web Components)
- HTML5 + CSS3
- LocalStorage
- Python HTTP Server (for development)

## Project Setup:
Ensure you have the following installed:
- Python 3.x (for running the local server)
- A modern web browser (e.g., Chrome, Firefox)

### Installing Python (if not already installed)

#### **Windows**
1. Download from [python.org/downloads](https://www.python.org/downloads/windows/)
2. Check “Add Python to PATH”
3. Click “Install Now”

#### **macOS**
Python 3 usually comes pre-installed. 
To check: python3 --version
if not installed, insytallusing this command: brew install python

## Running the Project Locally
1. Open a terminal and go to the Explorer/src directory of the project: cd path/to/Explorer/src
2. Start the local HTTP server using following command: python3 -m http.server 8000
3. Open your web browser and go to http://localhost:8000/index.html to see the app in action.

## Project Structure
The project structure is organized as follows:
Explorer/
├ src/
│ ├ components/           # Web components (e.g., <character-profile>, <results-grid>)
│ ├ constants/            # Constants like API URLs
│ ├ index.html            # Main HTML file to load the app
│ ├ app.js                # JavaScript to initialize and control app behavior
│ └ styles.css            # CSS for styling the app
└ README.md               # Project documentation