# App Router Migration Analysis

## Current Status

The website is currently using the Next.js Pages Router approach:
- Pages are defined in `src/pages` directory
- Layout structure is manually built in `_app.tsx` and `_document.tsx`
- Metadata is defined separately in each page

There is some initial work toward the App Router:
- `src/app` directory exists with a `metadata.tsx` file
- The `metadata.tsx` file exports `sharedMetadata` and a helper function for JSON-LD

## Migration Benefits

1. **Better Performance**:
   - Server components reduce client-side JavaScript
   - Streaming and partial rendering
   - More granular rendering optimizations

2. **Improved Structure**:
   - Nested layouts for better code organization
   - Directory-based routing is more intuitive
   - Colocating related code (page, layout, loading, error)

3. **Enhanced Metadata**:
   - Consolidated metadata API
   - Better SEO handling with built-in tools
   - Dynamic OpenGraph image generation

## Migration Roadmap

### Phase 1: Preparation

1. **Audit & Clean Current Code**:
   - ✅ Remove unused components
   - ⬜ Identify components that need client-side functionality
   - ⬜ Clean up existing components to simplify migration

2. **Structure Planning**:
   - ⬜ Design the route structure for App Router
   - ⬜ Plan layout nesting
   - ⬜ Identify shared layouts vs. page-specific layouts

### Phase 2: Initial Implementation

1. **Root Layout Setup**:
   - ⬜ Create `src/app/layout.tsx` as the root layout
   - ⬜ Migrate global styles and providers from `_app.tsx`
   - ⬜ Implement base HTML structure from `_document.tsx`

2. **Metadata Implementation**:
   - ⬜ Expand the existing `metadata.tsx` utilities
   - ⬜ Create route-specific metadata exports

3. **First Page Migration**:
   - ⬜ Start with a simpler page like "About"
   - ⬜ Convert server-rendered content to server components
   - ⬜ Identify and isolate client components with "use client" directive

### Phase 3: Full Migration

1. **Migrate Remaining Pages**:
   - ⬜ Home page
   - ⬜ Books page
   - ⬜ Services page
   - ⬜ Shop pages
   - ⬜ Contact functionality

2. **Advanced Features**:
   - ⬜ Implement loading states with suspense
   - ⬜ Add error boundaries
   - ⬜ Create route handlers for API endpoints

3. **SEO & Performance**:
   - ⬜ Optimize metadata for all routes
   - ⬜ Add proper sitemap and robots.txt generation
   - ⬜ Implement image optimization strategies

### Phase 4: Cleanup & Finalization

1. **Remove Pages Router Code**:
   - ⬜ After successful migration, remove `src/pages` directory
   - ⬜ Update imports to use new path structure

2. **Performance Testing**:
   - ⬜ Run Lighthouse audits
   - ⬜ Test Core Web Vitals
   - ⬜ Compare before/after metrics

## Technical Considerations

1. **Data Fetching Changes**:
   - Move from `getStaticProps`/`getServerSideProps` to React Server Components
   - Implement fetch with proper caching strategies

2. **Client vs. Server Components**:
   - Default to server components for better performance
   - Only use client components when necessary (for interactivity, hooks, browser APIs)

3. **State Management**:
   - Keep global state providers in a client boundary
   - Consider using React Context with server components feeding data

4. **Styling Approaches**:
   - Continue using Tailwind CSS (compatible with both)
   - Ensure CSS modules work properly with the new structure

## Action Items for Next Steps

1. Create a detailed component inventory with client/server classification
2. Design the planned route structure with layouts
3. Set up basic App Router skeleton with root layout
4. Create a development branch for migration work
5. Start with a proof-of-concept by migrating one simpler page 