import { IUbicacion } from '../interfaces/iubicacion.interface';
import { BaseService } from '../../core/services/base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UbicacionHttpService extends BaseService<IUbicacion> {
  protected override url: string = 'ubicacion';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
