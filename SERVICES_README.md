# Santeh Home Services - Service Business Pages

## Overview

This directory contains the service business landing pages for Santeh Home Services, a premium HVAC, Water Treatment, and Electrical service provider across the Greater Toronto Area.

## Pages

### Main Service Page (`services.html`)
The main landing page includes:
- Header with navigation
- Hero section with background image
- Mission statement ("Restoring Accountability in Home Services")
- Core Values (6 values)
- What Sets Santeh Apart (4 differentiators)
- Why Homeowners Trust Santeh (4 trust builders)
- Service Coverage Area (GTA regions)
- Leadership & Technical Team (10 team members)
- Call-to-Action section
- Footer

### Contact Page (`contact.html`)
Service booking form with:
- Contact form (Name, Phone, City, Message)
- Emergency service information
- Service area details

### Shared Components
- `header.html` - Reusable header with navigation
- `footer.html` - Reusable footer with links and contact info

## Technology Stack

- **Tailwind CSS** - Loaded via CDN (`https://cdn.tailwindcss.com`)
- **Responsive Design** - Mobile-first approach
- **Custom Santeh Styles** - Brand-specific button and card styles

## Custom CSS Classes

### Buttons
- `.santeh-btn` - Base button styles
- `.santeh-btn-yellow` - Yellow primary button
- `.santeh-btn-outline` - Outlined secondary button

### Components
- `.santeh-card` - Card component for content sections
- `.santeh-light` - Light background sections

## Contact Information

- **Phone**: +1 431-450-9057
- **Service Area**: Greater Toronto Area
- **Services**: HVAC, Water Treatment, Air Quality, Filtration, Electrical, HEPA Systems

## Service Coverage

- Toronto - Full coverage
- Peel Region (Mississauga & Brampton) - Expanding
- York Region (Vaughan, Markham, Richmond Hill) - Scheduled expansion
- Durham Region (Pickering to Oshawa) - New coverage launching

## Team

Leadership:
- Ann - Chief Executive Officer
- Christian - Chief Operating Officer

Technicians:
- Omar - Service Technician
- Ted - Service Technician
- Liam - Senior HVAC Technician
- Ava - Air Quality Specialist
- Noah - Water Treatment Technician
- Ethan - Electrical Technician

Support:
- Sofia - Service Coordinator
- Mia - Customer Support Specialist

## Deployment

These pages are standalone HTML files that can be:
1. Served directly from a web server
2. Integrated into a PHP application (using the `header.html` and `footer.html` includes)
3. Deployed to GitHub Pages or any static hosting service

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (tested on various screen sizes)
- Tailwind CSS CDN provides automatic cross-browser compatibility
