import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    {{ meals$ | async | json }}
  `
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
