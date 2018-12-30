import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span>
            {{ item.ingredients }}
          </span>
        </p>
      </a>

      <div
        *ngIf="toggled"
        class="list-item__delete">
        <p>Delete item?</p>
        <button
          class="confirm"
          type="button"
          (click)="removeItem()">
          Yes
        </button>
        <button
          class="cancel"
          type="button"
          (click)="toggle()">
          No
        </button>
      </div>

      <button
        class="trash"
        type="button"
        (click)="toggle()">
        <img src="/img/remove.svg">
      </button>

    </div>
  `
})
export class ListItemComponent {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [`../meals`, item.$key]
  }
}
