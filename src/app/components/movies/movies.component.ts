import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Movie } from 'src/app/interfaces/movies';
import { Observable, Subscription, debounceTime, distinct, filter, fromEvent, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies:Movie[] = [];
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef;
  //Con el observable se subscribe solo
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      //Nos da el value del input
      map((event: Event) => {
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm;
      }),
      //Nos filtra los inputs mayores de 3 elementos
      filter((searchTerm: string) => searchTerm.length > 3),
      //Cuando se pare de escribir por medio segundo, se hará la petición
      debounceTime(500),
      //Si la palabra anterior es igual a la actual, no se ejecutará la busqueda
      distinct(),
      //si se hace una busqueda, y no termina, y se hace una busqueda más, se cancelará la anterior búsqueda
      switchMap((searchTerm: string) => this.movieService.getMovies(searchTerm) ),
      //No smuestra en la consola el valor del input
      // tap((searchTerm: string) => console.log(searchTerm))
    )
  }
}
