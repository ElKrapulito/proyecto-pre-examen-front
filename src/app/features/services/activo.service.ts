import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../core/services/base-service.service';
import { IActivo } from '../interfaces/iactivo.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivoHttpService extends BaseService<IActivo> {
  protected override url: string = 'activo';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
