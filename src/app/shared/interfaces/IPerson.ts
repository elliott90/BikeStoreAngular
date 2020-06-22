export interface IPerson {
  BusinessEntityId: number;
  PersonType: string;
  NameStyle: boolean;
  Title: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix: string;
  EmailPromotion: number;
  AdditionalContactInfo: string;
  Demographics: string;
  Rowguid: string;
  ModifiedDate: Date | string;
}
