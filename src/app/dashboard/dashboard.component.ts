import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MatSort } from '@angular/material/sort';
import { IBook } from '../models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  allBooks: IBook[] = [];
  userData?: IUser;

  displayedColumns: string[] = [
    'title',
    'genre',
    'description',
    'rating',
    'noOfPages',
    'bookUpdate',
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  flag = false;
  dataSource!: MatTableDataSource<any>;
  showFiller = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalService
  ) {}

  ngOnInit(): void {
    this.flag = false;
    this.userData = this.localStorageService.getData('userData');
    if (!this.userData) {
      this.router.navigateByUrl('/login');
    }
    if (this.userData?.isAdmin) {
      this.displayedColumns.push('deleteBook');
    }
    this.getData();
  }

  deleteBook(selectedBook: IBook): void {
    if (window.confirm('Are you sure you want to delete this book ?')) {
      this.flag = false;
      this.bookService
        .deleteBook(selectedBook.bookId.toString())
        .subscribe((result) => {
          this.allBooks = result;
          this.dataSource = new MatTableDataSource(result);
          // this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.flag = true;
          alert('Book has been deleted');
        });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(): void {
    this.flag = false;
    this.dataSource = new MatTableDataSource();
    setTimeout(() => {
      this.bookService.getAllBooks().subscribe((result: IBook[]) => {
        this.allBooks = result;
        this.dataSource = new MatTableDataSource(this.allBooks);
        // this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.flag = true;
      });
    }, 0);
  }

  openDialog(bookSelected: IBook): void {
    let modalRef = this.dialog.open(BookDetailsComponent, {
      data: bookSelected,
    });

    modalRef.updateSize('500px');
    modalRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  addNewBook() {
    let modalRef = this.dialog.open(BookDetailsComponent, {
      data: {},
    });

    modalRef.updateSize('500px');
    modalRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  issueBook(selectedBook: IBook): void {
    this.bookService
      .issueBook(selectedBook.bookId.toString())
      .subscribe((result) => {
        alert(result.message);
      });
  }

  // ngAfterViewInit(): void {
  //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  //    merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         // return this.exampleDatabase!.getRepoIssues(
  //         //   this.sort.active,
  //         //   this.sort.direction,
  //         //   this.paginator.pageIndex,
  //         // )

  //         return this.bookService.getAllBooks().pipe(catchError(() => observableOf(null)));
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = data === null;

  //         if (data === null) {
  //           return [];
  //         }

  //         // Only refresh the result length if there is new data. In case of rate
  //         // limit errors, we do not want to reset the paginator to zero, as that
  //         // would prevent users from re-triggering requests.
  //         this.resultsLength = data.length;
  //         return data;
  //       }),
  //     )
  //     .subscribe(data => (this.allBooks = data));
  // }
  // }
}
