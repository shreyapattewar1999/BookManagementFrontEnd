import { Component, OnInit } from '@angular/core';
import { IEndPoint } from '../models/endpoint.model';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../book.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-swagger-mock',
  templateUrl: './swagger-mock.component.html',
  styleUrl: './swagger-mock.component.css',
})
export class SwaggerMockComponent implements OnInit {
  bookEndPoints: IEndPoint[] = [];
  authorEndPoints: IEndPoint[] = [];

  output: any;
  form = new FormGroup({});

  constructor(
    private bookService: BookService,
    private authService: AuthenticationService
  ) {
    this.bookEndPoints = bookService.getBookEndPoints();
    this.authorEndPoints = bookService.getAuthorEndPoints();
    this.authService.updateShowMenuFlag(false);
  }

  ngOnInit(): void {
    this.bookEndPoints?.forEach((element) => {
      element.fields?.forEach((item) => {
        this.form.addControl(item.id, new FormControl(''));
      });
    });
  }

  executeApi(endpoint: IEndPoint): void {
    this.output = {};
    let requestBody = {};
    var index = 0;
    var currentEndPoint = endpoint.link;
    endpoint.fields?.forEach((element) => {
      if (element.isRequestParameters || element.isSearchParameters) {
        const fieldId = element.id || '';
        const fieldValue = this.form.get(fieldId)?.value;
        currentEndPoint = currentEndPoint.replace(
          '{' + index.toString() + '}',
          fieldValue
        );
        index += 1;
      } else {
        const fieldId = element.id || '';
        const fieldValue = this.form.get(fieldId)?.value;
        const fieldName1 = element.fieldName || '';
        requestBody = { ...requestBody, [fieldName1]: fieldValue };
      }
    });

    console.log(currentEndPoint);

    this.bookService.getData(currentEndPoint, endpoint, requestBody).subscribe({
      next: (output) => {
        console.log(output);
        this.output = output?.body;
        if (this.output.hasOwnProperty('description')) {
          delete this.output['description'];
        }
        this.output.forEach((element: any) => {
          if (element.hasOwnProperty('description')) {
            delete element['description'];
          }
        });
      },
      error: (error) => {
        this.output = { message: error?.error?.message };
      },
    });
  }
}

// if (endpoint.isSearchParameters) {
//   endpoint.searchParameters?.forEach((element) => {
//     const fieldId = element.id || '';
//     const fieldValue = this.form.get(fieldId)?.value;
//     currentEndPoint = currentEndPoint.replace(
//       '{' + index.toString() + '}',
//       fieldValue
//     );
//     index += 1;
//   });
// }
// if (endpoint.isBody) {
//   // requestBody
//   endpoint.bodyDetails?.forEach((element) => {
//     const fieldId = element.id || '';
//     const fieldValue = this.form.get(fieldId)?.value;
//     const fieldName1 = element.fieldName || '';
//     requestBody = { ...requestBody, [fieldName1]: fieldValue };
//   });
// }
