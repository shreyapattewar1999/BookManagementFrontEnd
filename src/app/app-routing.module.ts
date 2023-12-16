import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'books',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'swagger-mock',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
