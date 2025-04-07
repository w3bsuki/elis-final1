# Website Cleanup Plan

## Overview
This document outlines our systematic approach to cleaning up the Elis Author portfolio website. We'll identify what components are actively being used, what we need to keep, and what can be safely removed. We'll also plan for migration to the App Router for better performance and features.

## Current Architecture Assessment

### What's Being Rendered
1. **Main Pages**:
   - Home Page (`src/pages/index.tsx`)
   - About Page (`src/pages/about.tsx`)
   - Books Page (`src/pages/books.tsx`)
   - Services Page (`src/pages/services.tsx`)
   - Shop Page (`src/pages/shop/index.tsx`)
   - Checkout Page (`src/pages/checkout.tsx`)
   - Components Demo Page (`src/pages/components.tsx`)

2. **Core Layout Components**:
   - Header (`src/components/layout/Header.tsx`)
     - Desktop Navigation (`src/components/layout/header/DesktopNavigation.tsx`)
     - Mobile Navigation (`src/components/layout/header/MobileNavigation.tsx`)
     - Logo (`src/components/layout/header/Logo.tsx`)
     - Language Switcher (`src/components/layout/header/LanguageSwitcher.tsx`)
     - Shop Button (`src/components/layout/header/ShopButton.tsx`)
     - Social Links (`src/components/layout/header/SocialLinks.tsx`)
   - Footer (`src/components/layout/Footer.tsx`)
   - Cart Drawer (`src/components/ui/cart-drawer.tsx`)

3. **Home Page Section Components**:
   - Hero Container (`src/components/sections/Hero.tsx`)
     - HeroSection (`src/components/sections/HeroSection/index.tsx`)
       - ProfileCard (`src/components/sections/HeroSection/ProfileCard.tsx`)
       - CtaButtons (`src/components/sections/HeroSection/CtaButtons.tsx`)
       - StatisticItem (`src/components/sections/HeroSection/StatisticItem.tsx`)
     - BooksSection (`src/components/sections/BooksSection.tsx`)
     - ServicesSection (`src/components/sections/ServicesSection.tsx`)
     - Testimonials (`src/components/sections/Testimonials.tsx`)
     - Contact (`src/components/sections/Contact.tsx`)
     - FooterInContainer (internal to Hero.tsx)

4. **Active Shared UI Components**:
   - Button (`src/components/ui/button.tsx`)
   - Card (`src/components/ui/card.tsx`)
   - Toaster (`src/components/ui/toaster.tsx`)
   - OptimizedImage (`src/components/ui/OptimizedImage.tsx`)
   - Booking Calendar (`src/components/ui/booking-calendar.tsx`)
   - Cart Drawer (`src/components/ui/cart-drawer.tsx`)
   - Forms-related components (input, select, textarea, radio)
   - Navigation components (dropdown-menu, navigation-menu)
   - Payment-related components (PaymentForm, payment-button)

### What We Need

1. **Core Pages & Structure**:
   - Home page with all its sections
   - About page
   - Books page and single book pages
   - Services page and single service pages
   - Shop functionality
   - Checkout flow
   - Core layout structure (Header, Footer, Navigation)

2. **Critical Functionality**:
   - Language switching
   - Theme toggle
   - Shopping cart
   - Booking system
   - Payment processing
   - Forms & validation

3. **Shared Components**:
   - UI component library (button, card, dialog, etc.)
   - Section containers
   - Error boundaries & handling

### What We're Using

1. **Technology Stack**:
   - Next.js (currently Pages Router, plan to migrate to App Router)
   - React 19
   - TypeScript
   - Tailwind CSS
   - Shadcn UI components
   - Framer Motion for animations
   - Supabase for backend
   - Stripe for payments

2. **External Dependencies**:
   - Radix UI primitives
   - Lucide Icons
   - Various utility libraries (date-fns, embla-carousel, etc.)

## Cleanup Plan

### Phase 1: Remove Unused Files & Components

1. **Unused Section Components**:
   - ✅ AboutAuthor.tsx (already removed)
   - Hero.original-backup.tsx
   - Duplicate timeline components
   - Any other unused section components

2. **Unused UI Components**:
   - Check for UI components that are imported but never used
   - Identify and remove duplicate functionality (e.g., flip-card.tsx vs FlipCard.tsx)

3. **Unused Utility Files**:
   - Review and remove any unused hooks, libs, and utility functions

### Phase 2: Consolidate Duplicate Functionality

1. **Navigation Menu Components**:
   - Review and consolidate navigation implementation for consistency

2. **Card Components**:
   - Merge/standardize multiple card implementations (service-card, product-card, etc.)

3. **Dialog/Modal Components**:
   - Standardize dialog implementations (book-preview, consultation-form, etc.)

### Phase 3: Clean Up Dependency Tree

1. **Import Clean-up**:
   - Remove unused imports in all files
   - Organize imports for consistency

2. **Package.json Audit**:
   - Review dependencies for unused packages
   - Update outdated packages
   - Remove duplicate functionality packages

### Phase 4: Prepare for App Router Migration

1. **Current App Router Status**:
   - Review `src/app` directory and its current implementation
   - Check metadata.tsx implementation

2. **Migration Planning**:
   - Create route structure plan for App Router
   - Plan component adaptations for server/client components

3. **Execution Steps**:
   - Start with metadata and layout components
   - Migrate pages one by one
   - Test thoroughly after each migration

## Execution Process

For each file/component cleanup:

1. Check imports and usage with grep/search tools
2. Verify no critical functionality will be broken
3. Make changes systematically (delete file, clean imports, etc.)
4. Test functionality after each significant change
5. Document changes in progress.md with what was removed/refactored and why
6. Commit changes with clear descriptions

## Migration to App Router Benefits

1. **Performance Improvements**:
   - Server components for reduced client JS
   - Improved data fetching with React Suspense
   - Streaming SSR

2. **Developer Experience**:
   - Simplified routing with directory-based structure
   - Better separation of concerns
   - Improved SEO with built-in metadata API

3. **Future-Proofing**:
   - App Router is the recommended approach in Next.js
   - Better integration with latest React features
   - Better prepared for future Next.js updates

## Testing & Validation Plan

After each cleanup phase:
1. Verify all pages load correctly
2. Test key functionality (shopping, language switching, etc.)
3. Test on different browsers and screen sizes
4. Test navigation flows
5. Test form submissions

## Rollback Plan

In case of issues:
1. Maintain git history of all changes
2. Document dependencies between components before removal
3. Be prepared to revert to previous commit if problems arise 

## Progress Tracking

We'll maintain a detailed record of all cleanup activities in `progress.md` with the following structure:

1. **Date and Component**: Record when the change was made and what component was affected
2. **Type of Change**: Categorize as removal, consolidation, optimization, or migration
3. **Description**: Detailed explanation of what was changed and why
4. **Impact**: Note any performance improvements or code size reductions
5. **Dependencies**: List any components affected by the change
6. **Verification**: Document how the change was tested

This document will serve as both a changelog and reference for the cleanup process, helping us:
- Track overall progress toward our cleanup goals
- Understand the rationale behind past changes
- Identify patterns for further optimization
- Have a record if we need to revert or understand previous decisions 