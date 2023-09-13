import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportstvComponent } from './sportstv.component';

const routes: Routes = [{ path: '', component: SportstvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportstvRoutingModule { }
