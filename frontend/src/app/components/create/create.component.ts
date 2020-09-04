import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeService } from '../../time.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private timeService: TimeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  addTime(title, author, description, from, to) {
    this.timeService
      .addTime(title, author, description, from, to)
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }

  ngOnInit(): void {}
}
