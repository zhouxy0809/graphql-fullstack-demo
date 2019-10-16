import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-operate-modal',
  templateUrl: './user-operate-modal.component.html',
  styleUrls: ['./user-operate-modal.component.scss']
})
export class UserOperateModalComponent implements OnInit {

  _user: any = {};
  userOperateForm: FormGroup;

  @Input()
  set user(value: String) {
    this._user = value;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userOperateForm = this.fb.group({
      username: [
        this._user.username || '',
        [ Validators.required ]
      ],
      email: [
        this._user.email || '',
        [ Validators.email, Validators.required ]
      ],
      password: [
        this._user.password || '12345678',
        [Validators.required]]
    });
  }
}
