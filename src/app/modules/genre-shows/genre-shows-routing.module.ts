import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreShowsComponent } from './genre-shows.component';

const routes: Routes = [{ path: ':category/:id', component: GenreShowsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreShowsRoutingModule { }
