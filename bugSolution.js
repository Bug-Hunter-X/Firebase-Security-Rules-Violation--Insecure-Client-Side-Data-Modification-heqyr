The solution involves using Firebase Cloud Functions to handle the admin update:

```javascript
// Cloud Function
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateUserAdminStatus = functions.https.onCall(async (data, context) => {
  // Check for authorization (e.g., using context.auth)
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admin users can update admin status.');
  }

  const userId = data.userId;
  const isAdmin = data.isAdmin;
  
  await admin.firestore().collection('users').doc(userId).update({
    admin: isAdmin
  });
});

// Client-side code (using Cloud Functions)
firebase.functions().httpsCallable('updateUserAdminStatus')({
  userId: userId,
  isAdmin: true
}).then(() => {
  // Success
}).catch((error) => {
  // Handle error
});
```

This approach ensures that only authenticated and authorized users can modify the `admin` property, mitigating the security risks associated with direct client-side updates.