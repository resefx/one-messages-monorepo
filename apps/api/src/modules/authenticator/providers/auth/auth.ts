import { Provider } from '@nestjs/common';
import { AUTH_INSTANCE_KEY } from '../../../../commons/const/auth.const';
import { auth } from 'src/utils/auth';

export const AuthProvider: Provider = {
    provide: AUTH_INSTANCE_KEY,
    useFactory: () => auth,
};
