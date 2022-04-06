import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

export interface SearchResData {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  first_air_date: string;
  vote_average: string;
  release_date: string;
}

export interface TopRatedTvData {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  vote_average: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  topRated: TopRatedTvData[] = [];  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: SearchResData[] = [];
  searchStr: string | undefined;

  constructor(private movieService: MoviesService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.getTopRatedMovies(1);
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event:any) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchStr!).subscribe(res => {
      this.searchRes = res.results;
    });
  }


}