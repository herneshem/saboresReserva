import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactReserveComponent } from './pages/contact-reserve/contact-reserve.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminReservasComponent } from './pages/admin-reservas/admin-reservas.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reservas', component: ContactReserveComponent },
  { path: 'admin', component: AdminLoginComponent },
  {
  path: 'admin/reservas',
  component: AdminReservasComponent,
  canActivate: [adminGuard]
},
  { path: '**', redirectTo: '/home' }
];
