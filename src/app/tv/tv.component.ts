import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  totalPages: number = 1;
  visablePages: any[] = [];
  currentPage: number = 1;
  terms: string="";
  trendingTv:any[]=[];
  imgPrefx:string = "https://image.tmdb.org/t/p/w500";

  constructor(private _MoviesService:MoviesService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  
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
    if(sessionStorage.getItem("currentPageTV")!=null){
      this.currentPage=Number(sessionStorage.getItem("currentPageTV"));
    }
    this.getTv(this.currentPage);
  }

  getTv(page: number) {
    this.currentPage = page;
    this.spinner.show();
    this._MoviesService.getTrending("tv", page).subscribe((response) => {
      this.trendingTv = response.results;
      this.totalPages = response.total_pages;
      this.setPages();
      this.spinner.hide();
    },
      (error: any) => {
        this.spinner.hide();
      })

  }

  setPages() {
    if (this.currentPage == 1) {
      if (this.totalPages == 1) {
        this.visablePages = [1];
      }
      else if (this.totalPages == 2) {
        this.visablePages = [1, 2];
      }
      else {
        this.visablePages = [1, 2, 3];
      }
    }else if(this.currentPage > 1 && this.currentPage <= this.totalPages-2){
      this.visablePages = [this.currentPage, this.currentPage+1, this.currentPage+2];
    }else if(this.currentPage > 1 && this.currentPage == this.totalPages-1){
      this.visablePages = [this.currentPage-1, this.currentPage, this.currentPage+1];
    }else if(this.currentPage > 1 && this.currentPage == this.totalPages){
      this.visablePages = [this.currentPage-2, this.currentPage-1, this.currentPage];
    }
  }

  changePage(term: any) {
    if (term == "next" && this.visablePages.includes(this.totalPages) == false) {
      this.visablePages.forEach((part, index) => { this.visablePages[index]++ });
      this.getTv(this.currentPage + 1);
    }
    else if (term == "prev" && this.visablePages[0] > 1) {
      this.visablePages.forEach((part, index) => { this.visablePages[index]-- })
      this.getTv(this.currentPage - 1);
    }
    else if (term == "prev" && this.currentPage > 1) {
      this.getTv(this.currentPage - 1);
    }
    else if (term == "next" && this.currentPage < this.totalPages) {
      this.getTv(this.currentPage + 1);
    }
    sessionStorage.setItem("currentPageTV",JSON.stringify(this.currentPage));
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getTv(page);
    sessionStorage.setItem("currentPageTV",JSON.stringify(this.currentPage));
  }

  getLastPage(term: string) {
    if (term == "last") {
      if (this.totalPages == 1) {
        this.visablePages = [1];
      }
      else if (this.totalPages == 2) {
        this.visablePages = [1, 2];
      }
      else {
        this.visablePages = [this.totalPages - 2, this.totalPages - 1, this.totalPages];
      }
      this.getTv(this.totalPages);
    }
    else if (term == "first") {
      if (this.totalPages == 1) {
        this.visablePages = [1];
      }
      else if (this.totalPages == 2) {
        this.visablePages = [1, 2];
      }
      else {
        this.visablePages = [1, 2, 3];
      }
      this.getTv(1);
    }
    sessionStorage.setItem("currentPageTV",JSON.stringify(this.currentPage));
  }

}
