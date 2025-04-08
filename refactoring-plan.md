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