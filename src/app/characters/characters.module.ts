import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CharacterComponent } from './character/character.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from '../services/auth-guard/auth-guard.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full' },
  { path: 'edit/:character', component: EditorComponent, canActivate: [AuthGuard] },
  { path: ':character', component: CharacterComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    CharacterComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CharactersModule { }
