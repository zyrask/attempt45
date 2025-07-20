# Overview

This is a full-stack web application built with a modern tech stack featuring a React frontend, Express.js backend, and PostgreSQL database. The application appears to be a personal portfolio website for a developer named "codexyn" who specializes in Discord bot development and Roblox game creation. The site includes a progress tracking system for development projects, particularly focused on an analog horror game called "Broadcast Error."

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme variables
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Uploads**: Multer middleware for image handling
- **Session Management**: Express sessions with PostgreSQL store

### Project Structure
```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared types and schemas
├── migrations/       # Database migrations
└── uploads/          # File upload directory
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Progress Updates Table**: Project progress tracking with status, images, and timestamps
- **Schema Validation**: Zod schemas for type-safe data validation

### API Endpoints
- `GET /api/progress` - Fetch all progress updates
- `POST /api/progress` - Create new progress update with optional image upload
- `PUT /api/progress/:id` - Update existing progress update
- `DELETE /api/progress/:id` - Delete progress update
- `GET /uploads/*` - Serve uploaded images

### Frontend Features
- **Portfolio Sections**: Hero, Projects, About, Contact
- **Progress Tracker**: Real-time project status updates with full CRUD admin capabilities
- **Secret Admin Mode**: Hidden functionality activated by typing secret code "9017598429"
- **Image Upload & Management**: Progress updates support image uploads with drag-and-drop interface
- **Progress Log Management**: Admin can add, edit, and delete progress updates with confirmation dialogs
- **Enhanced Image Display**: Clickable images that open in new tabs, hover effects, and proper sizing
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Authentication & Authorization
- **Basic Structure**: User schema exists but authentication not fully implemented
- **Admin Mode**: Secret code-based admin access for content management
- **Session Storage**: Configured for PostgreSQL session store

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **API Processing**: Express routes handle CRUD operations for progress updates
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **File Handling**: Multer processes image uploads to local storage
5. **Real-time Updates**: Query invalidation provides optimistic UI updates

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **multer**: File upload middleware
- **zod**: Runtime type validation

### Development Tools
- **Vite**: Frontend build tool with HMR
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Backend bundling for production

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with auto-reload
- **Database**: In-memory storage with default progress updates

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild bundles server to `dist/index.js`
- **Static Assets**: Express serves built frontend and uploaded files
- **Environment**: Production mode with optimized builds

### Vercel Deployment
- **Status**: ✅ Ready for deployment
- **Configuration**: `vercel.json` configured for Node.js serverless functions
- **Build Verification**: Build process tested and working (dist/index.js + dist/public/)
- **File Structure**: Matches Vercel expectations with proper routing
- **Documentation**: Complete deployment guide in DEPLOYMENT.md
- **GitHub Ready**: .gitignore excludes Replit-specific files

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Push Command**: Direct schema push for development
- **Connection**: Environment-based DATABASE_URL configuration

The application uses a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack. The architecture supports both development and production environments with appropriate tooling for each phase.