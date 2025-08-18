# Termsense

### DEMO : https://youtu.be/ChUqDzS5ow0

**Legal Document Intelligence Platform** - AI-powered legal document examination and analysis tool.

## 🏗️ Architecture Overview

Termsense is built as a full stack application with separate frontend and backend components:

### Backend Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **AI Integration:** Google Gemini AI (via @google/generative-ai)
- **Authentication:** bcrypt password hashing
- **File Upload:** Multer middleware
- **Environment:** dotenv for configuration

### Frontend Stack
- **Framework:** React 
- **Build Tool:** React Scripts (Create React App)
- **HTTP Client:** Axios
- **Styling:** Custom CSS with modern gradients and responsive design
- **State Management:** React useState/useEffect hooks

## 📁 Project Structure

```
Termsense/
├── Backend/
│   ├── config/
│   │   └── database_connections.js    # PostgreSQL connection setup
│   ├── controllers/
│   │   ├── documentController.js      # Document upload/fetch logic
│   │   ├── examinationController.js   # AI examination logic
│   │   ├── loginController.js         # User authentication
│   │   └── signupController.js        # User registration
│   ├── routes/
│   │   ├── documents.js               # Document API routes
│   │   ├── examination.js             # Examination API routes
│   │   ├── login.js                   # Login API routes
│   │   └── signup.js                  # Signup API routes
│   ├── services/
│   │   └── userService.js             # User database operations
│   └── index.js                       # Express server entry point
├── Frontend/
│   ├── public/
│   │   ├── index.html                 # HTML template
│   │   └── logo.png                   # App logo
│   └── src/
│       ├── components/
│       │   ├── Dashboard.jsx          # Main app dashboard
│       │   ├── Login.jsx              # Login form
│       │   ├── Signup.jsx             # Registration form
│       │   └── dashboard.css          # Dashboard styles
│       ├── App.jsx                    # Main app component
│       ├── App.css                    # Global app styles
│       ├── index.js                   # React entry point
│       └── index.css                  # Base styles
└── tests/
    └── backend/                       # Backend test files
        ├── auth.test.js               # Authentication tests
        ├── documents.test.js          # Document API tests
        ├── examination.test.js        # Examination tests
        ├── services.test.js           # Service layer tests
        └── test-db.test.js            # Database connection test
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js
- PostgreSQL database
- Google Gemini AI API key

### 1. Clone Repository
```bash
git clone <repository-url>
cd Termsense
```

### 2. Install Dependencies

**Root Project Dependencies:**
```bash
npm install
```

**Frontend Dependencies:**
```bash
cd Frontend
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the project root:
```env
# Database Configuration
PG_USER=your_postgres_username
PG_HOST=localhost
PG_DATABASE=termsense_db
PG_PASSWORD=your_postgres_password
PG_PORT=5432

# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup

Create your PostgreSQL database and required tables:
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    original_text TEXT,
    file_name VARCHAR(255),
    file_type VARCHAR(100),
    file_data BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Running the Application

### Development Mode

**Start Backend Server:**
```bash
cd Backend
node index.js
```
Backend runs on: `http://localhost:3000`

**Start Frontend Development Server:**
```bash
cd Frontend
npm start
```
Frontend runs on: `http://localhost:3001`

### Testing

**Backend Tests:**
```bash
# Test database connection
node tests/backend/test-db.test.js

# Test authentication
node tests/backend/auth.test.js

# Test document operations
node tests/backend/documents.test.js

# Test examination functionality
node tests/backend/examination.test.js

# Test service layer
node tests/backend/services.test.js
```

## 🔑 API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /auth/login` - User login

### Documents
- `POST /user/documents/upload` - Upload document (file or text)
- `GET /user/documents/user/:user_id` - Get user's documents

### Examination
- `POST /user/examination/examine` - Examine document with AI

## 🎯 Features

### Current Features
- ✅ User registration and authentication
- ✅ Document upload (file or direct text input)
- ✅ AI-powered legal document examination
- ✅ Document management and viewing
- ✅ Responsive dashboard interface
- ✅ Real-time examination results with formatted analysis
- ✅ Potential concerns highlighting
- ✅ Modern, professional UI design

### Document Processing
- **Text Documents:** Full text analysis and display
- **File Uploads:** Supports any file type for upload
- **AI Analysis:** Powered by Google Gemini for comprehensive legal examination

## ⚠️ Important Disclaimer

### File Upload & Display Limitations

**Upload Functionality:**
- ✅ **Any file type** can be uploaded to the system
- ✅ Files are stored securely in the PostgreSQL database
- ✅ Metadata (filename, type, size) is preserved

**Display & Examination Limitations:**
- ⚠️ **Text files (.txt):** Full display and examination support
- ⚠️ **PDF files:** Upload supported, but text extraction not implemented
- ⚠️ **Image files:** Upload supported, but content cannot be examined
- ⚠️ **Office documents:** Upload supported, but parsing not implemented

**For Full File Support, Additional Libraries Required:**
- **PDF Processing:** pdf-parse, pdf2pic, or similar libraries
- **Image OCR:** tesseract.js for text extraction from images
- **Office Documents:** mammoth (Word), xlsx (Excel), or similar parsers
- **Advanced Text Extraction:** Apache Tika integration

**Current Workaround:**
For optimal examination results, copy and paste document text directly into the text input field during upload.

## 🔐 Security Features

- Password hashing with bcrypt
- Environment variable protection
- SQL injection prevention with parameterized queries
- File upload size limits (10MB default)
- Input validation and sanitization



