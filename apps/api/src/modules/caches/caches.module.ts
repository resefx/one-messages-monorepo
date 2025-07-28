import { createKeyvNonBlocking } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { CacheableMemory } from 'cacheable';
import { Keyv } from 'keyv';

@Global()
@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            useFactory: async () => {
                return {
                    stores: [
                        createKeyvNonBlocking(String(process.env.URL_REDIS)),
                        new Keyv({
                            store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
                        })
                    ],
                };
            },
        }),
    ],
})
export class CachesModule { }
