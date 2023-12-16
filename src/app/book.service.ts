import { Injectable } from '@angular/core';
import { IEndPoint } from './models/endpoint.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from './models/book.model';
import {
  BASE_URL,
  GET_ALL_BOOKS,
  UPDATE_BOOK,
  USER_API,
  ADD_BOOK,
  BOOKS_API,
  DELETE_BOOK_BY_ID,
  ISSUE_BOOK,
} from './constants';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalService
  ) {}

  getBookEndPoints(): IEndPoint[] {
    return [
      {
        link: 'api/books/{0}',
        methodType: 'GET',
        name: 'Get Book By ID',
        fields: [
          {
            displayName: 'Book ID',
            placeholder: 'Enter Book ID',
            isRequired: true,
            id: 'bookByBookId',
            isRequestParameters: true,
          },
        ],
      },
      // {
      //   link: 'api/books/{0}',
      //   methodType: 'PUT',
      //   name: 'Update Book Details',
      //   fields: [
      //     {
      //       displayName: 'Book ID',
      //       placeholder: 'Enter Book ID',
      //       isRequired: true,
      //       id: 'updatebookByBookId',
      //       isRequestParameters: true,
      //     },
      //   ],
      //   isRequestParameters: true,
      //   isBody: true,
      //   requestParameters: [
      //     {
      //       displayName: 'Book ID',
      //       placeholder: 'Enter Book ID',
      //       isRequired: true,
      //       id: 'updatebookByBookId',
      //     },
      //   ],
      // },
      {
        link: 'api/books/{0}',
        methodType: 'DELETE',
        name: 'Delete book by ID',
        fields: [
          {
            displayName: 'Book ID',
            placeholder: 'Enter Book ID',
            isRequired: true,
            id: 'deleteBookByBookId',
            isRequestParameters: true,
          },
        ],
      },
      {
        link: 'api/books/',
        methodType: 'GET',
        name: 'Get all books',
      },
      {
        link: 'api/books/',
        methodType: 'POST',
        name: 'Add new book',
        fields: [
          {
            id: 'newBookTitle',
            displayName: 'Book Title',
            placeholder: 'Enter Book Title',
            fieldName: 'bookTitle',
            isBody: true,
          },
          {
            id: 'newBookAuthorFname',
            displayName: 'Author First Name',
            placeholder: 'Enter first name of author',
            fieldName: 'authorFirstName',
            isBody: true,
          },
          {
            id: 'newBookAuthorLname',
            displayName: 'Author Last Name',
            placeholder: 'Enter last name of author',
            fieldName: 'authorLastName',
            isBody: true,
          },
          {
            id: 'newBookAuthorStreet',
            displayName: 'Author Address: Street Name',
            placeholder: 'Enter name of street in author address',
            fieldName: 'street',
            isBody: true,
          },
          {
            id: 'newBookAuthorDistrict',
            displayName: 'Author Address: District Name',
            placeholder: 'Enter district in author address',
            fieldName: 'district',
            isBody: true,
          },
          {
            id: 'newBookAuthorState',
            displayName: 'Author Address: State',
            placeholder: 'Enter state in author address',
            fieldName: 'state',
            isBody: true,
          },
          {
            id: 'newBookAuthorPostalCode',
            displayName: 'Author Address: Postal Code',
            placeholder: 'Enter postal code in author address',
            fieldName: 'postalCode',
            isBody: true,
          },
          {
            id: 'newBookAuthorEmail',
            displayName: 'Author Email',
            placeholder: "Enter author's email address",
            fieldName: 'email',
            isBody: true,
          },
          {
            id: 'newBookAuthorContact',
            displayName: 'Author Contact No',
            placeholder: "Enter author's contact number",
            fieldName: 'contactNo',
            isBody: true,
          },
        ],
      },
      {
        link: 'api/books/{0}/updateBookName?bookName={1}',
        methodType: 'PUT',
        name: 'Update book name',
        fields: [
          {
            displayName: 'Book ID',
            placeholder: 'Enter Book ID',
            isRequired: true,
            id: 'updateBookNameBookId',
            isRequestParameters: true,
          },
          {
            displayName: 'Book Name',
            placeholder: 'Enter Book Name',
            isRequired: true,
            id: 'updateBookNameBookName',
            isSearchParameters: true,
          },
        ],
      },
      {
        link: 'api/books/recordsInSortedOrder?fieldName={0}&sortOrder={1}',
        methodType: 'GET',
        name: 'Get books in sorted order',
        fields: [
          {
            displayName: 'Enter field name : ',
            placeholder: 'Enter field by which you want to sort',
            id: 'getSortRecordsFieldName',
            isDropDown: true,
            dropDownFields: [
              { value: 'bookId', displayName: 'Book ID' },
              { value: 'title', displayName: 'Title' },
            ],
            isSearchParameters: true,
          },
          {
            displayName: 'Enter sort order : ',
            placeholder: 'Enter order in which you want to sort asc/desc',
            id: 'getSortRecordsSortOrder',
            isDropDown: true,
            dropDownFields: [
              { value: 'asc', displayName: 'Ascending' },
              { value: 'desc', displayName: 'Descending' },
            ],
            isSearchParameters: true,
          },
        ],
      },
      {
        link: 'api/books/booksByPageNumber?pageNo={0}&pageSize={1}',
        methodType: 'GET',
        name: 'Get books by pagination',
        fields: [
          {
            displayName: 'Page Number : ',
            placeholder: 'Enter numeric page number value',
            isRequired: true,
            id: 'paginationPgNo',
            isSearchParameters: true,
          },
          {
            displayName: 'Page size : ',
            placeholder: 'Enter numeric page size value',
            isRequired: true,
            id: 'paginationPgSize',
            isSearchParameters: true,
          },
        ],
      },
      {
        link: 'api/books/booksByAuthorName/{0}',
        methodType: 'GET',
        name: 'Get book by author name',
        fields: [
          {
            displayName: 'Author Name',
            isRequired: true,
            id: 'getBookByAuthorNameField',
            isRequestParameters: true,
          },
        ],
      },
    ];
  }

  getAuthorEndPoints(): IEndPoint[] {
    return [
      {
        link: 'api/author',
        methodType: 'POST',
        name: 'Add new author',
      },
    ];
  }

  getData(
    incomingUrl: string,
    endpoint: IEndPoint,
    requestBody?: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    const customRequest = new HttpRequest(
      endpoint.methodType,
      'http://localhost:8080/' + incomingUrl,
      requestBody
      // {
      //   headers: headers,
      // }
    );

    return this.http.request(customRequest);
    // return this.http.request<any>({
    //   method: endpoint.methodType,
    //   url: 'http://localhost:8080/' + url,
    //   options: {},
    // });
  }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(BASE_URL + GET_ALL_BOOKS);
  }

  updateBookDetails(bookData: any, isEditPage: Boolean): Observable<any> {
    if (isEditPage) {
      let url = UPDATE_BOOK.replace('{id}', bookData.bookId.toString());
      return this.http.put<any>(BASE_URL + url, bookData);
    } else {
      return this.http.post<any>(BASE_URL + ADD_BOOK, bookData);
    }
  }

  deleteBook(bookId: string): Observable<any> {
    let url = BASE_URL + BOOKS_API + DELETE_BOOK_BY_ID.replace('{id}', bookId);
    return this.http.delete<any>(url);
  }

  issueBook(bookId: string): Observable<any> {
    let updatedUrl = ISSUE_BOOK.replace('{bookId}', bookId);
    let userData: any = this.localStorageService.getData('userData')!;
    let issueBookUrl = updatedUrl.replace(
      '{userId}',
      userData?.userId.toString()
    );
    let url = BASE_URL + USER_API + issueBookUrl;
    return this.http.post<any>(url, {});
  }
}

// getBookEndPoints(): IEndPoint[] {
//     return [
//       {
//         link: 'api/books/{0}',
//         methodType: 'GET',
//         name: 'Get Book By ID',
//         fields: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'bookByBookId',
//             isRequestParameters: true,
//           },
//         ],
//         isRequestParameters: true,
//         requestParameters: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'bookByBookId',
//           },
//         ],
//       },
//       // {
//       //   link: 'api/books/{0}',
//       //   methodType: 'PUT',
//       //   name: 'Update Book Details',
//       //   fields: [
//       //     {
//       //       displayName: 'Book ID',
//       //       placeholder: 'Enter Book ID',
//       //       isRequired: true,
//       //       id: 'updatebookByBookId',
//       //       isRequestParameters: true,
//       //     },
//       //   ],
//       //   isRequestParameters: true,
//       //   isBody: true,
//       //   requestParameters: [
//       //     {
//       //       displayName: 'Book ID',
//       //       placeholder: 'Enter Book ID',
//       //       isRequired: true,
//       //       id: 'updatebookByBookId',
//       //     },
//       //   ],
//       // },
//       {
//         link: 'api/books/{0}',
//         methodType: 'DELETE',
//         name: 'Delete book by ID',
//         fields: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'deleteBookByBookId',
//             isRequestParameters: true,
//           },
//         ],
//         isRequestParameters: true,
//         requestParameters: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'deleteBookByBookId',
//           },
//         ],
//       },
//       {
//         link: 'api/books/',
//         methodType: 'GET',
//         name: 'Get all books',
//       },
//       {
//         link: 'api/books/',
//         methodType: 'POST',
//         name: 'Add new book',
//         fields: [
//           {
//             id: 'newBookTitle',
//             displayName: 'Book Title',
//             placeholder: 'Enter Book Title',
//             fieldName: 'bookTitle',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorFname',
//             displayName: 'Author First Name',
//             placeholder: 'Enter first name of author',
//             fieldName: 'authorFirstName',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorLname',
//             displayName: 'Author Last Name',
//             placeholder: 'Enter last name of author',
//             fieldName: 'authorLastName',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorStreet',
//             displayName: 'Author Address: Street Name',
//             placeholder: 'Enter name of street in author address',
//             fieldName: 'street',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorDistrict',
//             displayName: 'Author Address: District Name',
//             placeholder: 'Enter district in author address',
//             fieldName: 'district',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorState',
//             displayName: 'Author Address: State',
//             placeholder: 'Enter state in author address',
//             fieldName: 'state',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorPostalCode',
//             displayName: 'Author Address: Postal Code',
//             placeholder: 'Enter postal code in author address',
//             fieldName: 'postalCode',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorEmail',
//             displayName: 'Author Email',
//             placeholder: "Enter author's email address",
//             fieldName: 'email',
//             isBody: true,
//           },
//           {
//             id: 'newBookAuthorContact',
//             displayName: 'Author Contact No',
//             placeholder: "Enter author's contact number",
//             fieldName: 'contactNo',
//             isBody: true,
//           },
//         ],
//         isBody: true,
//         bodyDetails: [
//           {
//             id: 'newBookTitle',
//             displayName: 'Book Title',
//             placeholder: 'Enter Book Title',
//             fieldName: 'bookTitle',
//           },
//           {
//             id: 'newBookAuthorFname',
//             displayName: 'Author First Name',
//             placeholder: 'Enter first name of author',
//             fieldName: 'authorFirstName',
//           },
//           {
//             id: 'newBookAuthorLname',
//             displayName: 'Author Last Name',
//             placeholder: 'Enter last name of author',
//             fieldName: 'authorLastName',
//           },
//           {
//             id: 'newBookAuthorStreet',
//             displayName: 'Author Address: Street Name',
//             placeholder: 'Enter name of street in author address',
//             fieldName: 'street',
//           },
//           {
//             id: 'newBookAuthorDistrict',
//             displayName: 'Author Address: District Name',
//             placeholder: 'Enter district in author address',
//             fieldName: 'district',
//           },
//           {
//             id: 'newBookAuthorState',
//             displayName: 'Author Address: State',
//             placeholder: 'Enter state in author address',
//             fieldName: 'state',
//           },
//           {
//             id: 'newBookAuthorPostalCode',
//             displayName: 'Author Address: Postal Code',
//             placeholder: 'Enter postal code in author address',
//             fieldName: 'postalCode',
//           },
//           {
//             id: 'newBookAuthorEmail',
//             displayName: 'Author Email',
//             placeholder: "Enter author's email address",
//             fieldName: 'email',
//           },
//           {
//             id: 'newBookAuthorContact',
//             displayName: 'Author Contact No',
//             placeholder: "Enter author's contact number",
//             fieldName: 'contactNo',
//           },
//         ],
//       },
//       {
//         link: 'api/books/{0}/updateBookName?bookName={1}',
//         methodType: 'PUT',
//         name: 'Update book name',
//         fields: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'updateBookNameBookId',
//             isRequestParameters: true,
//           },
//           {
//             displayName: 'Book Name',
//             placeholder: 'Enter Book Name',
//             isRequired: true,
//             id: 'updateBookNameBookName',
//             isSearchParameters: true,
//           },
//         ],
//         isRequestParameters: true,
//         isSearchParameters: true,
//         requestParameters: [
//           {
//             displayName: 'Book ID',
//             placeholder: 'Enter Book ID',
//             isRequired: true,
//             id: 'updateBookNameBookId',
//           },
//         ],
//         searchParameters: [
//           {
//             displayName: 'Book Name',
//             placeholder: 'Enter Book Name',
//             isRequired: true,
//             id: 'updateBookNameBookName',
//           },
//         ],
//       },
//       {
//         link: 'api/books/recordsInSortedOrder?fieldName={0}&sortOrder={1}',
//         methodType: 'GET',
//         name: 'Get books in sorted order',
//         fields: [
//           {
//             displayName: 'Enter field name : ',
//             placeholder: 'Enter field by which you want to sort',
//             id: 'getSortRecordsFieldName',
//             isDropDown: true,
//             dropDownFields: [
//               { value: 'bookId', displayName: 'Book ID' },
//               { value: 'title', displayName: 'Title' },
//             ],
//             isSearchParameters: true,
//           },
//           {
//             displayName: 'Enter sort order : ',
//             placeholder: 'Enter order in which you want to sort asc/desc',
//             id: 'getSortRecordsSortOrder',
//             isDropDown: true,
//             dropDownFields: [
//               { value: 'asc', displayName: 'Ascending' },
//               { value: 'desc', displayName: 'Descending' },
//             ],
//             isSearchParameters: true,
//           },
//         ],
//         isSearchParameters: true,
//         searchParameters: [
//           {
//             displayName: 'Enter field name : ',
//             placeholder: 'Enter field by which you want to sort',
//             id: 'getSortRecordsFieldName',
//             isDropDown: true,
//             dropDownFields: [
//               { value: 'bookId', displayName: 'Book ID' },
//               { value: 'title', displayName: 'Title' },
//             ],
//           },
//           {
//             displayName: 'Enter sort order : ',
//             placeholder: 'Enter order in which you want to sort asc/desc',
//             id: 'getSortRecordsSortOrder',
//             isDropDown: true,
//             dropDownFields: [
//               { value: 'asc', displayName: 'Ascending' },
//               { value: 'desc', displayName: 'Descending' },
//             ],
//           },
//         ],
//       },
//       {
//         link: 'api/books/booksByPageNumber?pageNo={0}&pageSize={1}',
//         methodType: 'GET',
//         name: 'Get books by pagination',
//         fields: [
//           {
//             displayName: 'Page Number : ',
//             placeholder: 'Enter numeric page number value',
//             isRequired: true,
//             id: 'paginationPgNo',
//             isSearchParameters: true,
//           },
//           {
//             displayName: 'Page size : ',
//             placeholder: 'Enter numeric page size value',
//             isRequired: true,
//             id: 'paginationPgSize',
//             isSearchParameters: true,
//           },
//         ],
//         isSearchParameters: true,
//         searchParameters: [
//           {
//             displayName: 'Page Number : ',
//             placeholder: 'Enter numeric page number value',
//             isRequired: true,
//             id: 'paginationPgNo',
//           },
//           {
//             displayName: 'Page size : ',
//             placeholder: 'Enter numeric page size value',
//             isRequired: true,
//             id: 'paginationPgSize',
//           },
//         ],
//       },
//       {
//         link: 'api/books/booksByAuthorName/{0}',
//         methodType: 'GET',
//         name: 'Get book by author name',
//         fields: [
//           {
//             displayName: 'Author Name',
//             isRequired: true,
//             id: 'getBookByAuthorNameField',
//             isRequestParameters: true,
//           },
//         ],
//         isRequestParameters: true,
//         requestParameters: [
//           {
//             displayName: 'Author Name',
//             isRequired: true,
//             id: 'getBookByAuthorNameField',
//           },
//         ],
//       },
//     ];
//   }
