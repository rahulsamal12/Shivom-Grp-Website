# Office Address Update & Audit Report

**SHVM Project**  
**Date**: November 2, 2026  
**Status**: Successfully Completed & Verified

---

## 1. Address Summary

### Previous Office Address
```text
SHIVOM GROUP
2nd Floor, Plot No. 3200/14046
PS-Mancheswar, Puri Bypass Road
Rasulgarh, Bhubaneswar – 751010
Odisha, India
```

### New Official Office Address
```text
SHIVOM GROUP
Plot No. 41, Sect. A, Zone B,
Near KTM Showroom, Mancheswar,
Bhubaneswar – 751010,
Odisha, India.
```

---

## 2. Audit Findings & Modified Files

### A. Frontend Application (`shivom-frontend`)

1. **`shivom-frontend/src/app/contact/page.tsx`**:
   - **JSON-LD Schema (`PostalAddress`)**: Updated `streetAddress` to `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar"`, `postalCode` to `"751010"`.
   - **Address Card Component**: Updated displayed multi-line address to match new location.
   - **Floating Map Card**: Updated company location text to `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`.
   - **Google Maps Embed (`iframe`)**: Replaced old embedded map location (which was pinned to Puri Bypass / Rasulgarh) with accurate new location query `https://maps.google.com/maps?q=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010&t=&z=16&ie=UTF8&iwloc=&output=embed`.
   - **Google Maps Directions Link (`<a>`)**: Updated destination link from old place ID to `https://www.google.com/maps/dir/?api=1&destination=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010`.
   - **Accessibility & Title Attributes**: Updated iframe title to `"Shivom Group Location Map Mancheswar Bhubaneswar Odisha"`.

2. **`shivom-frontend/src/components/layout/Footer.tsx`**:
   - **Office Address Block**: Updated displayed address lines inside the Contact column while preserving exact font styling, icons, spacing, and hover animations.

3. **`shivom-frontend/src/components/sections/ContactSection.tsx`**:
   - **Corporate Office Info Block**: Updated address lines under Corporate Office card while strictly preserving the existing layout, typography, colors, and animations.

4. **`shivom-frontend/src/app/layout.tsx`**:
   - **Root JSON-LD Structured Data**: Added `streetAddress: "Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar"` and `postalCode: "751010"` to corporate schema.

---

### B. Backend & Database (`server` & MongoDB)

1. **MongoDB Database (`websites` collection)**:
   - Updated existing `websites` collection documents (`group`, `solar`, `concrete`, `enterprise`) to store the new official address:
     `"Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"`.
   - Verified that no duplicate records were created.
   - Verified that `GET /api/public/group/home` and admin APIs return the new address dynamically.

2. **`server/src/seed/seedAdmin.js`**:
   - Updated default seed document configuration so future database seeding maintains the new address.

---

## 3. Google Maps Integration Update Details

- **Previous Iframe Embed**:
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0620862080766!2d85.8717082!3d20.3043945!...` (Pinned to Rasulgarh / Puri Bypass)
- **New Iframe Embed**:
  `https://maps.google.com/maps?q=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010&t=&z=16&ie=UTF8&iwloc=&output=embed`
- **Previous Directions Link**:
  `https://www.google.com/maps/dir/?api=1&destination=Shivom+Group&destination_place_id=ChIJowFJEABLGToRwvUY6dAhZ-g`
- **New Directions Link**:
  `https://www.google.com/maps/dir/?api=1&destination=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010`
- **Container Styling & Responsiveness**:
  All container dimensions (`h-[450px] md:h-[600px] lg:h-[700px]`), rounded corners (`rounded-2xl`), shadows, and floating overlays are 100% preserved.

---

## 4. UI/UX & Layout Preservation

- **Zero Design Alteration**: All CSS classes, Tailwind utility classes, margins, paddings, typography, font weights, and icon placements were preserved identically.
- **Responsiveness**: Verified both desktop and mobile responsiveness across all sections.

---

## 5. Verification Results

1. **Source Code Audit**: No occurrences of `3200`, `14046`, `Puri Bypass`, `Rasulgarh`, or `fortune tower` remain anywhere in active source files.
2. **Static Export Build**: `npm run build` ran cleanly and rebuilt all static HTML export files with the new address.
3. **Live Web Server Verification**:
   - `GET http://localhost:3000/contact/`: Confirmed rendering `"Plot No. 41"` and `"Near KTM Showroom"`. Old address absent (`false`).
   - `GET http://localhost:3000/`: Confirmed footer and contact sections rendering the new address.
   - `GET http://localhost:5099/api/public/group/home`: Confirmed API serves the new address.

---

## 6. Non-Source Occurrences Note

A search for the number `3200` in the workspace matches:
- `lh-report-home.json`, `lh-report-projects.json`, `lh-report-solar.json`, `solar-report.json`: Historical Lighthouse performance test result reports.
- `admin\public\docs\screenshots\projects-list.png`: Pre-existing documentation screenshot image.
These are binary or historical audit files and do not affect live site content.

