export interface Sound {
  id(id: any, arg1: string): any;
  filename: string;
  screenname: string;
  icon: string;
  playing?: boolean,
  isFavorite: boolean,
  weatherCondition: string
}
