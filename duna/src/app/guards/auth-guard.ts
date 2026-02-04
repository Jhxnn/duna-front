import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { FeatureFlagsService } from '../services/feature-flags';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const flags = inject(FeatureFlagsService);
  const router = inject(Router);
  if (auth.isAuthenticated() || flags.isPreviewEnabled()) {
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};
