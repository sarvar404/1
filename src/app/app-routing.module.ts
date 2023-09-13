import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noAuth.guard';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { PinVerificationGuard } from './guards/pin-verification.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'new-home' },

  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'new-home' },

  // {
  //   path: '', component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   children: [
  //     { path: 'details', loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule) }

  //   ]
  // },
  {
    path: '', component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'details', loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule)
      }
    ]
  },
  
      
      
    
  {
    path: '', component: LayoutComponent,
    children: [

      {
        path: 'livetv', loadChildren: () => import('./modules/livetv/livetv.module').then(m => m.LivetvModule)
      },
      {
        path: 'sportstv', loadChildren: () => import('./modules/sportstv/sportstv.module').then(m => m.SportstvModule)
      }

    ]
  },
  { path: 'top-header', loadChildren: () => import('./components/top-header/top-header.module').then(m => m.TopHeaderModule) },
  { path: 'new-home', loadChildren: () => import('./modules/new-home/new-home.module').then(m => m.NewHomeModule), data: { reuseStrategy: 'enabled', } },
  { path: 'movie-list', loadChildren: () => import('./modules/movie-list/movie-list.module').then(m => m.MovieListModule), data: { reuseStrategy: 'enabled', } },
  { path: 'tv-show-list', loadChildren: () => import('./modules/tv-show-list/tv-show-list.module').then(m => m.TvShowListModule), data: { reuseStrategy: 'enabled', } },
  { 
    path: 'genre-shows',canActivate: [AuthGuard,PinVerificationGuard], loadChildren: () => import('./modules/genre-shows/genre-shows.module').then(m => m.GenreShowsModule) 
  },
  { path: 'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule), data: { reuseStrategy: 'enabled', } },





  { path: '**', redirectTo: 'new-home' }

];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, GlobalService]
})
export class AppRoutingModule { }
