import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { IBook } from '../models/book.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  bookData?: IBook;
  initialFormValues?: IBook;
  hasChange: Boolean = false;
  isEditPage: Boolean = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    copies: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    rating: new FormControl(''),
    noOfPages: new FormControl(''),
    publishedYear: new FormControl(''),
    publisher: new FormControl(''),
    genre: new FormControl(''),
    authorFname: new FormControl('', Validators.required),
    authorLname: new FormControl('', Validators.required),
    authorAddStreet: new FormControl('', Validators.required),
    authorAddDistrict: new FormControl('', Validators.required),
    authorAddState: new FormControl('', Validators.required),
    authorAddPostalCode: new FormControl(''),
    authorEmail: new FormControl('', Validators.required),
    authorContact: new FormControl(''),
    languages: new FormControl(['English']),
  });

  // ^ matches position just before the first character of the string
  // $ matches position just after the last character of the string
  // . matches a single character. Does not matter what character it is, except newline
  // * matches preceding match zero or more times
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IBook,
    public dialogRef?: MatDialogRef<BookDetailsComponent>,
    private bookService?: BookService
  ) {
    if (Object.keys(data).length !== 0) {
      this.isEditPage = true;
      this.bookData = data;
      this.form.setValue({
        title: this.bookData.title,
        description: this.bookData.description,
        copies: this.bookData.noOfCopies.toString(),
        rating: this.bookData.rating.toString(),
        noOfPages: this.bookData.noOfPages.toString(),
        publishedYear: this.bookData.publishedYear.toString(),
        publisher: this.bookData.publisher,
        genre: this.bookData.genre,
        authorFname: this.bookData.author.firstName,
        authorLname: this.bookData.author.lastName,
        authorAddStreet: this.bookData.author.address.street,
        authorAddDistrict: this.bookData.author.address.district,
        authorAddState: this.bookData.author.address.state,
        authorAddPostalCode: this.bookData.author.address.postalCode.toString(),
        authorEmail: this.bookData.author.address.emailAddress,
        authorContact: this.bookData.author.address.contactNumber,
        languages: this.bookData.languages,
      });
      this.initialFormValues = data;
    }

    // console.log(data);
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef?.close();
  }

  editBookData(): void {
    const ratingVal = this.form.get('rating')?.value;
    const pages = this.form.get('noOfPages')?.value;
    const numCopies = this.form.get('copies')?.value;
    let bookObj;
    if (this.isEditPage) {
      bookObj = {
        bookId: this.bookData?.bookId,
        title: this.form.get('title')?.value,
        publishedYear: this.form.get('publishedYear')?.value,
        languages: this.bookData?.languages,
        publisher: this.form.get('publisher')?.value,
        genre: this.form.get('genre')?.value,
        description: this.form.get('description')?.value || '',
        rating: parseFloat(ratingVal ? ratingVal : ''),
        noOfPages: parseInt(pages ? pages : ''),
        noOfCopies: parseInt(numCopies ? numCopies : ''),
        author: {
          authorId: this.bookData?.author.authorId,
          firstName: this.form.get('authorFname')?.value,
          lastName: this.form.get('authorLname')?.value,
          address: {
            addressId: this.bookData?.author.address.addressId,
            street: this.form.get('authorAddStreet')?.value,
            district: this.form.get('authorAddDistrict')?.value,
            state: this.form.get('authorAddState')?.value,
            postalCode: this.form.get('authorAddPostalCode')?.value,
            emailAddress: this.form.get('authorEmail')?.value,
            contactNumber: this.form.get('authorContact')?.value,
          },
        },
      };
    } else {
      bookObj = {
        bookTitle: this.form.get('title')?.value,
        genre: this.form.get('genre')?.value,
        languages: ['English', 'Hindi', 'Marathi', 'Spanish'],
        publisher: this.form.get('publisher')?.value,
        publishedYear: this.form.get('publishedYear')?.value,
        description: this.form.get('description')?.value || '',
        rating: parseFloat(ratingVal ? ratingVal : ''),
        authorFirstName: this.form.get('authorFname')?.value,
        authorLastName: this.form.get('authorLname')?.value,
        street: this.form.get('authorAddStreet')?.value,
        district: this.form.get('authorAddDistrict')?.value,
        state: this.form.get('authorAddStreet')?.value,
        postalCode: parseInt(this.form.get('authorAddPostalCode')?.value!),
        email: this.form.get('authorEmail')?.value,
        contactNo: this.form.get('authorContact')?.value,
        noOfPages: parseInt(pages ? pages : ''),
        noOfCopies: parseInt(numCopies ? numCopies : ''),
      };
    }
    this.bookService?.updateBookDetails(bookObj, this.isEditPage).subscribe(
      (output) => {
        console.log(output);
        this.dialogRef?.close();
      }
      // {
      // next: (output) => {
      //   console.log(output);
      //   this.dialogRef.close();
      // },
      // error: (error) => {},
      // complete() {
      //   // console.log(output);
      //   this.dialogRef.close();
      // },
      // }
    );
  }
}
