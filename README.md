# ShareServe NGO Website

A comprehensive NGO website built with React, Express.js, MongoDB, and React-Bootstrap featuring a full admin dashboard.

## 🚀 Features

### Frontend (React Vite)
- **Public Website**: Home, About, Programs sections
- **Admin Dashboard**: Complete management interface
  - Dashboard with statistics and charts
  - Program Management (CRUD operations)
  - About page management (mission, vision, values, team)
  - Contact information management
  - Donation tracking and management

### Backend (Express.js)
- RESTful API with full CRUD operations
- MongoDB database integration
- Comprehensive data models for Programs, About, Contact, and Donations

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

The server includes a `.env` file with:
```
MONGO_URI=mongodb://localhost:27017/shareserve
PORT=5000
```

Make sure MongoDB is running on your system.

### 3. Start the Applications

**Start the Backend Server:**
```bash
cd server
npm start
```
The server will run on `http://localhost:5000`

**Start the Frontend Development Server:**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🌐 Access Points

- **Main Website**: `http://localhost:5173`
- **Admin Dashboard**: `http://localhost:5173/admin`
- **API Base URL**: `http://localhost:5000/api`

## 📊 Admin Dashboard Features

### Dashboard
- Real-time statistics
- Project progress tracking
- Budget usage visualization
- Upcoming activities

### Program Management
- Add new programs with details
- Edit existing programs
- Delete programs
- Track beneficiaries and budget

### About Management
- Edit mission and vision
- Manage core values
- Add/edit team members

### Contact Management
- Update contact information
- Manage social media links
- Set working hours

### Donation Management
- View all donations
- Filter by program and status
- Record new donations
- View donation statistics

## 🔧 API Endpoints

### Programs
- `GET /api/programs` - Get all programs
- `POST /api/programs` - Create program
- `GET /api/programs/:id` - Get single program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

### About
- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information

### Contact
- `GET /api/contact` - Get contact information
- `PUT /api/contact` - Update contact information

### Donations
- `GET /api/donations` - Get donations (with pagination)
- `POST /api/donations` - Record donation
- `GET /api/donations/stats/summary` - Get donation statistics

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🎨 Technologies Used

### Frontend
- React 19
- React Router DOM
- React Bootstrap
- Axios
- Vite

### Backend
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## 📝 Notes

- The admin dashboard is accessible via the "Admin" link in the navigation bar
- All forms include validation and error handling
- The dashboard is fully responsive and works on mobile devices
- Data persists in MongoDB database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
