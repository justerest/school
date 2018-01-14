import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Chart from 'chart.js/dist/Chart.min';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    setTimeout(() => new Chart('myChart', {
      type: 'line',
      data: {
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        }],
      },
    }));
  }

}
