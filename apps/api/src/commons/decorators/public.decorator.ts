import { SetMetadata } from '@nestjs/common';
import { AUTH_IS_PUBLIC_KEY } from '../const/auth.const';
export const Public = () => SetMetadata(AUTH_IS_PUBLIC_KEY, true);
