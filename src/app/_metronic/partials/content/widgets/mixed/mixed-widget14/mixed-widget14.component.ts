import { Component, OnInit } from '@angular/core';
import { Caissier } from 'src/app/model/model';
import { UsersService } from 'src/app/services/users.service';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-mixed-widget14',
  templateUrl: './mixed-widget14.component.html',
})
export class MixedWidget14Component implements OnInit {
  colorsGrayGray100: string;
  colorsGrayGray700: string;
  colorsThemeBaseSuccess: string;
  colorsThemeLightSuccess: string;
  fontFamily: string;
  chartOptions: any = {};
  user: any;
  compteagence: any;
  constructor(private layout: LayoutService, 
    private userService: UsersService) {
    this.colorsGrayGray100 = this.layout.getProp('js.colors.gray.gray100');
    this.colorsGrayGray700 = this.layout.getProp('js.colors.gray.gray700');
    this.colorsThemeBaseSuccess = this.layout.getProp(
      'js.colors.theme.base.success'
    );
    this.colorsThemeLightSuccess = this.layout.getProp(
      'js.colors.theme.light.success'
    );
    this.fontFamily = this.layout.getProp('js.fontFamily');
  }

  ngOnInit(): void {
    this.user = this.userService.getCrrentUser;
    console.log(this.user);
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    const strokeColor = '#D13647';
    return {
      series: [this.compteagence.solde],
      chart: {
        type: 'radialBar',
        height: 200,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            showOn: 'always',
            value: {
              fontSize: '50px',
              fontWeight: '700',
            },
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      markers: {},
    };
  }
}
