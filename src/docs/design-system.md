# ELIS Website Design System

## Color System

### Primary Colors
- Primary: `#0070f3` - Primary actions, links, active states
- Primary Foreground: `#ffffff` - Text on primary color backgrounds

### Neutral Colors
- Background: `#ffffff` (light), `#121212` (dark) - Page background
- Foreground: `#171717` (light), `#ffffff` (dark) - Primary text
- Card: `#ffffff` (light), `#1e1e1e` (dark) - Card backgrounds
- Card Foreground: `#171717` (light), `#ffffff` (dark) - Card text
- Border: `#e5e7eb` (light), `#333333` (dark) - Borders

### Semantic Colors
- Success: `#10b981` - Success states, confirmations
- Warning: `#f59e0b` - Warning states, attention required
- Destructive: `#ef4444` - Error states, destructive actions
- Info: `#3b82f6` - Information, help, hints

## Typography

### Font Families
- Primary: `Inter` - Main text content
- Secondary: `Playfair Display` - Headings, display text
- Monospace: `Geist Mono` - Code blocks

### Font Sizes
- xs: `0.75rem` (12px) - Very small text, labels
- sm: `0.875rem` (14px) - Small text, secondary information
- base: `1rem` (16px) - Body text, default size
- lg: `1.125rem` (18px) - Large text, important information
- xl: `1.25rem` (20px) - Extra large text, section titles
- 2xl: `1.5rem` (24px) - Headings
- 3xl: `1.875rem` (30px) - Large headings
- 4xl: `2.25rem` (36px) - Page titles
- 5xl: `3rem` (48px) - Hero text

## Spacing

- xs: `0.25rem` (4px) - Minimal spacing
- sm: `0.5rem` (8px) - Small spacing
- md: `1rem` (16px) - Medium spacing (default)
- lg: `1.5rem` (24px) - Large spacing
- xl: `2rem` (32px) - Extra large spacing
- 2xl: `3rem` (48px) - Section spacing
- 3xl: `4rem` (64px) - Page spacing

## Borders & Shadows

### Border Radius
- none: `0px` - No rounding
- sm: `0.125rem` (2px) - Subtle rounding
- DEFAULT: `0.25rem` (4px) - Default rounding
- md: `0.375rem` (6px) - Medium rounding
- lg: `0.5rem` (8px) - Large rounding
- xl: `0.75rem` (12px) - Extra large rounding
- 2xl: `1rem` (16px) - Very large rounding
- full: `9999px` - Circular/pill

### Shadows
- sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)` - Subtle shadow
- DEFAULT: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` - Default shadow
- md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` - Medium shadow
- lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` - Large shadow
- xl: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` - Extra large shadow
- 2xl: `0 25px 50px -12px rgb(0 0 0 / 0.25)` - Very large shadow
- neumorphic: `2px 2px 4px rgba(0,0,0,0.06),-2px -2px 4px rgba(255,255,255,0.8)` - Neumorphic light

## Components

### Button Variants

#### Primary (default)
- Purpose: Primary actions, main calls to action
- Styling: Solid background, high contrast
- Usage: "Buy Now", "Sign Up", "Submit"

#### Secondary
- Purpose: Secondary actions, alternative choices
- Styling: Lighter background, less prominent
- Usage: "View Details", "Learn More"

#### Outline
- Purpose: Optional actions, less emphasis
- Styling: Transparent with border
- Usage: "Cancel", "Back", "Later"

#### Ghost
- Purpose: Subtle actions, contextual options
- Styling: No background or border, text only
- Usage: "Skip", "Not Now", navigation items

#### Destructive
- Purpose: Dangerous or irreversible actions
- Styling: Error color
- Usage: "Delete", "Remove", "Unsubscribe"

#### Link
- Purpose: Navigation that looks like text links
- Styling: Underlined text
- Usage: "Terms", "Privacy Policy"

### Button Sizes

- sm: Small buttons for compact UI areas
- default: Standard size for most actions
- lg: Large buttons for primary page actions
- icon: Square buttons for icons only

### Card Component

The Card component should be used for displaying content in a contained, distinct element. All cards should use the following neumorphic styling pattern:

```tsx
<div className="rounded-xl p-6 bg-card text-card-foreground border-border/40 bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[2px_2px_4px_rgba(0,0,0,0.06),-2px_-2px_4px_rgba(255,255,255,0.8)] dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.7)] dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.15),-1px_-1px_2px_rgba(30,30,30,0.07)] transition-all duration-200">
  {/* Card content */}
</div>
```

### Image Component

All images should use the OptimizedImage component with consistent aspect ratios:

```tsx
<AspectRatio ratio={16/9}>
  <OptimizedImage
    src="/path/to/image.jpg"
    alt="Description of image"
    fallbackSrc="/images/placeholder.jpg"
    className="object-cover rounded-lg"
    width={800}
    height={450}
    blurEffect={true}
  />
</AspectRatio>
```

## Layout

### Container Widths
- xs: `20rem` (320px) - Extra small container
- sm: `24rem` (384px) - Small container
- md: `28rem` (448px) - Medium container
- lg: `32rem` (512px) - Large container
- xl: `36rem` (576px) - Extra large container
- 2xl: `42rem` (672px) - 2x extra large container
- 3xl: `48rem` (768px) - 3x extra large container
- 4xl: `56rem` (896px) - 4x extra large container
- 5xl: `64rem` (1024px) - 5x extra large container
- 6xl: `72rem` (1152px) - 6x extra large container
- 7xl: `80rem` (1280px) - 7x extra large container

### Grid System
- Use grid-cols-1 for mobile
- Use grid-cols-2 for tablet
- Use grid-cols-3 or grid-cols-4 for desktop 