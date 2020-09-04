import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import { TimeService } from '../../time.service';
import { Time } from '../../time.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: String;
  time: any = {};
  updateForm: FormGroup;

  constructor(
    private timeService: TimeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.timeService.getTimeById(this.id).subscribe((res) => {
        this.time = res;
        this.updateForm.get('title').setValue(this.time.title);
        this.updateForm.get('author').setValue(this.time.author);
        this.updateForm.get('description').setValue(this.time.description);
        this.updateForm
          .get('from')
          .setValue(this.formattedDate(this.time.from));
        this.updateForm.get('to').setValue(this.formattedDate(this.time.to));
      });
    });
  }

  formattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  updateTime(title, author, description, from, to) {
    this.timeService
      .updateTime(this.id, title, author, description, from, to)
      .subscribe(
        () => {
          this.snackBar.open('Time updated successfully', 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    this.timeService.getTimes();
  }
}
