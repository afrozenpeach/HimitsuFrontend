import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    pathMatch: 'full'
  },
  {
    path: 'archives',
    loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule),
  },
  {
    path: 'characters',
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'npcs',
    loadChildren: () => import('./npcs/npcs.module').then(m => m.NPCsModule)
  },
  {
    path: 'fics',
    loadChildren: () => import('./fics/fics.module').then(m => m.FicsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
