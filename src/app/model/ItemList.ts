export class todoItems {
  constructor(
    public title: string,
    public priority: string,
    public is_active?: boolean,
    public activity_group_id?: number,
    public id?: number
  ) {}
}

export class ItemList {
  constructor(public title: string, public todo_items: todoItems[]) {}
}
