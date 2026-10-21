# Mini Message Board

A small message board built with Node.js, Express, and EJS. Visitors can read messages, post a new one, and open any message on its own page. The interface is responsive and supports light and dark themes.

**Live demo:** [Message-Board app](https://mini-message-board-tzmc.onrender.com)

## Features

- View all messages with the author, text, and date posted
- Post a new message through a form
- Open a message on its own details page
- Light and dark themes that follow the device setting and remember the visitor's choice
- Responsive layout for phones, tablets, and desktops

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) for routing and middleware
- [EJS](https://ejs.co/) for server-side templates and partials
- Plain CSS with custom properties for theming

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/<your-username>/mini-message-board.git
cd mini-message-board
npm install
```

## Routes

| Method | Path            | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/`             | List all messages                    |
| GET    | `/new`          | Show the new message form            |
| POST   | `/new`          | Add a message, then redirect to `/`  |
| GET    | `/messages/:id` | Show the details of a single message |

## Project Structure

```
mini-message-board/
├── app.js                  # Express setup and middleware
├── routes/
│   └── indexRouter.js      # Routes and the in-memory messages array
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── form.ejs
│   └── message.ejs
└── public/
    ├── styles.css          # Theme tokens and layout
    └── theme.js            # Light/dark theme toggle
```

## Notes

- Messages are stored in an in-memory array, so they reset whenever the server restarts. A database could replace this later.
- Form input is escaped by EJS (`<%= %>`) before it is displayed.

## What I Practiced

- Setting up an Express app with a router and EJS views
- Handling form submissions with `express.urlencoded()` and `res.redirect()`
- Reusing layout code with EJS partials
- Serving static files with `express.static()`
- Theming with CSS variables and `prefers-color-scheme`
