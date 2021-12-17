export interface IListItem {
  id: number;
  name: string;
  date: string;
}

export class ListItem implements IListItem {
  constructor(public id: number, public name: string, public date: string) {}
}
