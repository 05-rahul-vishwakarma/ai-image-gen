# Testing Guide

## Manual Testing Checklist

### 1. Authentication Flow

#### Login
- [ ] Open http://localhost:3000
- [ ] Should redirect to /auth
- [ ] Click "Login" tab
- [ ] Try submitting empty form → should show validation errors
- [ ] Enter invalid email → should show "Invalid email address"
- [ ] Enter short password (<6 chars) → should show error
- [ ] Enter valid credentials:
  - Email: `test@example.com`
  - Password: `Test123`
- [ ] Should show loading spinner on button
- [ ] Should show success toast
- [ ] Should redirect to /dashboard

#### Signup
- [ ] Click "Sign Up" tab (smooth animation)
- [ ] Try submitting empty form → should show validation errors
- [ ] Enter mismatched passwords → should show "Passwords don't match"
- [ ] Enter weak password → should show strength requirements
- [ ] Enter valid signup data:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `Test123!`
  - Confirm: `Test123!`
- [ ] Should create account and redirect to dashboard

### 2. Dashboard Layout

#### Top Bar
- [ ] Logo and app name visible
- [ ] User avatar displays (generated from email)
- [ ] Click avatar → dropdown menu appears
- [ ] Dropdown shows: Profile, Settings, Logout
- [ ] Click outside → dropdown closes
- [ ] On mobile: hamburger menu visible

#### Sidebar (History)
- [ ] Desktop: Sidebar button in top bar
- [ ] Mobile: Hamburger menu opens sidebar
- [ ] Sidebar slides in from right
- [ ] Shows "No history yet" message initially
- [ ] Close button works
- [ ] Click overlay (mobile) → closes sidebar

### 3. Image Generation

#### Prompt Input
- [ ] Large textarea visible in center
- [ ] Character counter shows 0/1000
- [ ] Type prompt → counter updates
- [ ] Click suggestion → fills textarea
- [ ] Empty prompt + click Generate → error toast
- [ ] Valid prompt + Generate:
  - [ ] Button shows "Generating..." with spinner
  - [ ] Cannot click button while loading
  - [ ] After 2 seconds → success toast
  - [ ] New image appears in grid below

#### Keyboard Shortcuts
- [ ] Type prompt
- [ ] Press ⌘ + Enter (Mac) or Ctrl + Enter (Windows)
- [ ] Should trigger generation

### 4. Image Gallery

#### Display
- [ ] Generated images show in responsive grid
- [ ] 1 column on mobile
- [ ] 2 columns on tablet
- [ ] 3 columns on desktop
- [ ] Images load with smooth fade-in animation

#### Interactions
- [ ] Hover over image → overlay appears
- [ ] Overlay shows:
  - [ ] Full prompt text
  - [ ] Image size and quality
  - [ ] Download button
  - [ ] Delete button
- [ ] Click Download → downloads image
- [ ] Click Delete → image removed with animation
- [ ] Delete all images → shows empty state

### 5. History

#### Adding History
- [ ] Generate 3 different images with different prompts
- [ ] Click sidebar button
- [ ] Should show 3 history items
- [ ] Each shows: prompt preview, image count, timestamp

#### Using History
- [ ] Click a history item
- [ ] Prompt should load into textarea
- [ ] Sidebar should close (mobile)
- [ ] Can generate new image from that prompt

#### Persistence
- [ ] Generate some images
- [ ] Refresh page
- [ ] History should persist
- [ ] Images should persist (last 20)

### 6. Settings Panel

#### Opening
- [ ] Click user avatar → Settings
- [ ] Panel slides in from right
- [ ] Backdrop appears
- [ ] Click backdrop → panel closes
- [ ] Click X button → panel closes

#### Theme Switching
- [ ] Default theme should be "Dark"
- [ ] Click "Light" theme:
  - [ ] Instant theme change
  - [ ] All colors update
  - [ ] Success toast appears
- [ ] Click "Neon" theme:
  - [ ] Vibrant cyan/magenta colors
  - [ ] Glow effects visible
- [ ] Click "Glass" theme:
  - [ ] Glassmorphism effects
  - [ ] Blur backgrounds
- [ ] Refresh page → theme persists

#### Image Settings
- [ ] Change image size:
  - [ ] Options: 512x512, 1024x1024, 1536x1536
  - [ ] Selection persists
- [ ] Change quality:
  - [ ] Options: Standard, HD
  - [ ] Selection persists
- [ ] Change AI model:
  - [ ] Options: DALL-E 3, Stable Diffusion, Midjourney
  - [ ] Selection persists

### 7. Responsive Design

#### Mobile (375px)
- [ ] Open Chrome DevTools
- [ ] Select iPhone size
- [ ] Layout should stack vertically
- [ ] Hamburger menu appears
- [ ] Touch targets are large enough
- [ ] No horizontal scroll
- [ ] Images display 1 per row

#### Tablet (768px)
- [ ] Select iPad size
- [ ] Images display 2 per row
- [ ] Sidebar still slides in
- [ ] All features accessible

#### Desktop (1920px)
- [ ] Images display 3 per row
- [ ] Sidebar visible on trigger
- [ ] Plenty of white space
- [ ] Comfortable reading width

### 8. Animations

#### Page Transitions
- [ ] Navigate between pages → smooth fade
- [ ] No janky animations
- [ ] Consistent timing

#### Component Animations
- [ ] Cards fade in on load
- [ ] Buttons scale on press
- [ ] Hover effects smooth
- [ ] Dropdown slides down
- [ ] Sidebar slides in/out
- [ ] Settings panel slides in/out

#### Loading States
- [ ] Spinner animates smoothly
- [ ] Button loading state clear
- [ ] No layout shift

### 9. User Flow Testing

#### Complete User Journey
1. [ ] Open app → redirects to auth
2. [ ] Sign up with new account
3. [ ] Redirected to dashboard
4. [ ] Generate 3 images with different prompts
5. [ ] Open history → see all 3 prompts
6. [ ] Click one history item → prompt loads
7. [ ] Open settings → change theme to Neon
8. [ ] Change image size to 1536x1536
9. [ ] Generate another image
10. [ ] Download one image
11. [ ] Delete one image
12. [ ] Logout → redirects to auth
13. [ ] Login again → history and images restored

### 10. Error Handling

#### Form Errors
- [ ] All validation errors display correctly
- [ ] Error messages are helpful
- [ ] Red border on error fields

#### Toast Notifications
- [ ] Success toasts show green icon
- [ ] Error toasts show red icon
- [ ] Auto-dismiss after 4 seconds
- [ ] Can manually dismiss

#### Edge Cases
- [ ] Try very long prompt (>1000 chars) → should prevent
- [ ] Multiple rapid generates → should queue properly
- [ ] Network offline → appropriate error (when backend added)

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Performance

- [ ] Page load < 2 seconds
- [ ] Smooth scrolling
- [ ] No lag on interactions
- [ ] Animations run at 60fps

## Accessibility

- [ ] Tab through all interactive elements
- [ ] Enter key submits forms
- [ ] Escape key closes modals
- [ ] Focus visible on all elements
- [ ] Proper heading hierarchy

---

## Bug Reporting

If you find any issues:

1. Note the steps to reproduce
2. Include browser and device info
3. Take a screenshot if visual
4. Check console for errors
5. Report in GitHub issues

## Next Steps After Testing

1. Fix any bugs found
2. Optimize performance if needed
3. Add backend integration
4. Deploy to production
