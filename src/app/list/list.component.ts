import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from './services/list.service';
import { GetNotes } from './interfaces/get-notes.interface';
import { CreateNote } from './interfaces/create-note.interface';
import Swal from 'sweetalert2';
import { List } from './enums/list.enum';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  notes$!: Observable<GetNotes[]>;
  status = List;

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  submit(note: CreateNote): void{
    this.listService.createNote(note).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: 'Nota creada con éxito.',
          showConfirmButton: false,
          timer: 1500
        });
        this.getNotes();
      }
    );
  }

  getNotes(): void{
    this.notes$ = this.listService.getNotes();
  }

  filter(filter: any): void {
    this.notes$ = this.listService.getNotesByFilter(filter);
  }

  deleteNote(id: number): void {
    this.listService.deleteNote(id).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: 'Nota elimina con éxito.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getNotes();
      }
    )
  }

}
