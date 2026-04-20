# MHMA Project Architecture Analysis

## Project Overview
MHMA (Mountain House Muslim Association) website is a dual-architecture application consisting of:
- **Frontend:** Next.js (React) application - displays programs, events, committees, donations
- **Backend:** WordPress CMS - provides content management system, admin panel, data storage
- **Connection:** REST API with JWT authentication

## Backend Engine: WordPress CMS

### WordPress Installation
- **Local Development:** LocalWP (http://mhma-update.local)
- **Production Target:** Oracle Cloud Free Tier (Ubuntu VM with WordPress)
- **Database:** MySQL (stores all content, user data, ACF fields)
- **PHP Version:** 8.x
- **WordPress Version:** Latest

### WordPress Admin Panel
- **URL:** http://mhma-update.local/wp-admin
- **Purpose:** Content management interface
- **Capabilities:**
  - Create/edit/delete programs
  - Create/edit/delete events
  - Upload images to media library
  - Manage users and permissions
  - Configure plugins and themes

### Key WordPress Plugins

#### 1. JWT Authentication for WP REST API
- **Purpose:** Authenticate API requests between Next.js and WordPress
- **How it works:**
  - Generates JWT tokens when users log in
  - Tokens stored in localStorage (key: `jwt_token`)
  - Tokens sent in Authorization header for protected API calls
  - Tokens validate user permissions for CRUD operations
- **Configuration:**
  - Requires `JWT_AUTH_SECRET_KEY` in wp-config.php
  - CORS enabled for cross-origin requests
- **API Endpoints:**
  - `/wp-json/jwt-auth/v1/token` - Login, receive JWT
  - `/wp-json/jwt-auth/v1/token/validate` - Validate token

#### 2. Advanced Custom Fields (ACF)
- **Purpose:** Add custom fields to WordPress pages/posts
- **Custom Fields for Programs:**
  - `program_title` - Program display title
  - `program_description` - Program description
  - `program_content` - Full content (with HTML)
  - `program_image` - Featured image (media ID or URL)
  - `stat1_label`, `stat1_value` - Custom statistics
  - `stat2_label`, `stat2_value` - Custom statistics
  - `stat3_label`, `stat3_value` - Custom statistics
  - `use_hardcoded_version` - Toggle to use hardcoded data instead of WordPress
- **Storage:** ACF fields stored in WordPress database (wp_postmeta table)
- **Access:** Available via REST API in `acf` property of page/post objects

## REST API Architecture

### Base URL
- **Development:** `http://mhma-update.local/wp-json`
- **Production:** Will be Oracle Cloud public IP + `/wp-json`

### Key API Endpoints

#### Authentication
```
POST /wp-json/jwt-auth/v1/token
Body: { username, password }
Response: { token, user_email, user_nicename, user_display_name }
```

#### Programs (Pages)
```
GET /wp-json/wp/v2/pages?per_page=100
Response: Array of page objects with ACF fields

GET /wp-json/wp/v2/pages?slug=arabic-academy
Response: Single page object with ACF fields

POST /wp-json/wp/v2/pages
Headers: Authorization: Bearer <jwt_token>
Body: { title, content, acf: { ... } }
Response: Created page object

PUT /wp-json/wp/v2/pages/<id>
Headers: Authorization: Bearer <jwt_token>
Body: { title, content, acf: { ... } }
Response: Updated page object

DELETE /wp-json/wp/v2/pages/<id>?force=true
Headers: Authorization: Bearer <jwt_token>
Response: Deleted confirmation
```

#### Events
```
GET /wp-json/wp/v2/events
Response: Array of event objects

POST /wp-json/wp/v2/events
Headers: Authorization: Bearer <jwt_token>
Body: { title, content, acf: { ... } }
Response: Created event object
```

#### Media (Image Uploads)
```
POST /wp-json/wp/v2/media
Headers: Authorization: Bearer <jwt_token>, Content-Type: multipart/form-data
Body: FormData with image file
Response: Media object with source_url
```

## Frontend: Next.js Application

### Technology Stack
- **Framework:** Next.js 14.2.0
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Navigation:** Custom Navigation component
- **State Management:** React useState, useEffect

### Key Pages

#### Programs Page (`/app/programs/page.tsx`)
- **Purpose:** Display all programs
- **Data Flow:**
  1. Fetches all pages from WordPress API
  2. Maps each hardcoded program to its WordPress counterpart by slug
  3. Checks `use_hardcoded_version` ACF field
  4. If `use_hardcoded_version` is true: displays hardcoded data
  5. If false or not set: displays WordPress data (title, image, stats)
  6. Images fetched from WordPress media API if stored as media ID
- **Debug Logging:** Console logs for Arabic Academy to diagnose data fetching

#### Individual Program Page (`/app/programs/[slug]/page.tsx`)
- **Purpose:** Display single program details
- **Data Flow:**
  1. Fetches page by slug from WordPress API
  2. Displays WordPress data (title, content, ACF fields)
  3. Shows edit button if user is logged in (JWT token exists)
  4. Redirects to dashboard edit page for logged-in users

#### Dashboard (`/app/dashboard/page.tsx`)
- **Purpose:** Admin interface for programs and events
- **Features:**
  - List all programs with edit/delete buttons
  - List all events with edit/delete buttons
  - Create new program/event buttons
  - Protected by JWT authentication
- **Data Flow:**
  1. Checks for JWT token in localStorage
  2. Fetches programs and events from WordPress API
  3. Renders lists with action buttons
  4. Delete calls WordPress API with JWT token

#### Dashboard Edit Page (`/app/dashboard/programs/edit/page.tsx`)
- **Purpose:** Edit existing program
- **Data Flow:**
  1. Fetches program by ID from WordPress API
  2. Pre-fills form with WordPress data
  3. On submit: PUT request to WordPress API with JWT token
  4. Updates ACF fields, title, content
  5. Includes `use_hardcoded_version` checkbox

#### Login Page (`/app/login/page.tsx`)
- **Purpose:** Authenticate users
- **Data Flow:**
  1. User enters username/password
  2. POST to `/wp-json/jwt-auth/v1/token`
  3. Receive JWT token
  4. Store token in localStorage (`jwt_token`)
  5. Redirect to dashboard

## Data Flow Diagram

```
User (Browser)
    ↓
Next.js Frontend (localhost:3000)
    ↓
REST API Call (with JWT token if authenticated)
    ↓
WordPress Backend (mhma-update.local or Oracle Cloud)
    ↓
MySQL Database
    ↓
Return Data (JSON)
    ↓
Next.js Frontend (renders data)
    ↓
User (Browser)
```

## Authentication Flow

```
User enters credentials
    ↓
Next.js POST /jwt-auth/v1/token
    ↓
WordPress validates credentials
    ↓
WordPress generates JWT token
    ↓
Next.js stores token in localStorage
    ↓
Subsequent API calls include: Authorization: Bearer <token>
    ↓
WordPress validates token
    ↓
WordPress checks user permissions
    ↓
WordPress returns data or performs action
```

## Image Upload Flow

```
User selects image in Next.js form
    ↓
Next.js creates FormData with image file
    ↓
Next.js POST /wp/v2/media with JWT token
    ↓
WordPress saves image to media library
    ↓
WordPress returns media object with source_url
    ↓
Next.js saves source_url to ACF field via PUT /wp/v2/pages/<id>
    ↓
Image now accessible via WordPress media API
```

## Environment Configuration

### .env.local
```
NEXT_PUBLIC_WORDPRESS_API_URL=http://mhma-update.local/wp-json
```

This single environment variable controls all API calls from Next.js to WordPress. Changing this value switches the entire frontend to a different WordPress backend.

## Current Deployment Status

### Frontend (Next.js)
- **Development:** Running locally on localhost:3000
- **Production:** Can be deployed to Vercel (free), Netlify (free), or any Node.js host
- **Build:** `npm run build` creates optimized production build
- **Start:** `npm start` runs production server

### Backend (WordPress)
- **Development:** LocalWP (http://mhma-update.local)
- **Production Target:** Oracle Cloud Free Tier (Ubuntu VM)
- **Migration:** Export from LocalWP, import to Oracle Cloud WordPress

## Hosting Requirements Analysis

### What We Need
1. **WordPress Backend:** Full WordPress with MySQL, PHP
2. **Public Access:** WordPress must be publicly accessible via REST API
3. **Plugins:** Ability to install JWT and ACF plugins
4. **Database:** MySQL with full access
5. **File Uploads:** Media library for image uploads
6. **API Access:** REST API with CORS enabled
7. **Authentication:** JWT token generation and validation

### What We Don't Need
1. cPanel specifically (can use SSH/web console)
2. FTP specifically (can use SCP/SFTP)
3. phpMyAdmin specifically (can use command line)
4. Unlimited bandwidth (small site, low traffic)

### Hosting Options

#### Option 1: Oracle Cloud Free Tier (RECOMMENDED)
- **Cost:** $0/month (Always Free, permanent)
- **Resources:** 2 AMD VMs, 200GB storage
- **WordPress:** Full support
- **Plugins:** Full support
- **Database:** MySQL included
- **Public Access:** Yes (public IP)
- **Setup Complexity:** Medium (requires SSH, command line)
- **Code Changes:** Change NEXT_PUBLIC_WORDPRESS_API_URL only
- **Limitations:** May reclaim if idle for 7 days (preventable with ping)

#### Option 2: Cheap Paid Hosting
- **IONOS:** $1/month first year
- **Hostinger:** ~$2-3/month long-term
- **WordPress:** Full support with one-click install
- **Plugins:** Full support
- **Database:** MySQL included
- **Public Access:** Yes
- **Setup Complexity:** Low (cPanel, one-click)
- **Code Changes:** Change NEXT_PUBLIC_WORDPRESS_API_URL only

#### Option 3: Vercel for Frontend Only
- **Vercel:** Free for Next.js frontend
- **Backend:** Still need separate WordPress hosting
- **Setup:** Deploy Next.js to Vercel, WordPress to Oracle/paid host
- **Code Changes:** Change NEXT_PUBLIC_WORDPRESS_API_URL to production WordPress URL
- **Benefit:** Frontend hosted globally on CDN, faster loading

#### Option 4: WordPress.com (NOT RECOMMENDED)
- **Free Plan:** Too limited (no custom plugins, no REST API access)
- **Paid Plans:** Expensive, still has limitations
- **Conclusion:** Does not meet requirements

## Migration Strategy

### From LocalWP to Oracle Cloud
1. Create Oracle Cloud account
2. Launch Ubuntu VM
3. Install WordPress + MySQL
4. Install JWT and ACF plugins
5. Configure JWT authentication
6. Export content from LocalWP (All-in-One WP Migration)
7. Import to Oracle Cloud WordPress
8. Test API endpoints
9. Update Next.js .env.local
10. Test Next.js connection
11. Deploy Next.js to Vercel (optional)

### Estimated Time
- Oracle Cloud account: 10 minutes
- VM launch: 5 minutes
- WordPress installation: 30 minutes
- Plugin configuration: 15 minutes
- Content migration: 15 minutes
- Next.js reconfiguration: 5 minutes
- Testing: 15 minutes
- **Total:** ~1.5-2 hours

## Conclusion

The MHMA project uses a headless WordPress architecture where WordPress serves as the backend CMS and data store, while Next.js serves as the frontend presentation layer. The two communicate via REST API with JWT authentication. This architecture allows for:
- Easy content management via WordPress admin
- Modern, fast frontend with Next.js
- Separation of concerns (content vs presentation)
- Scalability (can deploy frontend separately)

Oracle Cloud Free Tier is the best option for hosting the WordPress backend at $0/month, with Vercel being an excellent free option for the Next.js frontend. The only code change required is updating the NEXT_PUBLIC_WORDPRESS_API_URL environment variable.
