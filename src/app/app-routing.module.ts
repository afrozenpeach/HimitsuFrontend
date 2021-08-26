import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule),
    pathMatch: 'full'
  },
  {
    path: 'archives',
    loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule),
  },
  {
    path: 'characters',
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
