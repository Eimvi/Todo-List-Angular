import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GetNotes } from '../../interfaces/get-notes.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnChanges {

  @Input() notes: GetNotes[] | null = [];
  @Output() delete: EventEmitter<number> = new EventEmitter();
  notesHtml: GetNotes[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.notes.currentValue){
      this.notesHtml = changes.notes.currentValue;
    }
  }

  deleteNote(id: number) {
    this.delete.emit(id);
  }

}
