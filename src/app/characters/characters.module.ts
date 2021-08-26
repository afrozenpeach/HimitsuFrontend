import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CharacterComponent } from './character/character.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full' },
  { path: ':character', component: CharacterComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CharactersModule { }
