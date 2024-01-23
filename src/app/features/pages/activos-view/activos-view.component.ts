import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { IActivo } from '../../interfaces/iactivo.interface';
import { ActivoHttpService } from '../../services/activo.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivoFormComponent } from '../activo-form/activo-form.component';

@Component({
  selector: 'app-activos-view',
  templateUrl: './activos-view.component.html',
  styleUrls: ['./activos-view.component.scss'],
})
export class ActivosViewComponent {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  activos: IActivo[] = [];
  viewSelected: boolean;

  constructor(
    private activoService: ActivoHttpService,
    public dialog: MatDialog
  ) {
    this.activos = [];
    this.viewSelected = false;
  }

  ngOnInit(): void {
    this.activoService.getAll().subscribe((activos) => {
      this.activos = activos;
      this.createChart();
    });
  }

  public createChart(): void {
    this.viewSelected = false;
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(element).select('svg').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(this.activos.map((activo) => activo.nombre))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.activos, (activo) =>
          Math.max(activo.valorCompra, activo.valorLibro)
        ) || 10,
      ])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create bars
    svg
      .selectAll('.bar')
      .data(this.activos)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (activo) => xScale(activo.nombre)!)
      .attr('width', xScale.bandwidth())
      .attr('y', (activo) =>
        yScale(Math.max(activo.valorCompra, activo.valorLibro))
      )
      .attr(
        'height',
        (activo) =>
          height - yScale(Math.max(activo.valorCompra, activo.valorLibro))
      )
      .attr('fill', () => colorScale(Math.random().toString()));

    // Create x-axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append('g').call(d3.axisLeft(yScale));
  }

  createActivo() {
    const dialog = this.dialog.open(ActivoFormComponent);
    dialog.afterClosed().subscribe(() => {
      this.activoService.getAll().subscribe((activos) => {
        this.activos = activos;
        if (!this.viewSelected) {
          this.createChart();
        } else {
          this.createChartByUbicacion();
        }
      });
    });
  }

  public createChartByUbicacion(): void {
    this.viewSelected = true;
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing SVG element
    d3.select(element).select('svg').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Extract the 'nombre' property from each ubicacion
    const ubicaciones: string[] = this.activos.map(
      (activo) => activo.ubicacion.nombre
    );

    // Group data by ubicacion and count the occurrences
    const ubicacionCounts = d3.rollup(
      this.activos,
      (v) => v.length,
      (d) => d.ubicacion.nombre
    );

    // Convert the map to an array of { ubicacion, count } objects
    const data = Array.from(ubicacionCounts, ([ubicacion, count]) => ({
      ubicacion,
      count,
    }));

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(ubicaciones)
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 1])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.ubicacion)!)
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => height - yScale(d.count))
      .attr('fill', () => colorScale(Math.random().toString()));

    // Create x-axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append('g').call(d3.axisLeft(yScale));
  }
}
