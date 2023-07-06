import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../interfaces/movies';
import { ApiResponse } from '../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  //key 2e72c9be

  private API_URL: string = 'http://www.omdbapi.com/?apikey=2e72c9be'

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string): Observable<Movie[]>{
    return this.http.get<ApiResponse>(`${this.API_URL}&s=${searchTerm}`).pipe(
      map(response => {
        return response.Search;
      })
    )
  }
}
