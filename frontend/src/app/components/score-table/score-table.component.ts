import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {

  scoreList: any;
  token: any;

  constructor(public local: LocalStorageService, private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.scoreService.getScore(this.token).subscribe(
      (res) => {
        this.scoreList = res
      }
    )
  }

}
