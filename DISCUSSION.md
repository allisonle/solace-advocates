### ✨ Enhancements:

-   Set up postgres database and seeded advocate data
-   Added base theme and core components with shadcn
-   Re-wrote advocates table using Tanstack table
    -   Added fuzzy filter method to search across all table columns
-   Added `startElem` and `endElem` props to Input to make clearable search input
-   Rendered advocate specialties as pill elements that override search filter on click
-   Added phone number formatter
-   Styling updates
    -   Use brand colors in theme
    -   Basic footer and header
    -   Basic responsiveness
    -   Table loader

### 🗒️ Wishlist if there was more time:

-   Split up `components/advocates/advocates` into table data component and table ui component
-   Toggle asc/desc column sorting on header click
-   Debounce search filter input
-   Jest tests
-   Range filter for Years of Experience column
-   Move filter logic to server-side for scalability
