import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() searchValue = new EventEmitter<string>();

  @Input() label!: string;

  @Input() image!: string;

  @Input() type!: string;


  valueChange(newValue: any) {
    this.searchValue.emit(newValue.target.value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
