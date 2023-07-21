import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { FeedTogglerComponent } from '../../../shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from '../../../shared/components/popularTags/popularTags.component';

@Component({
  selector: 'ngrx-v16-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
