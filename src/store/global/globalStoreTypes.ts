interface IOrganizarionInfo {
  name: string;
  logo: string | null;
  domens: {
    value: string;
    isValid: boolean;
  }[];
}

export type { IOrganizarionInfo };
