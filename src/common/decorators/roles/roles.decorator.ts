import { SetMetadata } from '@nestjs/common';

// export const Roles = (...args: string[]) => SetMetadata('roles', args);
export const Role = (role: string) => SetMetadata('role', role);
