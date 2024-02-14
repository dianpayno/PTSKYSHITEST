import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent {
  editActive: boolean = false;
  activity: string = 'Meeting dengan Client';
  todoItem: string = 'Makan Ayam';

  todoList:any[] = [
    {
      id: 1,
      todoItem: 'Makan Ayam',
      priority: 'Low',
      isDone: false

    },
    {
      id: 2,
      todoItem: 'Makan Sate',
      priority: 'High',
      isDone: false

    },
    {
      id: 3,
      todoItem: 'Makan Indomie',
      priority: 'Very Low',
      isDone: true

    },
    {
      id: 4,
      todoItem: 'Minum Obat ',
      priority: 'Very High',
      isDone: false

    },
    {
      id: 5,
      todoItem: 'Minum Jamu ',
      priority: 'Medium',
      isDone: false

    },

  ];

  handleEdit() {
    this.editActive = true;
  }

  handleActivityChange() {
    console.log(this.activity);
    this.editActive = false;
  }

  handleCheck(item: any) {
    item.isDone = !item.isDone
  }
}
