# Task-Manager
Assesment for Full Stack Dev at Invoke


## 📦 Tech Stack

### Backend
- **Laravel 10+** - PHP framework
- **Inertia.js** - Server-side routing for SPAs
- **MySQL** - Database management
- **Eloquent ORM** - Database operations

### Frontend
- **React 18** - UI framework with TypeScript
- **Custom CSS** - Clean, responsive styling
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Development
- **Laragon** - Local development environment
- **Composer** - PHP dependency management
- **npm** - JavaScript package management

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 5.7+
- Laragon (recommended) or XAMPP/WAMP

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd task-manager

2. Install PHP dependencies

composer install


Install JavaScript dependencies

npm install


Copy .env file & configure database

cp .env.example .env


Update your .env with:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=


Generate application key

php artisan key:generate


Run migrations

php artisan migrate


Seed demo data (optional)

php artisan db:seed


Build frontend assets

npm run dev


or for production:

npm run build


Start Laravel server

php artisan serve


App will be available at:
👉 http://localhost:8000
