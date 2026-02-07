# Backend Handover - Frontend Update Summary
**Date:** February 2, 2026
**Topic:** Portfolio, Profile, and Feed Enhancements

## Overview
We have implemented significant updates to the frontend, currently using `localStorage` for data persistence. We need backend APIs to replace this client-side logic. Below are the data structures and expected endpoints.

## 1. Portfolio System
The portfolio has been expanded to support rich content, ratings, and comments.

### Data Model (`PortfolioItem`)
```typescript
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string; // e.g., "Gardening", "Technology"
  image: string;    // Main cover image URL
  images: string[]; // Gallery URLs
  link?: string;    // External link
  date: string;     // ISO Date or YYYY-MM-DD
  comments: Comment[];
  ratings: Rating[];
  createdAt: number; // Timestamp
}

interface Comment {
  id: string;
  user: string;
  avatar: string; // URL
  text: string;
  date: string;
}

interface Rating {
  userId: string; // To prevent double rating
  value: number;  // 1-5
}
```

### Required Endpoints
- `GET /api/projects` - List all projects.
- `POST /api/projects` - Create a new project.
- `PUT /api/projects/:id` - Update a project.
- `DELETE /api/projects/:id` - Delete a project.
- `POST /api/projects/:id/rate` - Add a rating.
- `POST /api/projects/:id/comment` - Add a comment.

---

## 2. User Profile
The user profile is now editable.

### Data Model (`UserProfile`)
```typescript
interface UserProfile {
  name: string;
  handle: string; // e.g., "@sarah_cohen"
  bio: string;
  avatarUrl: string;
  coverUrl: string;
}
```

### Required Endpoints
- `GET /api/me` - Get current user profile.
- `PUT /api/me` - Update profile details.

---

## 3. Feed / Post Actions
We added interactive actions to the post dropdown menu.

### Actions Implemented (Frontend UI only)
1.  **Report**: Dialog with reason selection (`spam`, `harassment`, `inappropriate`, `other`).
2.  **Edit**: Dialog to modify post text.
3.  **Delete**: Confirmation dialog.

### Required Endpoints
- `POST /api/posts/:id/report`
    - Payload: `{ reason: string }`
- `PUT /api/posts/:id`
    - Payload: `{ content: string }`
- `DELETE /api/posts/:id`

## Notes
- Images are currently treated as string URLs. We will need an image upload service (`POST /api/upload`) that returns a URL.
- Authentication context (Current User) is assumed for all "My Actions".
