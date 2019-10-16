import { Component, OnInit } from '@angular/core';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { UserOperateModalComponent } from '../user-operate-modal/user-operate-modal.component';

import {
  UsersQueryGQL,
  UsersByCursorQueryGQL,
  CreateUserMutationGQL,
  UpdateUserMutationGQL,
  DeleteUserMutationGQL
} from '../../../graphql/generated/graphql';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: any = {
    rows: [],
    model: {},
    pageInfo: {},
    isSpinning: true
  };

  constructor(
    private _modalService: NzModalService,
    private _msg: NzMessageService,
    private _usersQuery: UsersQueryGQL,
    private _usersByCursorQuery: UsersByCursorQueryGQL,
    private _createUserMutation: CreateUserMutationGQL,
    private _updateUserMutation: UpdateUserMutationGQL,
    private _deleteUserMutation: DeleteUserMutationGQL,
  ) { }

  ngOnInit() {
    this.user.model = {
      columns: [
        {
          name: 'username',
          label: '用户名',
          type: 'text'
        },
        {
          name: 'email',
          label: '邮箱',
          type: 'text'
        },
        {
          name: 'createdAt',
          label: '创建时间',
          type: 'time'
        }
      ],
      actions: [
        {
          label: '修改',
          clickFn: item => this.showModifyUserModal(item)
        },
        {
          label: '删除',
          clickFn: item => this.showDeleteUserModal(item)
        }
      ],
      // pagination: {
      //   totalCountFn: () => this.getUsersCount(),
      //   pageSizeChangedFn: (pageSize) => {
      //     this.currentPageSize = pageSize;
      //     return this.getRepositoryTagsList(this.registryId, this.repositoryId, null, pageSize, null, null);
      //   },
      //   jumpPrevChangedFn: (before, last) =>
      //                       this.getRepositoryTagsList(this.registryId, this.repositoryId, null, null, before, last),
      //   jumpNextChangedFn: (after, first) =>
      //                       this.getRepositoryTagsList(this.registryId, this.repositoryId, after, first, null, null)
      // }
    };
    this.getUsersCount();
    this.getUsersByCursor();
  }

  getUsersCount() {
    return new Promise(resolve =>
      this._usersQuery.fetch()
        .subscribe(({ data }) => {
          resolve(data['users']['totalCount']);
        }, error => {
          resolve();
        }));
  }

  getUsersByCursor(cursor = null, limit = 5) {
    this.user.isSpinning = true;
    this._usersByCursorQuery.fetch({ cursor, limit }).subscribe(({ data }) => {
      this.user.rows = data['usersByCursor']['nodes'];
      this.user.pageInfo = data['usersByCursor']['pageInfo'];
      this.user.isSpinning = false;
    });
  }

  showAddUserModal() {
    const modal = this._modalService.create({
      nzTitle: '新建用户',
      nzMaskClosable: false,
      nzContent: UserOperateModalComponent,
      nzFooter: [
        {
          label: '取消',
          type: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          disabled: (componentInstance) => componentInstance.userOperateForm.status !== 'VALID',
          onClick: (componentInstance) => {
            const { username, email, password } = componentInstance.userOperateForm.value;
            return new Promise(resolve => {
              this._createUserMutation.mutate({
                username,
                email,
                password
              }).subscribe(({ data }) => {
                resolve();
                modal.destroy();
                this._msg.success('用户添加成功');
                this.getUsersByCursor();
              }, error => {
                resolve();
                this._msg.error(error.message);
              });
            });
          }
        }
      ]
    });
  }

  showModifyUserModal(user) {
    const modal = this._modalService.create({
      nzTitle: '修改用户',
      nzMaskClosable: false,
      nzContent: UserOperateModalComponent,
      nzComponentParams: {
        user: user
      },
      nzFooter: [
        {
          label: '取消',
          type: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          disabled: (componentInstance) => componentInstance.userOperateForm.status !== 'VALID',
          onClick: (componentInstance) => {
          }
        }
      ]
    });
  }

  showDeleteUserModal(user) {
    this._modalService.confirm({
      nzTitle: '确定删除用户：' + user.username + '？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        return new Promise(resolve => {
          this._deleteUserMutation.mutate({id: user.id})
            .subscribe(({ data }) => {
              resolve();
              this._msg.success('用户删除成功');
              this.getUsersByCursor();
            }, error => {
              resolve();
              this._msg.error(error.message);
            });
        });
      }
    });
  }
}
