import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  totalPages: number = 1;
  visablePages: any[] = [];
  currentPage: number = 1;
  terms:string="";
  trendingPeople:any[]=[];
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
    if(sessionStorage.getItem("currentPagePeople")!=null){
      this.currentPage=Number(sessionStorage.getItem("currentPagePeople"));
    }
    this.getPeople(this.currentPage);
  }

  
  getPeople(page: number) {
    this.currentPage = page;
    this.spinner.show();
    this._MoviesService.getTrending("people", page).subscribe((response) => {
      this.trendingPeople = response.results;
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
      this.getPeople(this.currentPage + 1);
    }
    else if (term == "prev" && this.visablePages[0] > 1) {
      this.visablePages.forEach((part, index) => { this.visablePages[index]-- })
      this.getPeople(this.currentPage - 1);
    }
    else if (term == "prev" && this.currentPage > 1) {
      this.getPeople(this.currentPage - 1);
    }
    else if (term == "next" && this.currentPage < this.totalPages) {
      this.getPeople(this.currentPage + 1);
    }
    sessionStorage.setItem("currentPagePeople",JSON.stringify(this.currentPage));
  }

  getCurrentPage(page: number) {
    this.currentPage = page;
    this.getPeople(page);
    sessionStorage.setItem("currentPagePeople",JSON.stringify(this.currentPage));
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
      this.getPeople(this.totalPages);
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
      this.getPeople(1);
    }
    sessionStorage.setItem("currentPagePeople",JSON.stringify(this.currentPage));
  }


}
