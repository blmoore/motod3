import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-data-select',
  templateUrl: './data-select.component.html',
  styleUrls: ['./data-select.component.css']
})
export class DataSelectComponent implements OnInit {

  lids: Object;
  keys: Array<string>;

  constructor(http: Http) { 
    this.lids = {}; 
    http.get('assets/lids.json')
      .map((res: Response) => res.json())
      .subscribe(res => {
          this.lids = res;
          this.keys = Object.keys(this.lids);
        });
  }

  ngOnInit() {
  }

}

// ngFor can't iterate over objects, only arrays
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

}