import { Directive, Host, Injectable, Input, OnInit, TemplateRef } from '@angular/core';

@Injectable()
export class DTRowSource {

  private titles: { [key: string]: TemplateRef<void> } = {};
  private rows: { [key: string]: TemplateRef<void> } = {};

  add(type: string, path: string, ref: TemplateRef<void>) {
    this[type === 'title' ? 'titles' : 'rows'][path] = ref;
  }

  getTitle(path: string) {
    return this.titles[path];
  }

  getRow(path: string) {
    return this.rows[path];
  }
}

@Directive({
  selector: '[dt-row]'
})
export class DataTableRowDirective implements OnInit {

  // get custom template
  @Input('dt-row') id: string;
  // define custom template type
  @Input() type: 'title';

  constructor(
    private _tempRef: TemplateRef<void>,
    @Host() private _source: DTRowSource
  ) { }

  ngOnInit() {
    this._source.add(this.type, this.id, this._tempRef);
  }

}
