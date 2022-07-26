import { Injectable } from '@angular/core';
import { FirebaseCodeErrors } from '../utils/firebaseCodeError';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorsService {

  constructor() { }

  firebaseCodeError(code: string){
    switch(code){
      case FirebaseCodeErrors.EmailAlreadyInUse:
        return 'El email ya está en uso';
      case FirebaseCodeErrors.weakPassword:
        return 'La contraseña es muy débil';
      case FirebaseCodeErrors.invalidEmail:
        return 'El email no es válido';
      case FirebaseCodeErrors.userNotFound:
        return 'El usuario no existe';
      case FirebaseCodeErrors.wrongPassword:
        return 'La contraseña es incorrecta';
      case FirebaseCodeErrors.userDisabled:
        return 'El usuario está deshabilitado';
      case FirebaseCodeErrors.userTokenExpired:
        return 'El token de usuario ha expirado';
      case FirebaseCodeErrors.invalidApiKey:
        return 'La clave de API no es válida';
      case FirebaseCodeErrors.invalidUserToken:
        return 'El token de usuario no es válido';
      case FirebaseCodeErrors.requiresRecentLogin:
        return 'El usuario necesita iniciar sesión recientemente';
      case FirebaseCodeErrors.tooManyRequests:
        return 'Demasiados intentos fallidos';
      case FirebaseCodeErrors.operationNotAllowed:
        return 'La operación no está permitida';
      case FirebaseCodeErrors.invalidCredential:
        return 'La credencial no es válida';
      case FirebaseCodeErrors.internalError:
        return 'Se ha producido un AuthError interno.';
      default:
        return 'Ocurrió un problema, por favor espere un momento y vuelve a intentarlo';
    }
  }

}
