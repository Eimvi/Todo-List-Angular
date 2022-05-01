import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from '../../enums/modal-select.enum';
import { CreateNote } from '../../interfaces/create-note.interface';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
export class ModalNoteComponent implements OnInit {

  @Output() createNote: EventEmitter<CreateNote> = new EventEmitter();

  form!: FormGroup;
  status = Modal;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required],
      filter: ['pendiente', Validators.required]
    });
  }

  submit(): void{
    const note: CreateNote = this.form.getRawValue();
    this.createNote.emit(note);
    this.reset();
  }

  setFilter(data: any) {
    this.form.get('filter')?.setValue(data);
  }

  reset(): void {
    this.form.reset();
    this.form.get('filter')?.setValue('pendiente');
  }

}
