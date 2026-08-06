# Group CMS Admin Panel and Backend APIs

This project contains only the CMS admin panel and backend APIs for one group website plus three company landing pages: `group`, `solar`, `concrete`, and `enterprise`.

Public website frontends are intentionally not included.

## Project Structure

```txt
server/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    seed/
    utils/
    app.js
    server.js

admin/
  src/
    api/
    components/
    context/
    pages/
    utils/
    App.jsx
    main.jsx
```

## Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_strong_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
UPLOAD_MODE=local
PUBLIC_API_URL=https://apishivom.visital.co.in
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=change_this_password
```

Optional Cloudinary upload mode:

```env
UPLOAD_MODE=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=group-cms
```

Seed the default websites, default super admin, and sample content:

```bash
npm run seed
```

Run the backend:

```bash
npm run dev
```

Backend base URL:

```txt
http://localhost:5000
```

## Admin Setup

```bash
cd admin
npm install
npm run dev
```

Admin panel URL:

```txt
http://localhost:5173
```

Default login comes from `.env`:

```txt
admin@example.com
change_this_password
```

Change these values before production use.

## Backend Commands

```bash
npm install
npm run dev
npm run seed
```

## Admin Commands

```bash
npm install
npm run dev
npm run build
```

## Admin API Routes

Auth:

```txt
POST /api/admin/auth/login
GET  /api/admin/auth/me
```

Dashboard:

```txt
GET /api/admin/dashboard
```

CRUD modules:

```txt
/api/admin/websites
/api/admin/sliders
/api/admin/pages
/api/admin/landing-sections
/api/admin/projects
/api/admin/testimonials
/api/admin/events
/api/admin/awards-certifications
/api/admin/team
/api/admin/blogs
/api/admin/contacts
/api/admin/careers
/api/admin/career-applications
/api/admin/advertisements
/api/admin/client-partners
```

Upload:

```txt
POST /api/admin/upload/single
POST /api/admin/upload/multiple
```

All admin routes except login require:

```txt
Authorization: Bearer <jwt_token>
```

## Public API Examples

Frontend developers can use these read-only APIs:

```txt
GET  http://localhost:5000/api/public/group/home
GET  http://localhost:5000/api/public/group/sliders
GET  http://localhost:5000/api/public/group/pages/about-us
GET  http://localhost:5000/api/public/group/projects
GET  http://localhost:5000/api/public/group/projects/featured
GET  http://localhost:5000/api/public/group/projects/sample-group-project
GET  http://localhost:5000/api/public/group/testimonials
GET  http://localhost:5000/api/public/group/events
GET  http://localhost:5000/api/public/group/awards-certifications
GET  http://localhost:5000/api/public/group/awards-certifications?type=certification
GET  http://localhost:5000/api/public/group/awards-certifications?type=award
GET  http://localhost:5000/api/public/group/awards-certifications/featured
GET  http://localhost:5000/api/public/group/team
GET  http://localhost:5000/api/public/group/blogs
GET  http://localhost:5000/api/public/group/blogs/featured
GET  http://localhost:5000/api/public/group/blogs/welcome-to-the-cms
GET  http://localhost:5000/api/public/group/client-partners
GET  http://localhost:5000/api/public/group/clients
GET  http://localhost:5000/api/public/group/partners
GET  http://localhost:5000/api/public/group/careers
GET  http://localhost:5000/api/public/group/careers/business-development-manager
POST http://localhost:5000/api/public/group/careers/business-development-manager/apply
GET  http://localhost:5000/api/public/group/advertisements
GET  http://localhost:5000/api/public/group/advertisements/active
GET  http://localhost:5000/api/public/group/browser-update
POST http://localhost:5000/api/public/group/contact
```

Career application submit uses `multipart/form-data`:

```txt
applicantName=Applicant Name
email=applicant@example.com
phone=9999999999
coverLetter=Short cover letter
message=Optional message
resume=<PDF/DOC/DOCX file>
```

Company landing page examples:

```txt
GET  http://localhost:5000/api/public/solar/home
GET  http://localhost:5000/api/public/solar/sliders
GET  http://localhost:5000/api/public/solar/landing-sections
GET  http://localhost:5000/api/public/solar/projects
GET  http://localhost:5000/api/public/solar/careers
GET  http://localhost:5000/api/public/solar/advertisements/active
POST http://localhost:5000/api/public/solar/contact

GET  http://localhost:5000/api/public/concrete/home
GET  http://localhost:5000/api/public/enterprise/home
```

## API Response Format

Success:

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Notes

- MongoDB URI is read only from `process.env.MONGO_URI`.
- Local image uploads are served from `/uploads`.
- Public APIs return only active or published data.
- Auth and contact endpoints are rate limited.
- Stack traces are hidden when `NODE_ENV=production`.


## Solar Products & Promotions APIs

Admin Solar Products:
- GET /api/admin/solar-products
- POST /api/admin/solar-products
- GET /api/admin/solar-products/:id
- PUT /api/admin/solar-products/:id
- DELETE /api/admin/solar-products/:id
- PATCH /api/admin/solar-products/:id/status

Admin Solar Promotions:
- GET /api/admin/solar-promotions
- POST /api/admin/solar-promotions
- GET /api/admin/solar-promotions/:id
- PUT /api/admin/solar-promotions/:id
- DELETE /api/admin/solar-promotions/:id
- PATCH /api/admin/solar-promotions/:id/status

Public Solar APIs:
- GET /api/public/solar/products
- GET /api/public/solar/products/featured
- GET /api/public/solar/products/:slug
- GET /api/public/solar/promotions
- GET /api/public/solar/promotions/active

Solar contact enquiry optional fields:
- enquiryType: general, product, scheme
- productId, productTitle
- promotionId, promotionTitle
- sourceSection


## Career Application Review Flow

User website -> Career apply form -> `POST /api/public/:websiteKey/careers/:slug/apply` -> MongoDB `CareerApplication` -> Admin panel review.

Required environment variables:

Backend:
```env
MONGO_URI=
JWT_SECRET=
PORT=
CLIENT_URL=
PUBLIC_WEBSITE_URL=
UPLOAD_MODE=local
```

Public frontend:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Admin frontend:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Public career APIs:
- `GET /api/public/:websiteKey/careers`
- `GET /api/public/:websiteKey/careers/:slug`
- `POST /api/public/:websiteKey/careers/:slug/apply` with multipart/form-data and required `resume` file.
- `POST /api/public/:websiteKey/career-applications` is the production-popup compatibility endpoint. It accepts `fullName`, `experience`, `position`, `careerId`, and `resume`, then stores the application through the same secure career workflow.

Admin career application APIs:
- `GET /api/admin/career-applications`
- `GET /api/admin/career-applications/:id`
- `PATCH /api/admin/career-applications/:id/status`
- `PUT /api/admin/career-applications/:id`
- `GET /api/admin/career-applications/:id/resume/view`
- `GET /api/admin/career-applications/:id/resume/download`
- `DELETE /api/admin/career-applications/:id`

Resume upload rules:
- PDF, DOC, and DOCX only.
- Maximum file size is 5MB.
- Resume files are stored under protected local storage and are not served by the public `/uploads` static route.
- Admin view/download requires JWT authentication.
- Duplicate applications for the same email and same job are blocked for 24 hours.

## Brevo Transactional Email

All automated website email is sent from the verified central sender:

```env
EMAIL_ENABLED=true
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_brevo_smtp_login
SMTP_PASS=your_brevo_smtp_key

MAIL_FROM_NAME=Shivom Group
MAIL_FROM_EMAIL=noreply@shivomgroup.in
MAIL_REPLY_TO=hr@shivomgroup.in

HR_NOTIFICATION_EMAIL=hr@shivomgroup.in
CONTACT_NOTIFICATION_EMAIL=hr@shivomgroup.in
CAREER_NOTIFICATION_EMAIL=hr@shivomgroup.in
ADMIN_NOTIFICATION_EMAIL=hr@shivomgroup.in

MAIL_LOGO_URL=https://shivomgroup.in/logo.png
MAIL_LOGO_PATH=assets/email-logo.png
ADMIN_URL=https://admin.shivomgroup.in
PUBLIC_WEBSITE_URL=https://shivomgroup.in
```

Email workflow:
- Contact and career submission details are sent from `noreply@shivomgroup.in` to `hr@shivomgroup.in`.
- Visitors and candidates receive a branded success acknowledgement from `noreply@shivomgroup.in`.
- Replies to automated acknowledgements are directed to `hr@shivomgroup.in`.
- Career review results and later communication are sent manually by HR. Admin status changes do not trigger automated email.
- The logo is embedded from `assets/email-logo.png`; `MAIL_LOGO_URL` is the fallback.

Authenticate `shivomgroup.in` in Brevo and verify the `noreply@shivomgroup.in` sender. Verify SMTP with:

```bash
npm run email:verify
```

