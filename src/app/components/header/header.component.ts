import { Component, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,

})

export class HeaderComponent {
  @Input() page?:string;

  isShown:boolean=false;
  isMenuShown:boolean=false;
  constructor()
  {
    console.log(this.page);
  }

  openSettings(){
    this.isShown=!this.isShown;
  }

  openMenu(){
    this.isMenuShown=!this.isMenuShown;
  }
}
