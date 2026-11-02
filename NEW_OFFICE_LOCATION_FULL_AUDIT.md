# Comprehensive Audit & Verification Report: New Office Location & Google Maps Integration

**Project**: SHVM  
**Audit Date**: November 2, 2026  
**Auditor**: Senior Full-Stack Developer & DevOps Engineer  
**Status**: All checks passed (100% Verified)

---

## 1. Single Source of Truth – Official New Office Address

```text
SHIVOM GROUP
Plot No. 41, Sect. A, Zone B,
Near KTM Showroom, Mancheswar,
Bhubaneswar – 751010,
Odisha, India.
```

---

## 2. Complete Project-Wide Search & Audit

An exhaustive scan was conducted across all files, directories, databases, and environment files for all previous address variations, old coordinates, and place IDs:
- Variations searched: `2nd Floor`, `Plot No. 3200/14046`, `3200`, `14046`, `Puri Bypass`, `Puri-By-Pass`, `Rasulgarh`, `cuttack-puri`, `fortune tower`, `ChIJowFJEABLGToRwvUY6dAhZ-g`, `0xe86721d0e918f5c2`, `20.3043945`, `85.8717082`.

### Results in Active Source Code & Content:
- **`0` outdated occurrences found in active application source code.**
- All active application modules (`shivom-frontend`, `admin`, `server`) and active MongoDB records now reference exclusively the new official address.

---

## 3. Files Inspected & Verified

| File Path | Component / Layer | Status | Remarks |
| :--- | :--- | :--- | :--- |
| `shivom-frontend/src/app/contact/page.tsx` | Frontend (Contact Us Page) | **Verified** | Google Maps iframe, Directions link, Address card, Floating card, and JSON-LD schema |
| `shivom-frontend/src/components/layout/Footer.tsx` | Frontend (Global Footer) | **Verified** | Office address lines in Contact Info column |
| `shivom-frontend/src/components/sections/ContactSection.tsx` | Frontend (Home Contact Section) | **Verified** | Corporate Office info card |
| `shivom-frontend/src/app/layout.tsx` | Frontend (Root Layout) | **Verified** | Root Organization/Corporation JSON-LD structured data |
| `shivom-frontend/src/components/layout/Header.tsx` | Frontend (Navigation Header) | **Inspected** | No address rendered; navigation and CTA links only |
| `shivom-frontend/src/app/about/page.tsx` | Frontend (About Us Page) | **Inspected** | Verified; company background and MD message have no legacy address strings |
| `server/src/seed/seedAdmin.js` | Backend (Database Seeder) | **Verified** | Default website configuration seeder updated with new address |
| `server/src/models/Website.js` | Backend (Mongoose Model) | **Inspected** | Defines `address: String` schema attribute |
| `admin/src/utils/resourceConfigs.js` | Admin Panel (Config) | **Inspected** | Defines website resource editable fields (`address: textarea`) |
| `server/.env`, `admin/.env`, `shivom-frontend/.env.local` | Configuration (.env) | **Inspected** | Verified; no address or map credentials hardcoded in env files |

---

## 4. Google Maps Integration Audit & Verification

### Google Maps Embed (`<iframe>`)
- **Previous Embedded Map**: Pinned to the old location in Rasulgarh / Puri Bypass (`0xe86721d0e918f5c2`).
- **Updated Embedded Map**:
  ```html
  <iframe
    src="https://maps.google.com/maps?q=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
    width="100%"
    height="100%"
    style="border:0"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    class="w-full h-full transition-all duration-500"
    title="Shivom Group Location Map Mancheswar Bhubaneswar Odisha"
  />
  ```
- **Verification of Marker & Coordinates**:
  - The query `KTM Showroom Mancheswar Bhubaneswar Odisha 751010` centers on the landmark adjacent to Plot No. 41, Sector A, Zone B in Mancheswar (~`20.32° N, 85.84° E`).
  - No artificial or guessed coordinates were fabricated; the official Google Maps search query is utilized.

### Google Maps "Get Directions" Link (`<a>`)
- **Previous Directions Link**:
  `https://www.google.com/maps/dir/?api=1&destination=Shivom+Group&destination_place_id=ChIJowFJEABLGToRwvUY6dAhZ-g` (Pointing to Rasulgarh).
- **Updated Directions Link**:
  `https://www.google.com/maps/dir/?api=1&destination=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010`
- **Result**: Clicking "Get Directions" opens Google Maps in a new tab directing the visitor directly to the Mancheswar location.

### Container & Styling Preservation
- The map section maintains identical responsive heights (`h-[450px] md:h-[600px] lg:h-[700px]`), border styling (`rounded-2xl shadow-lg border border-gray-100`), and floating card overlay (`absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md`).

---

## 5. Backend & Database Audit

### Database Collection: `websites`
- **Model**: `server/src/models/Website.js`
- **Records Audited & Updated**:
  1. `websiteKey: "group"` (`_id: 6a0b08edf31030c56cb9fe2f`):
     - `address`: `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`
  2. `websiteKey: "solar"` (`_id: 6ae829ba56d2a352aeb54f8b`):
     - `address`: `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`
  3. `websiteKey: "concrete"` (`_id: 69fc6ce652cee15bc7ac5a2d`):
     - `address`: `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`
  4. `websiteKey: "enterprise"` (`_id: 69fc6ce652cee15bc7ac5a2e`):
     - `address`: `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`
- **No Duplicate Records**: All existing records were updated in place; collection count remains unchanged.

### API Responses Verification
1. **Public API (`GET /api/public/group/home`)**:
   - `data.website.address` returns:
     `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`.
2. **Admin API (`GET /api/admin/websites` with JWT Bearer Token)**:
   - All 4 website configurations return the updated office address string.

---

## 6. SEO, Structured Data & Metadata Audit

- **Root Layout JSON-LD (`shivom-frontend/src/app/layout.tsx`)**:
  ```json
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar",
    "addressLocality": "Bhubaneswar",
    "addressRegion": "Odisha",
    "postalCode": "751010",
    "addressCountry": "IN"
  }
  ```
- **Contact Page JSON-LD (`shivom-frontend/src/app/contact/page.tsx`)**:
  ```json
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar",
    "addressLocality": "Bhubaneswar",
    "addressRegion": "Odisha",
    "postalCode": "751010",
    "addressCountry": "IN"
  }
  ```

---

## 7. Multi-Page Live Verification

Automated HTTP verification against the local server (`http://localhost:3000`) confirmed:

| Page Route | HTTP Status | Contains New Address | Contains Old Address | Google Maps Present |
| :--- | :---: | :---: | :---: | :---: |
| `/` (Home) | `200 OK` | **Yes** | **No** | No |
| `/about/` (About Us) | `200 OK` | **Yes** (Footer) | **No** | No |
| `/contact/` (Contact Us) | `200 OK` | **Yes** (Card + Footer) | **No** | **Yes** (Mancheswar) |
| `/projects/` (Projects) | `200 OK` | **Yes** (Footer) | **No** | No |
| `/our-group/solar/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/our-group/concrete/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/our-group/enterprise/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/careers/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/blogs/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/events/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/awards-certifications/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/privacy-policy/` | `200 OK` | **Yes** (Footer) | **No** | No |
| `/terms-conditions/` | `200 OK` | **Yes** (Footer) | **No** | No |

---

## 8. Remaining References in Workspace

The only occurrences of historical numbers like `3200` in the workspace are:
1. `admin/public/docs/screenshots/projects-list.png`: Pre-existing documentation screenshot image.
2. `lh-report-*.json` & `solar-report*.json`: Historical Lighthouse performance test audit reports.
3. `OFFICE_ADDRESS_UPDATE_AUDIT.md` & `NEW_OFFICE_LOCATION_FULL_AUDIT.md`: Audit documentation logs documenting the migration.

**No active source code, components, API responses, or database records contain the old address.**

