import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivetvComponent } from './livetv.component';

const routes: Routes = [{ path: '', component: LivetvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivetvRoutingModule { }
