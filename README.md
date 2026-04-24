# Watch Verse ⌚

Watch Verse is a premium, dynamic e-commerce platform dedicated to luxury timepieces. Built with a focus on modern aesthetics, sharp-edged design, and a seamless user experience.

## ✨ Features

- **Dynamic Product Pages**: Unified `product_dynamic.html` template that loads details for over 20+ luxury watches.
- **Advanced Shopping Cart**: 
  - Real-time mini-cart sidebar.
  - Full-page cart management.
  - Coupon code system (Try code: `WATCH20`).
  - Persistent storage using LocalStorage.
- **User Authentication**: Secure Login and Signup functionality integrated with MongoDB.
- **Premium Design**: 
  - Signature "Orangise" theme.
  - Modern sharp-edged UI (no rounded corners).
  - Responsive design for mobile and desktop.
  - Dark/Light mode toggle.
- **Clean Navigation**: Dynamic Login/Logout toggling based on user session.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arslanhussain9/WatchVerse.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/watchverse
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5000` in your browser.

## 📄 License

This project is for demonstration purposes. &copy; 2025 WatchVerse.

---
Developed with ❤️ by [Arslan Hussain](https://github.com/arslanhussain9)
