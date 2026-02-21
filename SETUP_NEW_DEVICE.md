# Setup Instructions for New Device

This guide will help you set up the development environment for the Property Management System on a new device.

## Prerequisites

Before you begin, ensure you have the following installed on your new device:

1.  **Node.js**: Version 20 or higher is recommended.
2.  **Git**: For cloning the repository.
3.  **Code Editor**: VS Code is recommended.

## Step 1: Clone the Repository

Clone the project from GitHub to your new device:

```bash
git clone <repository-url>
cd "Property Website"
```

## Step 2: Set Up Environment Variables

The project consists of two applications: `admin-panel` and `public-website`. Both require `.env` files.

### Public Website
1.  Navigate to the `public-website` directory.
2.  Create a `.env` file with the following content:
    ```env
    DATABASE_URL="file:./dev.db"
    ```

### Admin Panel
1.  Navigate to the `admin-panel` directory.
2.  Create a `.env` file with the following content:
    ```env
    # Note: Use the absolute path to the dev.db file in public-website
    DATABASE_URL="file:/absolute/path/to/Property Website/public-website/prisma/dev.db"
    
    # NextAuth configuration
    NEXTAUTH_SECRET="ceylon-roots-super-secret-key-2024"
    NEXTAUTH_URL="http://localhost:5000"
    
    # Admin credentials
    ADMIN_USERNAME="admin123"
    ADMIN_PASSWORD="admin123"
    ```

## Step 3: Install Dependencies

You need to install dependencies for both applications.

### Public Website
```bash
cd public-website
npm install
```

### Admin Panel
```bash
cd ../admin-panel
npm install
```

## Step 4: Database Setup

The project uses SQLite and Prisma.

### Generate Prisma Client
Run this in **both** `public-website` and `admin-panel` directories:
```bash
npx prisma generate
```

### Apply Migrations (if necessary)
If you're setting up a fresh database, run this in the `public-website` directory:
```bash
npx prisma migrate dev --name init
```

### Seed Admin User (Admin Panel)
To set up the initial admin account, run this in the `admin-panel` directory:
```bash
npm run seed
```

## Step 5: Start Development Servers

### Public Website (Port 4000)
```bash
cd public-website
npm run dev
```

### Admin Panel (Port 5000)
```bash
cd admin-panel
npm run dev
```

## Troubleshooting

-   **Database Access**: Ensure the `DATABASE_URL` in `admin-panel/.env` correctly points to the `dev.db` file located in `public-website/prisma/dev.db`.
-   **Missing Files**: If you encounter missing files, ensure you've performed a clean `git clone` or run `git restore .`.
-   **Port Conflicts**: Ensure ports 4000 and 5000 are available on your device.
