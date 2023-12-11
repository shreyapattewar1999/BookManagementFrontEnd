export interface IEndPoint {
  link: string;
  methodType: string;
  body?: any;
  name: string;
  isBody?: boolean | false;
  isRequestParameters?: boolean | false;
  isSearchParameters?: boolean | false;
  bodyDetails?: IField[];
  searchParameters?: IField[];
  requestParameters?: IField[];
  fields?: IField[];
}

export interface IField {
  id: any;
  displayName: string;
  fieldName?: string | '';
  placeholder?: string;
  isRequired?: boolean | false;
  isDropDown?: boolean | false;
  dropDownFields?: any[];
  isBody?: boolean | false;
  isRequestParameters?: boolean | false;
  isSearchParameters?: boolean | false;
}
