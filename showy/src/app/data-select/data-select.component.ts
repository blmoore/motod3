import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Http, Response } from '@angular/http';

import { HelmetService } from '../helmet.service';

@Component({
  selector: 'app-data-select',
  templateUrl: './data-select.component.html',
  styleUrls: ['./data-select.component.css'],
  providers: [HelmetService]
})
export class DataSelectComponent implements OnInit {

  lids: Object;
  keys: Array<string>;

  apiserver: string;

  constructor(helmetService: HelmetService) { 
    helmetService.getHelmets()
      .subscribe(
        lids => this.processHelmets(lids),
        error => console.log('Error: ' + error),
        () => console.log('Request complete')
      )
  }

  private processHelmets(lids: any) {
    console.log(JSON.stringify(lids.name));
    this.lids = lids['_items']; 
    this.keys = Object.keys(this.lids);
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