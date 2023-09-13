import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { I18nService } from 'src/app/services/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/model/category';


@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  movieCategoryGroup: any[] = [];
  tvShowCategoryGroup: any[] = [];
  webSerieCategoryGroup: any[] = [];
  currentPath: string = "";
  currentUrl: string = '';
  userLoggedIn: boolean = false;
  isClicked: boolean = false;
  switchlang = 'en'
  translatedHeader: any;
  translations: any = {};
  showDropdown: boolean = false;

  isDropdownOpen: boolean = false;
  dropdownOpen: boolean = false;

  constructor(private _categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _authService: AuthService,
    private location: Location,
    private i18nService: I18nService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang(this.switchlang);
  }

  ngOnInit(): void {
    this.movieCategoryGroup = [];
    this.tvShowCategoryGroup = [];
    this.webSerieCategoryGroup = [];
    this.loadMovieCategories();

    this.checkUserLoginStatus();
    this.translatedHeader = this.i18nService.getTranslatedData();
    //  this.translatedHeader = this.i18nService.translate.instant('HEADER');

  }
  toggleClick(): void {
    this.isClicked = !this.isClicked;
  }
  doLogout(): void {
    console.log('clicked');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      minWidth: "400px",
      data: {
        title: "Logout",
        message: "Are you sure you want to logout?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {

      console.log(dialogResult);
      if (dialogResult) {
        this._authService.doLogout().subscribe({
          complete: () => {
            this.userLoggedIn = false;
            // this.router.navigate(['new-home']);
            // location.reload();
            window.location.href = '/new-home';
          }
        });
      }

    });

  }
  getLoggedInUser(): string {
    return localStorage.getItem("username")!;
  }
  checkUserLoginStatus(): void {
    this._authService.check()
      .subscribe(_authenticated => {

        if (!_authenticated) {
          console.log(" Not logged in");
          this.userLoggedIn = false;
        } else {
          this.userLoggedIn = true;
        }


      })
      ;
  }
  chunkArray<T>(categories: Category[], size: number): any {
    const results: any = [];
    for (let i = 0; i < categories.length; i += size) {
      const chunk = categories.slice(i, i + size);
      results.push(chunk);
    }

    return results;
  }

  loadMovieCategories(): void {

    // load tv show categories
    this._categoryService.getCategoriesByChoice({ 'id': 3 }).subscribe({
      next: (resp: Category[]) => {
        var categories = [];
        categories.push({ _id: '', name: "All TV Shows" });
        resp.forEach(category => {
          categories.push(category);
        });
        this.tvShowCategoryGroup = this.chunkArray(categories, 10);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {

        console.log("completed loading tv shows categories");
      }
    })
    // load movies category
    this._categoryService.getCategoriesByChoice({ 'id': 2 }).subscribe({
      next: (resp: Category[]) => {
        var categories = [];
        categories.push({ _id: '', name: "All Movies" });
        resp.forEach(category => {
          categories.push(category);
        });
        this.movieCategoryGroup = this.chunkArray(categories, 10);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {

        console.log("completed loading movies categories");
      }
    })
    // load web series categories
    this._categoryService.getCategoriesByChoice({ 'id': 3 }).subscribe({
      next: (resp: Category[]) => {
        this.webSerieCategoryGroup = this.chunkArray(resp, 10);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {

        console.log("completed loading web series categories");
      }
    })

  }

  openSignInDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {};
    const signInDialog = this.dialog.open(SignInComponent, dialogConfig);
    signInDialog.afterClosed().subscribe((res) => {
      this.checkUserLoginStatus();
    });
  }
  search(): void {
    this.router.navigate(['/search']);
  }

  loadTranslations() {
    this.translatedHeader = this.i18nService.translate('HEADER');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang); // Set the selected language
  }
  onLanguageChange(event: any) {
    this.switchlang = event.target.value;
    this.translate.use(this.switchlang);
    this.cdr.detectChanges();


    this.translate.get(['HEADER']).subscribe((translatedTexts: any) => {
      this.translations = translatedTexts;


    });


  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  // openDropdown() {
  //   this.dropdownOpen = true;
  //   setTimeout(() => {
  //       this.dropdownOpen = false;
  //   }, 3000); // 1000 milliseconds = 1 second
  // }
}











