import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poster } from 'src/app/model/poster';


import { TvShowsService } from 'src/app/services/tv-shows.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { AppContants } from 'src/app/utils/app-contants';
import { CategoryService } from 'src/app/services/category.service';
import { TvShow } from 'src/app/model/tv-show';
import { Category } from 'src/app/model/category';
import { TvShowResponseBody } from 'src/app/model/tv-show-response-body';
import { VideoTypes } from 'src/app/video-types';
@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnInit, OnDestroy {
  @ViewChild('aside') aside: ElementRef<HTMLElement> | undefined;
  loading: boolean = true;
  dataloading: boolean = false;
  pausePagination: boolean = false;
  paginationLoading: boolean = false;
  currentPage: number = 0;
  categories: Category[] = [];
  tvShows: TvShow[] = [];
  temp: TvShow[] = [];
  paginationMap: Map<number, TvShow[]> = new Map();
  paginatedPosters: any = [];
  selectedCategory: Category = { _id: '', name: "All TV Shows" };
  switchlang = 'en'
  @ViewChild('myModal') modalElement!: ElementRef;
  constructor(private _tvShoesService: TvShowsService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService,
    private router: Router) {


      
  }

  closeModelAutomatically() {
    const modal: any = this.modalElement.nativeElement;
    modal.click();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.temp = [];
      this.paginatedPosters = [];
      this.loading = true;
      this.paginationMap = new Map();
      //this.genres = [];
      if (typeof id === 'undefined' || id == 0) {
        this.selectedCategory = { _id: '', name: "All TV Shows" };
      } else {
        this.selectedCategory = { _id: id, name: "" };
      }
      this.getTvShowCategories();
      this.loadTvShowPageData({ page: 1, limit: 30, category: this.selectedCategory?._id!, order: 'latest_order', alphabeticOrder: 'z' });
      
      window.addEventListener('scroll', this.scroll, true);
      this.selectItem();
    });
    this.location.replaceState('/');
  }

  ngAfterViewInit(): void {
    console.log(this.modalElement);
    //this.selectItem();
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);

  }
  selectItem() {
    setTimeout(() => {
      if (this.aside) {
        const aside = this.aside.nativeElement;
        const selectedItem = aside.querySelector('.genre-submenu_selected') as HTMLElement;;
        if (selectedItem) {
          const scrollTop = selectedItem.offsetTop;
          document.getElementsByClassName('genre-submenu_genre_submenu_scrollable')[0].scrollTop = scrollTop;
        }
      }
    },
      1000);

  }
  scroll = (event: any): void => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if(this.paginatedPosters.length == 0){
      // no need to check for scroll end for pagination. since it may be new genre clicked or no records found for selected genre
      return;
    }
    if (!this.paginationLoading && !this.pausePagination) {
      if (windowBottom >= docHeight) {
        // console.log("do something when scroll to the bottom of the page");
        //this.dataloading = true;
        this.paginationLoading = true;
        this.loadTvShowPageData({ page: this.getNextPageNumber() + 1, limit: 30, category: this.selectedCategory?._id!, order: 'latest_order', alphabeticOrder: 'z' });
        
      }
    }
  };
  getDetails(tvShow: TvShow) {
    if (typeof tvShow !== 'undefined') {
      tvShow.type = VideoTypes.Series;
      this.sharedService.setSharedObject(tvShow);
      this.router.navigate(['/details']);
    }
  }
  onCategoryClick(category: Category) {
    this.paginationMap = new Map();
    this.paginationLoading = false;
    this.dataloading = true;
    this.pausePagination = false;
    this.selectedCategory = category;
    this.getCategoryById(category._id);
    this.closeModelAutomatically();

  }
  getTvShowCategories() {
    this.categories = [];
    this._categoryService.getCategoriesByChoice({ 'id': 3 }).subscribe({
      next: (resp: Category[]) => {
        this.categories.push({ _id: '', name: 'All TV Shows' })
        resp.forEach(category => {
          this.categories.push(category);
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {

        console.log("completed loading movies categories");
      }
    })
  }
  chunkArray<T>(posters: Poster[], size: number): any {
    const results: any = [];
    for (let i = 0; i < posters.length; i += size) {
      const chunk = posters.slice(i, i + size);
      results.push(chunk);
    }

    return results;
  }
  getCategoryById(id: any) {

    console.log(id);
    this.currentPage = 0;
    this.temp = [];
    this.tvShows = [];
    this.paginatedPosters = [];
    this.paginationMap = new Map();
    this.loadTvShowPageData({ page: 1, limit: 30, category: id, order: 'latest_order', alphabeticOrder: 'z' });
    window.scrollTo(0, 0);
  }
  getNextPageNumber(): number {
    if(this.paginationMap.size === 0) return -1;
    const keysArray = Array.from(this.paginationMap.keys());
    return keysArray[keysArray.length - 1]; 
   
  }
  loadTvShowPageData(data: { page: number, limit: number, category: string, order: string, alphabeticOrder: string }): void {
    // this.posters =[];
    console.log('data', data);
    // if(msg == 'fromGenre'){
    //  this.posters =[];
    // }
    this._tvShoesService.getWebShowsByCategory(data).subscribe({
      next: (resp: TvShowResponseBody) => {
        console.log(resp);
        if (resp && resp.webshows!.length>0) {
         
          //console.log(JSON.stringify(filteredMovies));
          this.tvShows = [...this.temp, ...resp.webshows!];
          this.temp = this.tvShows;
          this.paginationMap.set(resp.currentPage! , resp.webshows!);
          //this.paginatedPosters = this.chunkArray(this.temp, 30);
          this.paginatedPosters.push(resp.webshows!);
        }
        else {
          this.pausePagination = true;
        }

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
        this.dataloading = false;
        this.paginationLoading = false;
        console.log("completed");
      }
    })
  }
}

