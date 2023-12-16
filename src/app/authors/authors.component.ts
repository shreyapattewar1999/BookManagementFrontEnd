import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'address', 'email', 'contactNumber'];
  flag = false;
  allAuthors: any[] = [];
  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.getAllAuthorsData();
  }

  getAllAuthorsData(): void {
    this.flag = false;
    this.dataSource = new MatTableDataSource();
    setTimeout(() => {
      this.authorService.getAuthors().subscribe((result: any) => {
        this.allAuthors = result;
        const tempData: any[] = [];
        result.data?.forEach((element: any) => {
          tempData.push({
            ...element,
            ['name']: element.firstName + ' ' + element.lastName,
            ['address']:
              element.address.street +
              ', ' +
              element.address.district +
              ', ' +
              element.address.state +
              ', ' +
              element.address.postalCode,
            ['email']: element.address.emailAddress,
            ['contactNumber']: element.address.contactNumber,
          });
        });
        this.dataSource = new MatTableDataSource(tempData);
        this.flag = true;
      });
    }, 0);
  }
}
