import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  terms: string="";
  page: number = 1;
  trendingMovies: any[] = [];
  trendingTv: any[] = [];
  trendingPeople: any[] = [];
  imgPrefx: string = "https://image.tmdb.org/t/p/w500";
  constructor(private _MoviesService: MoviesService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  searchForm: FormGroup = new FormGroup({
    "term": new FormControl(null, [Validators.pattern(/^((?!(<|>)).)+$/)])
  })

  search(searchForm:FormGroup){
    if(searchForm.valid){
      this.terms = searchForm.controls.term.value;
    }
    else{
      this.toastr.error(`Error invalid input(<>)!`, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
    }
    
  }

  ngOnInit(): void {
    this.spinner.show();
    this._MoviesService.getTrending("movie",this.page).subscribe((response) => {
      this.trendingMovies = response.results.splice(0, 10);
      this.spinner.hide();
    },
    (error:any)=>{
      this.spinner.hide();
    })
    this._MoviesService.getTrending("tv",this.page).subscribe((response) => {
      this.trendingTv = response.results.splice(0, 10);
      this.spinner.hide();
    },
    (error:any)=>{
      this.spinner.hide();
    })
    this._MoviesService.getTrending("people",this.page).subscribe((response) => {
      this.trendingPeople = response.results.splice(0, 10);
      this.spinner.hide();
    },
    (error:any)=>{
      this.spinner.hide();
    })
  }
}
