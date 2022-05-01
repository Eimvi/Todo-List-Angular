import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetNotes } from '../interfaces/get-notes.interface';
import { CreateNote } from '../interfaces/create-note.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly URL: string = environment.URL;

  constructor(private http: HttpClient) { }

  getNotes(): Observable<GetNotes[]>{

    return this.http.get<GetNotes[]>(`${this.URL}list`);
  }

  getNotesByFilter(filter: string): Observable<GetNotes[]>{
    if(filter == 'todo'){
      filter = ''
    }
    return this.http.get<GetNotes[]>(`${this.URL}list`, {params: { filter }});
  }

  createNote(note: CreateNote): Observable<void>{

    return this.http.post<void>(`${this.URL}list/create`, note);
  }

  deleteNote(id: number) {
    return this.http.delete<void>(`${this.URL}list/delete/${id}`);
  }
}
