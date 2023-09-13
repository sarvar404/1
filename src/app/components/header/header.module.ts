import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { heroBell, heroMagnifyingGlass} from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
   CommonModule,
    RouterModule,
    NgIconsModule.withIcons({heroBell, heroMagnifyingGlass})
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
