import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    pathMatch: 'full'
  },
  {
    path: 'category/:category',
    loadChildren: () => import('./channels/channels.module').then(m => m.ChannelsModule)
  },
  {
    path: 'channel/:channel',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
