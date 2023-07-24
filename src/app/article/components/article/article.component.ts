import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { ErrorMessageComponent } from '../../../shared/components/errorMessage/errorMessage.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { TagListComponent } from '../../../shared/components/tagList/tagList.component';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { articleActions } from '../../store/actions';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';

@Component({
  selector: 'ngrx-v16-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      } else {
        return article.author.username === currentUser.username;
      }
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    isAuthor: this.isAuthor$,
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
  });
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
