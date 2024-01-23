import { IUbicacion } from './iubicacion.interface';

export interface IActivo {
  id: string;
  nombre: string;
  descripcion: string;
  fechaAdquisicion: Date;
  valorCompra: number;
  valorLibro: number;
  valorMercado: number;
  estado: string;
  ubicacion: IUbicacion;
}
