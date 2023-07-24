import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { BackendErrorMessagesComponent } from '../backendErrorMessages/backendErrorMessages.component';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';

@Component({
  selector: 'ngrx-v16-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BackendErrorMessagesComponent],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }

    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.title,
      tagList: this.initialValues.tagList.join(''),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();

    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };

    this.articleSubmit.emit(articleFormValues);
  }
}
