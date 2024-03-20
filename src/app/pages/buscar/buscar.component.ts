import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeliculasPosterComponent } from '../../components/peliculas-poster/peliculas-poster.component';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interface';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, PeliculasPosterComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit{

  texto = '';
  movie: Movie[] = [];
  noMovie = ''

  constructor(private activeRouter:ActivatedRoute, private peliculasSvc:PeliculasService){}



  ngOnInit(): void {
      this.activeRouter.params.subscribe(params => {
        this.texto = params['texto'];
        this.peliculasSvc.buscarPeliculas(this.texto).subscribe(movie => {
          this.movie = movie;
          this.noMovie = this.movie.length === 0 ? 'No se encontraron peliculas' : '';
        })
      })
  }

}
