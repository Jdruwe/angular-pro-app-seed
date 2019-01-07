import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{ section.type === 'workouts' ? 'workout' : 'food'}}.svg">
            Assign {{ section.type }}
          </h1>
          <a
            [routerLink]="getRoute(section.type)"
            class="btn__add">
            <img src="/img/add-white.svg">
            New {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span
            *ngIf="!list?.length"
            class="schedule-assign__empty">
            <img src="/img/face.svg">
            Nothing here to assign
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)">
            {{ item.name }}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button
              class="button"
              type="button"
              (click)="updateAssign()">
              Update
            </button>
            <button
              class="button button--cancel"
              type="button"
              (click)="cancelAssign()">
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name)
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }
}
