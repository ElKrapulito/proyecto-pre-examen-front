import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoFormComponent } from './features/pages/activo-form/activo-form.component';
import { ActivosViewComponent } from './features/pages/activos-view/activos-view.component';

const routes: Routes = [
  {
    path: 'activos-view',
    component: ActivosViewComponent,
  },
  {
    path: '',
    redirectTo: 'activos-view',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
