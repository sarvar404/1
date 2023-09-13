import { Component, Input, OnInit } from '@angular/core';
import { Slide } from '../../model/slide';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{

  @Input() banner?:Slide;
 
  slide:Slide = {};


  ngOnInit(): void {

  this.slide = this.banner!;

  }

}
