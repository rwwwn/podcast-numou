# Admin Login System Documentation

## Overview
The application now has a **fully functional admin login system** with email-based authentication. Only admins with assigned emails can access the admin dashboard.

## Allowed Admin Emails
The following admin emails are authorized to log in:
- `wscrtq@gmail.com` (Password: `Rr123456`)
- `admin@podcast-numou.com` (Password: `password123`)

## Architecture

### 1. **Authentication Backend** (`src/lib/auth.ts`)
- Uses **NextAuth.js** with Credentials Provider
- Validates email against whitelist of allowed admin emails
- Uses bcrypt for password hashing verification
- Implements JWT-based session management
- 30-day session expiration

### 2. **Login Page** (`src/app/login/page.tsx`)
- Beautiful, responsive login form with RTL support (Arabic)
- Email and password validation
- Demo credentials button for testing
- Error handling and user feedback
- Redirects to dashboard on successful login

### 3. **API Route** (`src/app/api/auth/[...nextauth]/route.ts`)
- NextAuth handlers for credential authentication
- Secure session endpoints
- CSRF protection built-in

### 4. **Route Protection** (`src/middleware.ts`)
- Middleware to protect `/dashboard`, `/episodes`, `/team` routes
- Automatically redirects unauthenticated users to login page
- Preserves callback URL for post-login redirect

### 5. **Session Provider** (`src/components/auth-provider.tsx`)
- Wraps entire app with SessionProvider
- Enables `useSession()` hook throughout the app
- Manages session state globally

## How to Use

### Local Development
```bash
npm run dev
```

Then navigate to: `http://localhost:3000/login`

### Test Credentials
The login page has a "Show Test Credentials" button showing both:
1. `wscrtq@gmail.com` / `Rr123456`
2. `admin@podcast-numou.com` / `password123`

### Dashboard Features
After login, admins can access:
- `/dashboard` - Admin dashboard with overview
- `/episodes` - Manage podcast episodes
- `/team` - Manage team members

## Adding New Admin Users

To add a new admin user, modify `src/lib/auth.ts`:

1. **Add email to whitelist:**
```typescript
export const ALLOWED_ADMIN_EMAILS = [
  "wscrtq@gmail.com",
  "admin@podcast-numou.com",
  "new-admin@email.com",  // ← Add new email here
];
```

2. **Generate password hash** (bcryptjs):
```bash
node -e "require('bcryptjs').hash('your-password', 10, (err, hash) => console.log(hash))"
```

3. **Add user to ADMIN_USERS:**
```typescript
const ADMIN_USERS = [
  // ... existing users
  {
    id: "3",
    email: "new-admin@email.com",
    name: "New Admin",
    passwordHash: "$2a$10$...", // ← Paste generated hash
  },
];
```

## Security Features

✅ **Email Validation**: Only whitelisted admin emails can log in
✅ **Password Hashing**: Uses bcryptjs with salt rounds
✅ **JWT Sessions**: Secure token-based sessions
✅ **CSRF Protection**: Built into NextAuth.js
✅ **Route Protection**: Middleware prevents unauthorized access
✅ **Auto-Redirect**: Unauthenticated users redirected to login

## Environment Variables

Required in `.env.local`:
```
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production-12345678
NEXTAUTH_URL=http://localhost:3000
```

⚠️ **For Production**: Generate a new secure secret:
```bash
openssl rand -base64 32
```

## Logout
Users can log out via the "خروج" (Logout) button in the header, which:
- Clears the session
- Redirects to home page
- Prevents access to protected routes

## File Structure
```
src/
├── lib/
│   └── auth.ts                 # NextAuth configuration
├── middleware.ts               # Route protection
├── components/
│   └── auth-provider.tsx       # SessionProvider wrapper
└── app/
    ├── api/auth/[...nextauth]/
    │   └── route.ts            # Auth endpoints
    └── login/
        └── page.tsx            # Login page
```

## Testing Checklist

- [ ] Login page loads correctly
- [ ] Can log in with valid credentials
- [ ] Invalid credentials show error message
- [ ] Demo credentials button works
- [ ] Dashboard shows when logged in
- [ ] Unauthenticated users redirected to login
- [ ] Logout button works
- [ ] Session persists on page reload
- [ ] Callback URL works after login

## Troubleshooting

### Issue: "Invalid email or password"
- Verify email is in `ALLOWED_ADMIN_EMAILS`
- Check password hash matches bcrypt standard
- Clear browser cookies and try again

### Issue: "Cannot access /dashboard"
- Check middleware.ts is configured correctly
- Verify session is created after login
- Check NEXTAUTH_URL matches current domain

### Issue: Login page doesn't load
- Verify AuthProvider wraps entire app in layout.tsx
- Check next-auth version is 5.0.0-beta.30+
- Clear .next folder: `rm -rf .next && npm run build`

## Future Enhancements

Planned features:
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] OAuth provider support (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Admin invitation system
- [ ] Password reset via email
- [ ] Audit logging for admin actions
