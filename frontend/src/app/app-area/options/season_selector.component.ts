import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgOption, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'season-select',
  template: `
    <div>
      Seasons
      <ng-select [items]="this.seasons | async"
                 [multiple]="true"
                 placeholder="Season"
                 [virtualScroll]="true"
                 (change)="selectSeason($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class SeasonSelectorComponent implements OnInit {

  _source: string;
  seasons: Observable<Array<string>>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.seasons = InitialSelectors.selectSeasons(this.store);
    OptionSelectors.selectSeason(this.store, this._source).subscribe(seasons => {
      if (seasons != null) {
        seasons.forEach(season => {
          if (this.ngSelect.selectedItems.filter(v => v.value == season).length < 1) {
            this.ngSelect.select({
              name: [season],
              label: season,
              value: season
            })
          }
        })

      }
    })
  }

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  @Input("source")
  set source(source: string) {
    this._source = source;
  }

  selectSeason(season: Array<string>) {
    this.store.dispatch(new OptionActions.SetSeason(season, this._source));
  }

}
