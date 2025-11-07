# Firestore Security Rules Setup

## Quick Setup

The app requires Firestore security rules to be deployed for messages to work. Here's how to set them up:

### Option 1: Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy the contents of `firestore.rules` file
5. Paste into the Rules editor
6. Click **Publish**

### Option 2: Firebase CLI

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

## Rules Explanation

The rules allow:
- **Messages**: Authenticated users can read/write all messages
- **User Roles**: Users can only read/write their own role document
- **Patients & Prescriptions**: Authenticated users can read/write

## Testing

After deploying, the app will:
- ✅ Show real-time messages from Firestore
- ✅ Allow sending messages that persist in the database
- ✅ Work across all dashboards (User, Doctor, RMP)

If permissions are denied, the app will fall back to mock data and show a warning message.

