# DSA Learner

An interactive web app for learning Data Structures and Algorithms by **watching them run**. Every algorithm is animated step by step, with the matching line of code highlighted as it executes, so you can see exactly what the code is doing to the data.

🔗 **Repository:** https://github.com/Parasprogrammer/DSA-LEARNER

---

## ✨ Features

- **Step-by-step visualizations**: play, pause, step forward/back, reset, and adjust the animation speed.
- **Live code tracing**: a syntax-highlighted code panel highlights the active line at each step.
- **38 modules across 8 topics**, each with a visualizer built for it (arrays, linked lists, trees, graphs, grids/DP tables, and buckets).
- **Progress tracking**: earn XP, complete modules, and unlock achievements. Progress is saved to your account.
- **Authentication**: email/password sign-up and login with Firebase Auth. The dashboard and visualizers are protected routes.
- **Code Checker**: paste JavaScript, Python, or C++ code and get a quality score with feedback on comments, naming, indentation, and language best practices.
- **Responsive UI** with smooth animations from Framer Motion and Tailwind CSS.

## 📚 Topics Covered

| Category | Modules |
|---|---|
| **Arrays** | Binary Search, Linear Search, Array Reversal, Two Pointer, Sliding Window, Prefix Sum |
| **Sorting** | Bubble Sort, Merge Sort, Quick Sort, Bucket Sort, Radix Sort |
| **Linked Lists** | Singly, Doubly, and Circular Linked List; Reverse Linked List; Cycle Detection (Floyd) |
| **Stack & Queue** | Stack, Queue, Circular Queue, Balanced Parentheses, Infix → Postfix, Next Greater Element |
| **Trees** | Binary Search Tree, Tree Traversals, AVL Tree |
| **Heaps** | Min Heap, Max Heap, Heap Sort |
| **Graphs** | BFS, DFS, Dijkstra, Topological Sort, Kruskal, Prim |
| **Dynamic Programming** | Fibonacci, Climbing Stairs, 0/1 Knapsack, LCS |

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 7 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS |
| Animation | Framer Motion |
| State | Zustand |
| Backend | Firebase Authentication and Cloud Firestore |
| Icons / Code | Lucide React, React Syntax Highlighter |
| Hosting | Vercel |

## 📁 Project Structure

```
src/
├── algorithms/      # Each algorithm as a generator of animation steps (bubbleSort.js, dijkstra.js, ...)
├── components/      # Visualizers (Array, Tree, Graph, Grid, LinkedList, Bucket), Controls, CodeViewer
├── config/          # Firebase initialization
├── pages/           # Landing, AuthPage, Dashboard, VisualizerLayout, CodeChecker
├── store/           # Zustand stores: auth, progress (XP/achievements), visualizer state
├── utils/           # codeScorer.js (Code Checker logic)
├── App.jsx          # Routes
└── main.jsx         # Entry point
```

### Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Landing page | No |
| `/auth` | Login / Sign up | No |
| `/dashboard` | Module dashboard and progress | Yes |
| `/visualizer/:moduleId` | Algorithm visualizer, e.g. `/visualizer/quick-sort` | Yes |
| `/code-checker` | Code quality checker | Yes |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- A [Firebase](https://console.firebase.google.com/) project, if you want to use your own backend

### Installation

```bash
git clone https://github.com/Parasprogrammer/DSA-LEARNER.git
cd DSA-LEARNER
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Firebase Setup (to use your own project)

1. Create a project in the Firebase Console.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Create a **Cloud Firestore** database. User progress is stored in a `users/{uid}` document with `xp`, `completedModules`, and `achievements`.
4. Register a web app and copy its config into [src/config/firebase.js](src/config/firebase.js).

Recommended Firestore rules, so each user can only access their own progress:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## ☁️ Deployment

The app is set up for **Vercel**. [vercel.json](vercel.json) rewrites every route to `index.html`, so client-side routes such as `/dashboard` don't return a 404 when the page is refreshed.

1. Push the repository to GitHub.
2. Import it in Vercel. The framework preset is **Vite**, the build command is `npm run build`, and the output directory is `dist`.
3. Add your Vercel domain under **Firebase → Authentication → Settings → Authorized domains**.

## ➕ Adding a New Algorithm

1. Create a step generator in `src/algorithms/yourAlgorithm.js` that returns the sequence of states and the active code line for each step.
2. Register the module in the module list in [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx) with an `id`, `name`, `category`, and `icon`.
3. Connect the `id` to its algorithm and visualizer in [src/pages/VisualizerLayout.jsx](src/pages/VisualizerLayout.jsx).

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a branch: `git checkout -b feature/new-visualizer`
3. Commit your changes: `git commit -m "Add new visualizer"`
4. Push the branch and open a Pull Request.

## 👨‍💻 Author

**Paras Kaushik** · [@Parasprogrammer](https://github.com/Parasprogrammer)

---

⭐ If this project helped you understand DSA better, consider giving it a star.
