import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poster } from 'src/app/model/poster';
import { MovieService } from 'src/app/services/movie.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { AppContants } from 'src/app/utils/app-contants';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';
import { MovieResponseBody } from 'src/app/model/movie-response-body';
import { Movie } from 'src/app/model/movie';
import { VideoTypes } from 'src/app/video-types';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('aside') aside: ElementRef<HTMLElement> | undefined;
  loading: boolean = true;
  dataloading: boolean = false;
  paginationLoading: boolean = false;
  currentPage: number = 0;
  categories: Category[] = [];
  movies: Movie[] = [];
  temp: Movie[] = [];
  paginatedPosters: any = [];
  paginationMap: Map<number, Movie[]> = new Map();
  pausePagination: boolean = false;
  selectedCategory: Category = { _id: '', name: "All Movies" };
  switchlang = 'en'
  isClicked: boolean = false;
  @ViewChild('myModal') modalElement!: ElementRef;

  constructor(private _movieService: MovieService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService,
    private router: Router,
    private elementref: ElementRef
  ) {

  }
  closeModelAutomatically() {
    const modal: any = this.modalElement.nativeElement;
    modal.click();
  }
  ngAfterViewInit(): void {
    console.log(this.modalElement);
    //this.selectItem();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.temp = [];
      this.paginatedPosters = [];
      this.paginationMap = new Map();
      const id = params['id'];
      this.loading = true;
      //this.genres = [];
      if (typeof id === 'undefined' || id == 0) {
        this.selectedCategory = { _id: '', name: "All Movies" };
      } else {
        this.selectedCategory = { _id: id, name: "" };
      }

      this.getMoviesCategories();
      this.loadMoviePageData({ page: 1, limit: 30, category: this.selectedCategory?._id!, order: 'latest_order', alphabeticOrder: 'z' });
      
      window.addEventListener('scroll', this.scroll, true);
      this.selectItem();
    });
    this.location.replaceState('/');

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
   
    if (this.paginationMap.size == 0) {
      // no need to check for scroll end for pagination. since it may be new genre clicked or no records found for selected genre
      return;
    }
    if (!this.paginationLoading && !this.pausePagination) {
      if (windowBottom >= docHeight) {
        // console.log("do something when scroll to the bottom of the page");
        this.paginationLoading = true;
        this.loadMoviePageData({ page: this.getNextPageNumber() + 1, limit: 30, category: this.selectedCategory?._id!, order: 'latest_order', alphabeticOrder: 'z' });
      }
    }

  };
  getDetails(movie: Movie) {
    if (typeof movie !== 'undefined') {
      movie.type = VideoTypes.Movie;
      this.sharedService.setSharedObject(movie);
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
  getMoviesCategories() {
    this.categories = [];
    this._categoryService.getCategoriesByChoice({ 'id': 2 }).subscribe({
      next: (resp: Category[]) => {
        this.categories.push({ _id: '', name: 'All Movies' })
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
    this.movies = [];
    this.paginatedPosters = [];
    this.paginationMap = new Map();
    this.loadMoviePageData({ page: 1, limit: 30, category: id, order: 'latest_order', alphabeticOrder: 'z' });

    window.scrollTo(0, 0);
  }
  getNextPageNumber(): number {
    if (this.paginationMap.size === 0) return -1;
    const keysArray = Array.from(this.paginationMap.keys());
    return keysArray[keysArray.length - 1];

  }
  loadMoviePageData(data: { page: number, limit: number, category: string, order: string, alphabeticOrder: string }): void {

    console.log('data', data);

    this._movieService.getMoviesByCategory(data).subscribe({
      next: (resp: MovieResponseBody) => {
        console.log(resp);
        if (resp && resp.movies!.length>0) {
         
          //console.log(JSON.stringify(filteredMovies));
          this.movies = [...this.temp, ...resp.movies!];
          this.temp = this.movies;
          this.paginationMap.set(resp.currentPage! , resp.movies!);
          //this.paginatedPosters = this.chunkArray(this.temp, 30);
          this.paginatedPosters.push(resp.movies!);
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
        //this.selectItem();
        console.log("completed");
      }
    })
  }



}
