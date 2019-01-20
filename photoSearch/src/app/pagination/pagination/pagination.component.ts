import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Pagination } from '../../modes/model';


const Constants = {
  RECORDSPERPAGE: 10,
  QPStatusIDForBorrowQP: '2',
  QPStatusForBorrowQP: 'Awaiting Standards Approval',
  PMKVY: 'pmkvy',
  FEE_BASED: 'feeBased'
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() count: number;
  @Input() defaultRecordsPerPage: number;
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() recordsPerPage: EventEmitter<number> = new EventEmitter<number>();
  @Input() pagination: Pagination;
  pages: number[] = [];
  perpage = 15;
  paginationCtrls = {
    next: false,
    prev: false,
    last: false,
    first: false
  };

  activePageIndex = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultRecordsPerPage || changes.count) {
      // if (this.count > 10000) {
      // 	this.count = 1000;
      // }
      this.createPagination();
      this.createPaginationNumbers();
    }

  }
  ngOnInit() {
  }

  get shouldVisible() {
    // return true;
    return this.count >= 15;
  }

  createPagination() {
    this.perpage = this.defaultRecordsPerPage || this.perpage || Constants.RECORDSPERPAGE;
    if (!this.count || !this.perpage) {
      return;
    }
    const len: number = Math.ceil(this.count / this.perpage);
    const pages = new Array(len);
    this.pages = Array.from(pages, (x, i) => i + 1);
    this.goToFirstPage();
  }
  createPaginationNumbers() {
    this.perpage = this.defaultRecordsPerPage || this.perpage || Constants.RECORDSPERPAGE;
    if (!this.count || !this.perpage) {
      return;
    }
    const len: number = Math.ceil(this.count / this.perpage);
    const pages = new Array(len);
    this.pages = Array.from(pages, (x, i) => i + 1);
  }
  goToNextPage(): void {
    const index = this.activePageIndex;
    const len = this.pages.length;
    const nextIndex = index === (len - 1) ? index : index + 1;
    this.sendPageNo(nextIndex);
  }

  goToPreviousPage(): void {
    const index = this.activePageIndex;
    const nextIndex: number = index === 0 ? index : index - 1;
    this.sendPageNo(nextIndex);
  }

  goToLastPage(): void {
    this.sendPageNo(this.pages.length - 1);
  }

  goToFirstPage(): void {
    this.sendPageNo(0);
  }


  sendPageNo(nextIndex: number): void {

    if (this.activePageIndex === nextIndex) {
      return;
    }

    this.activePageIndex = nextIndex;
    const pageNumber = this.activePageIndex + 1;
    this.pageNumber.emit(pageNumber);
    this.createPaginationNumbers();
  }
  sendPerPage() {
    // console.log(this.perpage);
    const recordsPerPage = this.perpage;
    // this.items = this.perpage;
    this.recordsPerPage.emit(recordsPerPage);
    this.createPagination();
  }

  calculatePageCtrlStates(): void {
    const { length } = this.pages;
    const index = this.activePageIndex;

    // console.log(length, index);
/**
		 * If Index is 0 means.. if the active element is
		 * first one disable prev and gotoFirst ctrl...
		 */
    if (index === 0) {
      this.paginationCtrls = {
        next: false,
        prev: true,
        last: false,
        first: true
      };
    }

		/**
		 * If Index is equals to length means.. if the active element is
		 * last one disable next and gotoLast ctrl...
		 */
    if (index === length - 1) {
      this.paginationCtrls = {
        next: true,
        prev: false,
        last: true,
        first: false
      };
    }

		/**
		 * If itsn't in the first or in last... then enable all controlls..
		 */
    if ((index !== 0) && (index !== length - 1)) {
      Object.keys(this.paginationCtrls).forEach(key => this.paginationCtrls[key] = false);
    }

		/**
		 * If Only One Page Exist , Disable All Controlls...
		 */
    if (length === 1) {
      Object.keys(this.paginationCtrls).forEach(key => this.paginationCtrls[key] = true);
    }
  }
}
