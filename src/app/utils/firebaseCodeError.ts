export enum FirebaseCodeErrors {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  weakPassword = 'auth/weak-password',
  invalidEmail = 'auth/invalid-email',
  userNotFound = 'auth/user-not-found',
  wrongPassword = 'auth/wrong-password',
  userDisabled = 'auth/user-disabled',
  userTokenExpired = 'auth/user-token-expired',
  invalidApiKey = 'auth/invalid-api-key',
  invalidUserToken = 'auth/invalid-user-token',
  requiresRecentLogin = 'auth/requires-recent-login',
  tooManyRequests = 'auth/too-many-requests',
  operationNotAllowed = 'auth/operation-not-allowed',
  invalidCredential = 'auth/invalid-credential',
  internalError = 'auth/internal-error',

}
