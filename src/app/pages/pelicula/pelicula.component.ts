import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../interfaces/details.interface';
import { combineLatest } from 'rxjs';
import { Cast } from '../../interfaces/credits.interface';
import { PipesModule } from '../../pipes/pipes.module';
import { CastSlideShowComponent } from '../../components/cast-slide-show/cast-slide-show.component';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, PipesModule, CastSlideShowComponent],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent implements OnInit{
  pelicula?:MovieDetails;
  cast: Cast[] = [];

  constructor(private activedRoute: ActivatedRoute, private peliculaSvc:PeliculasService){}

  ngOnInit(): void {
    const {id} = this.activedRoute.snapshot.params;
    combineLatest([this.peliculaSvc.peliculaDetalle(id), this.peliculaSvc.peliculaCredits(id)]).subscribe(
      ([movie, cast])=>{
        if (movie === null || cast === null) {
          console.error('Error: La pelicula o el reparto no se encontraron');
          return;
        }
        this.pelicula = movie;
        this.cast = cast;
      })
  }

  getStars(voteAverage:number){
    const startCount = Math.floor(voteAverage);
    return Array(startCount).fill(0);
  }

  regresar(){
    window.history.back();
  }

}
