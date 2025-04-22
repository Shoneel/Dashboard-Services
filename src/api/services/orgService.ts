import apiClient from '../apiClient';

import { Organization } from '#/entity';

export enum OrgApi {
  Org = '/organizations',
}

const getOrgList = () => apiClient.get<Organization[]>({ url: OrgApi.Org });

export default {
  getOrgList,
};
