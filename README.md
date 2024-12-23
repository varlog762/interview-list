# Interview List

**Interview List** is a personal interview manager application. It helps users track their interviews, manage interview details, and visualize statistics. This project is built using **Quasar Framework** (for the front-end) and **Firebase** (for the back-end).

## Features

The application consists of three main tabs:

1. **Interviews**

   - Displays a list of all interviews in a tabular format.
   - Provides options to view, edit, or delete interviews.
   - Supports sorting by key columns (Company Name, HR's Name, Salary Range, Status).
   - Allows filtering by company name and interview status.
   - If the list is empty, users are prompted to add their first interview.

2. **Add Interview**

   - A form for creating a new interview with the following fields:
     - **Company Name** (required)
     - **Job Posting Link** (required)
     - **HR's Name** (required)
     - HR contact details (Telegram, WhatsApp, and Phone Number)
     - Salary Range (Minimum and Maximum)
   - Includes validation for required fields.

3. **Statistics**
   - Displays a pie chart that categorizes interviews by their status (e.g., "Offer," "Scheduled," "Reject," "Pending," "Canceled").

### Interview Management

- Editing an interview allows you to:
  - Update all fields.
  - Add or remove additional stages (e.g., screening, technical round).
  - Change the interview status (default is "In Progress").

---

## Installation

To run the project locally, you need to set up Firebase and configure environment variables.

### Prerequisites

1. **Node.js**
2. **NPM**
3. **Firebase account**:
   - Create a Firebase project.
   - Enable necessary Firebase services (e.g., Firestore, Authentication).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/varlog762/interview-list.git
   cd interview-list
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY="your-firebase-api-key"
   VITE_MESSAGING_SENDER_ID="your-messaging-sender-id"
   VITE_FIREBASE_APP_ID="your-firebase-app-id"
   VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the app at http://localhost:9000.

## Dependencies

- **Frontend:**
  - [Quasar Framework](https://quasar.dev/)
  - [Vue 3](https://vuejs.org/)
  - [Vue Router](https://router.vuejs.org/)
  - [Pinia](https://pinia.vuejs.org/)
  - [Chart.js](https://www.chartjs.org/)
  - [Vue-ChartJS](https://vue-chartjs.org/)
- **Backend:**
  - [Firebase](https://firebase.google.com/)

For a full list of dependencies, refer to the package.json file.

## Available Scripts

- **npm run dev:** Starts the Quasar development server.
- **npm run build:** Builds the app for production.
- **npm run lint:** Runs ESLint for code quality checks.
- **npm run format:** Formats the codebase using Prettier.

## Created by [Gregory Pereverzev](linkedin.com/in/gregory-pereverzev-33848759/)
