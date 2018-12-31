import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<any> = this.db.list(`workouts/${this.uid}`)
    .do(next => this.store.set('workouts', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`)
      .push(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`)
      .remove(key);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`)
      .update(workout);
  }

  getWorkout(key: string) {
    if (!key) return Observable.of({});
    return this.store.select<Workout[]>('workouts')
      .filter(Boolean) // stop if empty
      .map(workouts => workouts.find((workout: Workout) => workout.$key === key))
  }
}
