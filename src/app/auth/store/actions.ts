import { createActionGroup, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
