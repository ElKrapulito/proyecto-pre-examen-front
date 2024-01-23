import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ActivosViewComponent } from './features/pages/activos-view/activos-view.component';
import { ActivoFormComponent } from './features/pages/activo-form/activo-form.component';
import { ActivoHttpService } from './features/services/activo.service';
import { UbicacionHttpService } from './features/services/ubicacion.service';

@NgModule({
  declarations: [AppComponent, ActivosViewComponent, ActivoFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
  ],
  providers: [ActivoHttpService, UbicacionHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
