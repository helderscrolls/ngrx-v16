import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ArticleFormComponent } from '../../../shared/components/articleForm/articleForm.component';
import { ArticleFormValuesInterface } from '../../../shared/components/articleForm/types/articleFormValues.interface';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';

@Component({
  selector: 'ngrx-v16-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };

    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
