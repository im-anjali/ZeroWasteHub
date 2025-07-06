# ZeroWasteHub

ZeroWasteHub is a MERN stack platform built to encourage sustainable living by redistributing unused or excess resources—like food, clothes, and essentials—from those who have them (Donors) to those who need them (Requestors). It supports a seamless workflow with authentication, approval, volunteer delivery coordination, and status tracking.

---

## Features

### Role-Based Access
The application includes four types of users:

- **Donor**: Can donate food/clothes/essentials. Donations are first sent to the admin for approval.
- **Admin**: Approves or rejects donations with reasons. Can view and manage all donations.
- **Requestor**: Views only **approved** donations and can request volunteer help for delivery.
- **Volunteer**: Delivers the requested items from donor to requestor and marks the donation as **completed**.

---

## Donation Flow

1. **Donor** submits a donation → Status: `pending`
2. **Admin** reviews the donation:
   - If good → Status: `approved`
   - If not → Status: `rejected` (with rejection reason)
3. **Donor** sees their donations categorized as: **Pending**, **Approved**, and **Rejected**
4. **Requestor** sees only **approved** donations:
   - Can request a **volunteer** for delivery (address info of both parties shared)
   - If no volunteer needed → Marks as **completed** directly
5. **Volunteer** delivers the item → Marks donation as **completed**

---

## Authentication

- **OAuth2.0** for login/signup
- **JWT** for session management and role-based access control

---

## Tech Stack

| Technology   | Description                        |
|--------------|------------------------------------|
| React.js     | Frontend UI with Tailwind CSS      |
| Node.js      | Backend server                     |
| Express.js   | API layer                          |
| MongoDB      | NoSQL database                     |
| Tailwind CSS | Styling library                    |
| JWT + OAuth  | Secure authentication & auth flow  |
| GridFS       | File storage for image uploads     |
---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/im-anjali/ZeroWasteHub.git
cd ZeroWasteHub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder with the following content:

Set up your own Google OAuth2 credentials:

- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Create a **new project** or **select an existing one**.
- **Enable the Google+ API** under **APIs & Services > Library**.
- **Create OAuth2 credentials**:
  - Choose **Web application** and add `http://localhost:5000/auth/google/callback` as an authorized redirect URI.
- **Copy the Client ID** and **Client Secret** into your `.env` file.

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=superstrongrandomsecretkey
MONGO_URI=yourmongourl
PORT=5000
JWT_SECRET=my_key
DB_NAME=test
```

Then run the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder with the following content:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Then start the frontend:

```bash
npm start
```

---

## Folder Structure

```
ZeroWasteHub/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│
└── README.md
```

---

##  Team Members

- Sejal Pathak
- Noopur Karkare
- Anjali Phule

---

## Sustainable Goals

ZeroWasteHub aligns with:

- **SDG 2: Zero Hunger**
- **SDG 12: Responsible Consumption & Production**

---



