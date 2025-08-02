# Lendsqr Frontend Assessment

This project is a submission for the Lendsqr Frontend Engineer Assessment. It demonstrates my ability to build performant and scalable user interfaces using **React**, **Next.js**, **TypeScript**, **SCSS**, and **React Query**.

---

## Project Overview

The application implements the following features based on the Figma design provided:

**Login Page**
**Dashboard**
**Users Page**
**User Details Page**

---

## Tech Stack

| Tech                       | Usage                                                 |
| -------------------------- | ----------------------------------------------------- |
| **Next.js**                | React framework for SSR and routing                   |
| **React (19)**             | UI development                                        |
| **TypeScript**             | Type safety and code scalability                      |
| **SCSS**                   | Styling using a hierarchical structure                |
| **React Query**            | API data fetching and caching                         |
| **Mocki.io**               | Used to generate and serve mock API data (100+ users) |
| **LocalStorage**           | Used to persist user detail information               |
| **Jest + Testing Library** | Unit testing (positive and negative cases)            |

---

## Live Demo

> https://honour-nosakhare-lendsqr-fe-test.vercel.app/

---

## API

- Mock API Endpoint: [Mocki.io](https://mocki.io/)
- Records: 100 User Records
- Data is consumed using **React Query**, with caching and background refetching for performance.

---

## Persistence

User details are saved in **LocalStorage** when a user is selected. Upon returning to the details page, the app retrieves and displays stored data.

---

## Testing

Testing is done with `Jest`.

- **Positive & negative scenarios** tested for login, data fetching, and user detail retrieval.
- Sample test command:

```bash
pnpm run test
```

---

## Responsiveness

- All pages are mobile-responsive and adapt fluidly to various screen sizes using SCSS media queries.

## Author

- Honour Nosakhare
- Github: https://github.com/honorme
- Email: nosakhare073@gmail.com
