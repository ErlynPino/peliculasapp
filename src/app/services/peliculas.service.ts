import { Injectable, Pipe } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera.interface';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private URL= 'https://api.themoviedb.org/3'
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGI4Zjc4ZjY5ZWFiOTBjZmQ0MGVhZGI5YWZkNzE4ZCIsInN1YiI6IjY1ZjRkOGQxMTY4NGY3MDE3ZGJiZTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PElIJas4lnJRW5KO2B9tV1VqmPLrN8H9bUvHXYUkFY'
  private headers = {Authorization:`Bearer ${this.apiKey}`};
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http:HttpClient) { }

  getCartelera():Observable<Movie[]>{

    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.URL}/movie/now_playing?language=es-ES&page=${this.carteleraPage}`,{headers:this.headers}).pipe(
      map((response:any)=> response.results),
      tap(()=> {
        this.carteleraPage+=1;
        this.cargando = false;
      })
    )
  }

  buscarPeliculas(texto:string):Observable<Movie[]>{
    return this.http.get<CarteleraResponse>(`${this.URL}/search/movie?query=${texto}&language=es-ES&page=1`,{headers:this.headers})
    .pipe( map(res=>res.results))
  }
}
