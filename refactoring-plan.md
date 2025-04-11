# Navbar Refactoring Plan

This plan outlines the steps to refactor the navigation components (`Header`, `DesktopNavigation`, `MobileNavigation`) following the initial style standardization. The goal is to improve code structure, reduce duplication, and enhance maintainability, as suggested in `navbar-improvement-plan.md`.

## Action Items

1.  **Create Shared `NavItem` Component:**
    *   Analyze the structure of links and buttons in `DesktopNavigation` (using `NavLink` and `<button>`) and `MobileNavigation` (`renderMenuItem` function).
    *   Design a reusable `NavItem` component (e.g., `src/components/layout/header/NavItem.tsx`) that can handle:
        *   Simple links (`<Link>`).
        *   Items triggering actions/dropdowns (`<button>`).
        *   Icon display.
        *   Active state highlighting (using `pathname`).
        *   Standardized styling (based on the classes we just applied).
        *   Props for `href`, `label`, `icon`, `onClick`, `isActive`, etc.
    *   Refactor `DesktopNavigation` and `MobileNavigation` to use this new `NavItem` component, removing the existing `NavLink` component and `renderMenuItem` function.

2.  **Refactor Dropdown Logic (DesktopNavigation):**
    *   Examine the `activeDropdown` state and the rendering logic for the Books and Services dropdowns in `DesktopNavigation.tsx`.
    *   Consider abstracting the dropdown trigger mechanism and the shared dropdown container/styling into a more reusable pattern or component, if feasible, to reduce repetition.

3.  **Consolidate `useSafeLanguage` Hook:**
    *   Review the duplicated `useSafeLanguage` custom hook logic present in `ThemeToggle`, `LanguageSwitcher`, `ShopButton`, `DesktopNavigation`, and `MobileNavigation`.
    *   Move the hook definition to a shared utility location (e.g., `src/hooks/useSafeLanguage.ts` or similar).
    *   Update all components to import and use the hook from the shared location.

4.  **TypeScript Interfaces:**
    *   Review `NavigationProps` and other interfaces used in the navigation components.
    *   Ensure consistent usage and that all necessary props are typed correctly, especially for the new `NavItem` component.

5.  **Final Style Cleanup:**
    *   Perform a final review of all updated navigation components (`Header`, `DesktopNavigation`, `MobileNavigation`, `NavItem`, etc.) to ensure:
        *   No remnant hardcoded colors or non-Tailwind styles remain.
        *   Consistent application of theme variables and utility classes.
        *   Adherence to the standardized button/link styles.

## Implementation Order

The steps will generally be tackled in the order listed above, starting with the `NavItem` creation as it impacts multiple components. 

# Website Refactoring Plan

## Current Issues

1. **Duplicate components in different directories**
   - Multiple hero section implementations
   - Redundant components with similar functionality
   - Unclear import paths

2. **Unused files and components**
   - Legacy components no longer referenced
   - Example/template files
   - Old versions of pages

3. **Inconsistent file organization**
   - Some components in `/components/ui`, others in `/components/sections`
   - Unclear boundaries between layout components and section components

## Cleanup Plan

### Step 1: Identify Core Components in Use

**Active Pages:**
- `/pages/index.tsx` - Main homepage
- `/pages/about.tsx` - About page
- `/pages/blog/index.tsx` and `/pages/blog/[id].tsx` - Blog pages
- `/pages/shop/index.tsx` and `/pages/shop/[id].tsx` - Shop pages 
- `/pages/checkout.tsx` - Checkout page
- `/pages/contact.tsx` - Contact page

**Core Components:**
- `Header` and `Footer` in `/components/layout/`
- `HomePage` in `/components/sections/home/index.tsx`
- Various UI components in `/components/ui/`

### Step 2: Files Removed/Archived

**Files Already Removed:**
- `/pages/index-old.tsx` - Old homepage version
- `/components/sections/ExampleHero.tsx` - Example template

**Files Already Archived:**
- `/components/sections/home/home-hero.tsx` → `/components/sections/home/archived/home-hero.tsx`
- `/components/sections/home/home-page.tsx` → `/components/sections/home/archived/home-page.tsx`
- `/components/HeroSection/*` → `/components/archived/HeroSection/*`
- `/components/sections/HeroSection/*` → `/components/archived/HeroSectionOld/*`
- `/components/sections/Hero.tsx` → `/components/archived/Hero.tsx`

### Step 3: Next Components to Review

The following components should be analyzed next:

1. **UI Components Review**
   - Check for duplicate UI components in different directories
   - Ensure consistent naming and location

2. **Consolidation of Remaining Hero Components**
   - Verify that the active hero implementation is clean and optimized
   - Remove any unused dependencies

3. **Further File Cleanup**
   - Remove or archive any additional unused files
   - Check for unused service files, data models, etc.

### Step 4: Implementation Steps for Next Phase

1. **Review import paths**
   - Ensure all import paths are consistent and pointing to the right components
   - No components should be importing from archived directories

2. **Test thoroughly**
   - Test after each significant change to ensure the website still functions properly
   - Focus on the homepage, navigation, and key functionality

3. **Document the final structure**
   - Update documentation to reflect the clean directory structure
   - Provide clear guidelines for future development

### Impact Assessment

**Completed Low Risk Changes:**
- ✅ Removed old index page
- ✅ Removed example template
- ✅ Archived duplicate hero implementations

**Next Medium Risk Changes:**
- 🔄 Check for component import errors in the main application files
- 🔄 Update any remaining references to the archived components

### Testing Strategy

The site should be tested after each set of changes to ensure nothing breaks. Key areas to test:

1. **Homepage Functionality**
   - Hero section displays correctly
   - Navigation works properly
   - Featured content appears as expected

2. **Navigation Between Pages**
   - All pages load correctly
   - No 404 errors or missing components

3. **Responsiveness**
   - Site works on mobile and desktop
   - No layout issues or broken components

## Next Steps

1. **Verify Clean Build**
   - Run `npm run build` to verify no compilation errors

2. **Test Core Functionality**
   - Manually test all pages to ensure they work as expected

3. **Final Documentation**
   - Document final component and page structure
   - Provide clear guidelines for future development 