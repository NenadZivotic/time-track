import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import * as moment from 'moment';

import { Time } from '../../time.module';
import { TimeService } from '../../time.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  times: Time[];
  displayedColumns = [
    'title',
    'author',
    'description',
    'from',
    'to',
    'actions',
  ];

  constructor(private timeService: TimeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTimes();
  }

  fetchTimes() {
    this.timeService.getTimes().subscribe((data: Time[]) => {
      this.times = data;
    });
  }

  editTime(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTime(id) {
    this.timeService.deleteTime(id).subscribe(() => {
      this.fetchTimes();
    });
  }

  formattedDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }
}
