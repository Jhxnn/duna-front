import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DuneService } from '../../services/api/dune';
import { DuneResponseDto } from '../../models/dune';

@Component({
  selector: 'app-duna',
  imports: [NgIf],
  template: `
    <h2>Minha Duna</h2>
    <div *ngIf="loading">Carregando...</div>
    <div *ngIf="error" style="color:red;">{{ error }}</div>
    <div *ngIf="data">
      <p>Total de pontos: <strong>{{ data.totalPoints }}</strong></p>
    </div>
  `,
  styles: ``,
})
export class Duna implements OnInit {
  private readonly duneService = inject(DuneService);
  data: DuneResponseDto | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.duneService.getSummary().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar a Duna';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
