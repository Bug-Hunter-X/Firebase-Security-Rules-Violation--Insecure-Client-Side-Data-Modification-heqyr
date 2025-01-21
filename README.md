# Firebase Security Rules Violation: Insecure Client-Side Data Modification

This repository demonstrates a common yet subtle error in Firebase: attempting to modify sensitive data directly on the client-side without proper security rules enforcement.  This can lead to data inconsistencies and serious security vulnerabilities.

## The Problem

The `bug.js` file contains client-side code that attempts to directly update a user's admin status. This bypasses Firebase's security rules, which should be the sole arbiter of data modification.

## The Solution

The `bugSolution.js` file showcases the correct approach.  It involves using a server-side function (Cloud Functions) to handle the admin privilege update. This ensures that all data modifications are controlled and validated by the backend, securing your application from unauthorized changes.

## How to Reproduce

1.  Set up a Firebase project.
2.  Create a Firestore database.
3.  Configure your security rules to restrict direct client-side modification of the `admin` property (e.g., allow only updates from a trusted server-side function).
4.  Run the code in `bug.js`. Observe that the update either fails or (worse) succeeds but is insecure.
5.  Then, implement the solution in `bugSolution.js` (you'll need to set up Cloud Functions). Observe the secure and controlled update.