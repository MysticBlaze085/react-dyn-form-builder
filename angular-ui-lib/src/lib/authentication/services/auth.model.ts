export enum ServiceEnums {
  atlasConsole = 'atlas',
  atlasChronicle = 'atlas-chronicle',
  atlasDeploy = 'atlas-deploy',
  atlasFrontend = 'atlas-frontend',
  atlasIam = 'atlas-iam',
  atlasPortal = 'atlas-portal',
  atlasSemanticDashboard = 'Semantic Dashboard',
  emissary = 'Emissary-01hh4tbrxtkn3gn06dgwmqagyy',
}

export type ServiceId =
  | ServiceEnums.atlasConsole
  | ServiceEnums.atlasChronicle
  | ServiceEnums.atlasDeploy
  | ServiceEnums.atlasFrontend
  | ServiceEnums.atlasIam
  | ServiceEnums.atlasPortal
  | ServiceEnums.atlasSemanticDashboard
  | ServiceEnums.emissary;

export enum RoleEnum {
  atlasAdmin = 'admin',
}

export type RoleTypes = RoleEnum.atlasAdmin;

export class User {
  [x: string]: any;
  userName!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  userZid!: string;
  orgZid!: string;
  state!: 'USER_STATE_ACTIVE' | 'USER_STATE_INACTIVE' | 'USER_STATE_LOCKED' | 'USER_STATE_DELETED';
  type!: 'MACHINE' | 'HUMAN';
  createdTs!: number;
  updateTs!: number;
  grants: UserGrant[] = [];
  roles: string[] = [];
}

export class UserGrant {
  serviceId: ServiceId = ServiceEnums.atlasIam;
  userName = '';
  projectZid = '';
  userZid = '';
  grantZid = '';
  grantedRoles: RoleTypes[] = [];
}

export interface ServiceAccess {
  roles: RoleTypes[];
  serviceId: string;
}

export class Token {
  access_token!: string;
  token_type!: 'Bearer';
  expires_in!: number;
}

export class FetchTokenConfig {
  atlas_iam_project_id!: string;
  atlas_deploy_project_id!: string;
  atlas_chronicle_iam_project_id!: string;
}
