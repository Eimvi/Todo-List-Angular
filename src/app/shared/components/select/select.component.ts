import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from 'src/app/list/enums/modal-select.enum';
import { List } from '../../../list/enums/list.enum';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Input() textFilter!: string;
  @Input() status!: typeof List | typeof Modal;

  constructor() { }

  ngOnInit(): void {
  }

  setData(filter: any) {
    this.filter.emit(filter.target.value);
  }

}
