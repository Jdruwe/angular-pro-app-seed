import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from 'store';
import { Workout } from '../workouts/workouts.service';
import { Meal } from '../meals/meals.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => this.store.set('date', next))
    .map((day: any) => {

      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return {startAt, endAt};

    })
    .switchMap(({startAt, endAt}: any) => this.getSchedule(startAt, endAt))
    .map((data: any) => {

      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    })
    .do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }

  get uid() {
    return this.authService.user.uid;
  }
}