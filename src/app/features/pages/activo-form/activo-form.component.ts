import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivoHttpService } from '../../services/activo.service';
import { IUbicacion } from '../../interfaces/iubicacion.interface';
import { UbicacionHttpService } from '../../services/ubicacion.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activo-form',
  templateUrl: './activo-form.component.html',
  styleUrls: ['./activo-form.component.scss'],
})
export class ActivoFormComponent {
  public myForm: FormGroup;
  public ubicaciones: IUbicacion[];

  constructor(
    private formBuilder: FormBuilder,
    private activoService: ActivoHttpService,
    private ubicacionService: UbicacionHttpService,
    public dialogRef: MatDialogRef<ActivoFormComponent>
  ) {
    this.myForm = this.formBuilder.group({});
    this.ubicaciones = [];
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaAdquisicion: [null, Validators.required],
      valorCompra: [null, [Validators.required, Validators.min(0)]],
      valorLibro: [null, [Validators.required, Validators.min(0)]],
      valorMercado: [null, [Validators.required, Validators.min(0)]],
      estado: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
    this.ubicacionService.getAll().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones;
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      return;
    }
    const formData = this.myForm.value;
    this.activoService.create(formData).subscribe((val) => {
      this.dialogRef.close();
    });
  }
}
