import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-empty-info',
  templateUrl: './body-empty-info.component.html',
  styleUrls: ['./body-empty-info.component.scss']
})
export class DataTableBodyEmptyInfoComponent implements OnInit {

  private _networkException = false;
  
  @Input()
  set networkException(value) {
    this._networkException = value;
  }
  get networkException() {
    return this._networkException;
  }

  constructor() { }

  ngOnInit() {
  }

}
