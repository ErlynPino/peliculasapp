import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interface';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { PeliculasPosterComponent } from '../../components/peliculas-poster/peliculas-poster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, PeliculasPosterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{

  movies: Movie[]=[];

  constructor(private peliculasSvc: PeliculasService){}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(){
    this.peliculasSvc.getCartelera().subscribe(res=>{
      this.movies = res;
    })
  }

}
