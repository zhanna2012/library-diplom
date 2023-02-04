import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() submit = new EventEmitter<boolean>();

  @Input() title!: string;


  submitButton() {
    this.submit.emit(true)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
