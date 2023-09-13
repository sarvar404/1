import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowListComponent } from './tv-show-list.component';

const routes: Routes = [{ path: 'genre/:id', component: TvShowListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowListRoutingModule { }
