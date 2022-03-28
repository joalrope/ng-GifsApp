import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  search() {
    const inputValue = this.txtSearch.nativeElement.value;
    console.log(inputValue);
    this.txtSearch.nativeElement.value = '';
  }
}
