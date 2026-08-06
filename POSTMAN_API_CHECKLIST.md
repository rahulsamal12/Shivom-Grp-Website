# Postman API Checking Links and Methods

Base URL:

```txt
http://localhost:5000
```

Use this first:

```txt
POST http://localhost:5000/api/admin/auth/login
```

Login body:

```json
{
  "email": "admin@example.com",
  "password": "change_this_password"
}
```

Copy `data.token` and use it as:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## Health

| Method | URL | Auth |
|---|---|---|
| GET | `/api/health` | No |

## Admin Auth

| Method | URL | Auth |
|---|---|---|
| POST | `/api/admin/auth/login` | No |
| GET | `/api/admin/auth/me` | Yes |

## Admin Dashboard

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/dashboard` | Yes |

## Admin Websites

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/websites` | Yes |
| POST | `/api/admin/websites` | Yes |
| GET | `/api/admin/websites/:id` | Yes |
| PUT | `/api/admin/websites/:id` | Yes |
| DELETE | `/api/admin/websites/:id` | Yes |

## Admin Sliders

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/sliders` | Yes |
| GET | `/api/admin/sliders?websiteKey=group` | Yes |
| POST | `/api/admin/sliders` | Yes |
| GET | `/api/admin/sliders/:id` | Yes |
| PUT | `/api/admin/sliders/:id` | Yes |
| DELETE | `/api/admin/sliders/:id` | Yes |

## Admin Group Pages

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/pages` | Yes |
| POST | `/api/admin/pages` | Yes |
| GET | `/api/admin/pages/:id` | Yes |
| PUT | `/api/admin/pages/:id` | Yes |
| DELETE | `/api/admin/pages/:id` | Yes |

## Admin Landing Sections

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/landing-sections` | Yes |
| GET | `/api/admin/landing-sections?websiteKey=enterprise` | Yes |
| POST | `/api/admin/landing-sections` | Yes |
| GET | `/api/admin/landing-sections/:id` | Yes |
| PUT | `/api/admin/landing-sections/:id` | Yes |
| DELETE | `/api/admin/landing-sections/:id` | Yes |

## Admin Projects

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/projects` | Yes |
| GET | `/api/admin/projects?websiteKey=group` | Yes |
| POST | `/api/admin/projects` | Yes |
| GET | `/api/admin/projects/:id` | Yes |
| PUT | `/api/admin/projects/:id` | Yes |
| DELETE | `/api/admin/projects/:id` | Yes |

## Admin Testimonials

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/testimonials` | Yes |
| GET | `/api/admin/testimonials?websiteKey=group` | Yes |
| POST | `/api/admin/testimonials` | Yes |
| GET | `/api/admin/testimonials/:id` | Yes |
| PUT | `/api/admin/testimonials/:id` | Yes |
| DELETE | `/api/admin/testimonials/:id` | Yes |

## Admin Events

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/events` | Yes |
| GET | `/api/admin/events?websiteKey=group` | Yes |
| POST | `/api/admin/events` | Yes |
| GET | `/api/admin/events/:id` | Yes |
| PUT | `/api/admin/events/:id` | Yes |
| DELETE | `/api/admin/events/:id` | Yes |

## Admin Awards & Certifications

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/awards-certifications` | Yes |
| GET | `/api/admin/awards-certifications?websiteKey=group` | Yes |
| GET | `/api/admin/awards-certifications?type=award` | Yes |
| GET | `/api/admin/awards-certifications?type=certification` | Yes |
| POST | `/api/admin/awards-certifications` | Yes |
| GET | `/api/admin/awards-certifications/:id` | Yes |
| PUT | `/api/admin/awards-certifications/:id` | Yes |
| DELETE | `/api/admin/awards-certifications/:id` | Yes |

## Admin Team

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/team` | Yes |
| GET | `/api/admin/team?websiteKey=group` | Yes |
| POST | `/api/admin/team` | Yes |
| GET | `/api/admin/team/:id` | Yes |
| PUT | `/api/admin/team/:id` | Yes |
| DELETE | `/api/admin/team/:id` | Yes |

## Admin Blogs / News

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/blogs` | Yes |
| GET | `/api/admin/blogs?websiteKey=group` | Yes |
| POST | `/api/admin/blogs` | Yes |
| GET | `/api/admin/blogs/:id` | Yes |
| PUT | `/api/admin/blogs/:id` | Yes |
| DELETE | `/api/admin/blogs/:id` | Yes |

## Admin Contacts

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/contacts` | Yes |
| GET | `/api/admin/contacts?websiteKey=group` | Yes |
| GET | `/api/admin/contacts/:id` | Yes |
| PUT | `/api/admin/contacts/:id` | Yes |
| DELETE | `/api/admin/contacts/:id` | Yes |

## Admin Careers

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/careers` | Yes |
| GET | `/api/admin/careers?websiteKey=group` | Yes |
| GET | `/api/admin/careers?jobType=full-time` | Yes |
| GET | `/api/admin/careers?status=active` | Yes |
| POST | `/api/admin/careers` | Yes |
| GET | `/api/admin/careers/:id` | Yes |
| PUT | `/api/admin/careers/:id` | Yes |
| DELETE | `/api/admin/careers/:id` | Yes |

## Admin Career Applications

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/career-applications` | Yes |
| GET | `/api/admin/career-applications?websiteKey=group` | Yes |
| GET | `/api/admin/career-applications?status=new` | Yes |
| GET | `/api/admin/career-applications/:id` | Yes |
| PUT | `/api/admin/career-applications/:id` | Yes |
| DELETE | `/api/admin/career-applications/:id` | Yes |

## Admin Advertisements

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/advertisements` | Yes |
| GET | `/api/admin/advertisements?websiteKey=group` | Yes |
| GET | `/api/admin/advertisements?adType=popup` | Yes |
| GET | `/api/admin/advertisements?status=active` | Yes |
| POST | `/api/admin/advertisements` | Yes |
| GET | `/api/admin/advertisements/:id` | Yes |
| PUT | `/api/admin/advertisements/:id` | Yes |
| DELETE | `/api/admin/advertisements/:id` | Yes |

## Admin Clients & Partners

| Method | URL | Auth |
|---|---|---|
| GET | `/api/admin/client-partners` | Yes |
| GET | `/api/admin/client-partners?websiteKey=group` | Yes |
| GET | `/api/admin/client-partners?type=client` | Yes |
| GET | `/api/admin/client-partners?type=partner` | Yes |
| POST | `/api/admin/client-partners` | Yes |
| GET | `/api/admin/client-partners/:id` | Yes |
| PUT | `/api/admin/client-partners/:id` | Yes |
| DELETE | `/api/admin/client-partners/:id` | Yes |

## Admin Uploads

For single upload use form-data key `image` as File.

| Method | URL | Auth |
|---|---|---|
| POST | `/api/admin/upload/single` | Yes |

For multiple upload use form-data key `images` as File, repeated for each file.

| Method | URL | Auth |
|---|---|---|
| POST | `/api/admin/upload/multiple` | Yes |

## Public APIs

Valid website keys:

```txt
group
solar
concrete
enterprise
```

| Method | URL | Auth |
|---|---|---|
| GET | `/api/public/:websiteKey/home` | No |
| GET | `/api/public/:websiteKey/sliders` | No |
| GET | `/api/public/:websiteKey/pages/:slug` | No |
| GET | `/api/public/:websiteKey/landing-sections` | No |
| GET | `/api/public/:websiteKey/projects` | No |
| GET | `/api/public/:websiteKey/projects/featured` | No |
| GET | `/api/public/:websiteKey/projects/:slug` | No |
| GET | `/api/public/:websiteKey/testimonials` | No |
| GET | `/api/public/:websiteKey/events` | No |
| GET | `/api/public/:websiteKey/events/:slug` | No |
| GET | `/api/public/:websiteKey/awards-certifications` | No |
| GET | `/api/public/:websiteKey/awards-certifications?type=award` | No |
| GET | `/api/public/:websiteKey/awards-certifications?type=certification` | No |
| GET | `/api/public/:websiteKey/awards-certifications/featured` | No |
| GET | `/api/public/:websiteKey/awards-certifications/:slug` | No |
| GET | `/api/public/:websiteKey/team` | No |
| GET | `/api/public/:websiteKey/blogs` | No |
| GET | `/api/public/:websiteKey/blogs/featured` | No |
| GET | `/api/public/:websiteKey/blogs/:slug` | No |
| GET | `/api/public/:websiteKey/client-partners` | No |
| GET | `/api/public/:websiteKey/clients` | No |
| GET | `/api/public/:websiteKey/partners` | No |
| GET | `/api/public/:websiteKey/careers` | No |
| GET | `/api/public/:websiteKey/careers/:slug` | No |
| POST | `/api/public/:websiteKey/careers/:slug/apply` | No |
| GET | `/api/public/:websiteKey/advertisements` | No |
| GET | `/api/public/:websiteKey/advertisements/active` | No |
| GET | `/api/public/:websiteKey/browser-update` | No |
| POST | `/api/public/:websiteKey/contact` | No |

Career application uses `multipart/form-data`:

```txt
applicantName=Applicant Name
email=applicant@example.com
phone=+91 00000 00000
coverLetter=Cover letter text
message=Optional message
resume=<PDF/DOC/DOCX file>
```

## Useful Public Examples

```txt
GET  http://localhost:5000/api/public/group/home
GET  http://localhost:5000/api/public/group/pages/about-us
GET  http://localhost:5000/api/public/group/projects
GET  http://localhost:5000/api/public/group/awards-certifications?type=certification
GET  http://localhost:5000/api/public/group/awards-certifications?type=award
GET  http://localhost:5000/api/public/group/client-partners
GET  http://localhost:5000/api/public/group/clients
GET  http://localhost:5000/api/public/group/partners
GET  http://localhost:5000/api/public/group/careers
GET  http://localhost:5000/api/public/group/careers/business-development-manager
POST http://localhost:5000/api/public/group/careers/business-development-manager/apply
GET  http://localhost:5000/api/public/group/advertisements/active
GET  http://localhost:5000/api/public/group/browser-update
GET  http://localhost:5000/api/public/enterprise/home
POST http://localhost:5000/api/public/group/contact
```
