import { ServiceAccess, UserGrant } from './auth.model';

export const grantMapper = (grants: UserGrant[]): ServiceAccess[] => {
  return grants.map((grant: UserGrant) => {
    return {
      roles: grant.grantedRoles,
      serviceId: grant.serviceId,
    };
  });
};
