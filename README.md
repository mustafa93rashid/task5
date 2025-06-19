# 🛍️ Product Management Dashboard

A fully interactive and responsive product management dashboard built using **React** and **TypeScript**. The application features CRUD operations, smart local notifications, real-time search filtering, and seamless integration with external APIs. Designed with a clean, user-friendly interface for optimal performance on all screen sizes.

## 📸 Live Preview

https://mustafa93rashid.github.io/task5/#/

---

## 🚀 Key Features

- ⚙️ **Complete Product Management** – Add, edit, and delete products with local activity logging.
- 🔍 **Real-time Search** – Filter products instantly as you type.
- 📄 **Dynamic Pagination** – Navigate through product pages smoothly.
- 🔔 **Notification Log System** – Logs every action (add/edit/delete) in `localStorage` with timestamps.
- 👤 **User Support** – Displays user’s name and profile image after login.
- 🧠 **Session Persistence** – Stores user data and images using `localStorage`.
- 🌐 **External API Integration** – Handles all data operations through a REST API with `Axios`.
- 🖼️ **Instant Image Preview** – Shows uploaded profile image immediately after selection.
- 💬 **Custom Feedback Messages** – Displays alerts for empty states, failed fetches, or search misses.
- 🔐 **Authentication System** – Secure login page with token-based session storage.

---

## 🧰 Tech Stack

| Tech             | Description                                 |
|------------------|---------------------------------------------|
| `React`          | Front-end framework                         |
| `TypeScript`     | Type-safe JavaScript for scalability        |
| `Axios`          | API request handling                        |
| `Bootstrap`/`css` | Responsive UI styling                |
| `React Router DOM` | Route navigation between pages            |
| `localStorage`   | Persistent browser storage for user/session |

---

## 📁 Project Structure
src/
├── components/
│ ├── ItemList/ # Displays and manages product list
│ ├── Pagination/ # Handles pagination UI
│ ├── NotificationLog/ # Displays logged actions
│ ├── SidebarUserImage/ # Shows user's image on sidebar
│ └── ConfirmationModal/ # Delete confirmation popup
├── pages/
│ ├── ItemsIndex.tsx # Main product management page
│ └── Login.tsx # User login page
├── types/
│ └── Items.ts # Type definitions
├── utils/
│ └── logAction.ts # Utility to log actions to localStorage
└── App.tsx # Main app entry point


👨‍💻 Developed by
Mustafa Rashid
Front-End Developer | 