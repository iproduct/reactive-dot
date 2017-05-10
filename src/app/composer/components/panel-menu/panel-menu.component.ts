import { NgModule, Component, ElementRef, OnDestroy, Input, EventEmitter, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/primeng';
import { RdMenuItem } from '../../../common/models/rd-menu-item';
import { RdSortableOptions } from '../../../common/rd-sortable/rd-sortable-options';
import { RdSortableModule } from '../../../common/rd-sortable/rd-sortable.module';

export class BasePanelMenuItem {

    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }

            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
    }
}

@Component({
    selector: 'rd-panel-menu-sub',
    template: `
        <div class="ui-menu-list ui-helper-reset" [style.display]="expanded ? 'block' : 'none'" rdSortable
            [rdSortableOptions]="options">
            <div *ngFor="let child of item.items" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items}"
                [pTooltip]="child.hint">
                <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all"
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-disabled':child.disabled}"
                    (click)="handleClick($event,child)" [attr.target]="child.target" ><span class="ui-panelmenu-icon fa fa-fw"
                        [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}"
                        *ngIf="child.items"></span><span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"
                        ></span><span class="ui-menuitem-text">{{child.label}}</span></a>
                <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [routerLinkActive]="'ui-state-active'"
                    class="ui-menuitem-link ui-corner-all"
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-disabled':child.disabled}"
                    (click)="handleClick($event,child)" [attr.target]="child.target"><span class="ui-panelmenu-icon fa fa-fw"
                        [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}" *ngIf="child.items"></span>
                    <span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span>
                    <span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <rd-panel-menu-sub [item]="child" [expanded]="child.expanded" *ngIf="child.items"></rd-panel-menu-sub>
            </div>
        </div>
    `
})
export class RdPanelMenuSubComponent extends BasePanelMenuItem {

    @Input() item: RdMenuItem;

    @Input() expanded: boolean;

    tooltipDisabled = false;

    options: RdSortableOptions = {
        group: { name: 'composer', pull: 'clone', put: false, revertClone: true },
        sort: false,
        onStart: (event: any) => {

        },
        onEnd: (event: any) => {
            let origEl = event.item;
            // event.from[event.oldIndex] = event.item;
            // console.log('Original:', JSON.stringify(origEl));
            // console.log('From:', JSON.stringify(event.from));
            // this.zone.run(() => this.tooltipDisabled = false);
        },
        // setData: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) => {
        //     dataTransfer.setData('Text', dragEl); // `dataTransfer` object of HTML5 DragEvent
        //     console.log('Set Data:', dragEl);
        // },
    };
    constructor(private zone: NgZone) {
        super();
    }

}

@Component({
    selector: 'rd-panel-menu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model;let f=first;let l=last;" class="ui-panelmenu-panel">
                <div tabindex="0" [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,
                    'ui-corner-bottom':l&&!item.expanded,'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}"
                    [pTooltip]="item.hint">
                    <a *ngIf="!item.routerLink" [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}"
                        (click)="handleClick($event,item)" [attr.target]="item.target"><span *ngIf="item.items" class="ui-panelmenu-icon fa"
                            [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span
                            ><span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span
                            ><span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [routerLinkActive]="'ui-state-active'"
                        [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}" (click)="handleClick($event,item)"
                        [attr.target]="item.target"><span *ngIf="item.items" class="ui-panelmenu-icon fa"
                            [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span
                            ><span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span
                            ><span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                </div>
                <div *ngIf="item.items" class="ui-panelmenu-content-wrapper" [@rootItem]="item.expanded ? 'visible' : 'hidden'"
                    [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                    <div class="ui-panelmenu-content ui-widget-content">
                        <rd-panel-menu-sub [item]="item" [expanded]="true"></rd-panel-menu-sub>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class RdPanelMenuComponent extends BasePanelMenuItem implements OnDestroy {

    @Input() model: RdMenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    public animating: boolean;

    options: RdSortableOptions = {
        group: 'composer'
    };


    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    ngOnDestroy() {
        if (this.model) {
            for (let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

    handleClick(event, item) {
        this.animating = true;
        super.handleClick(event, item);
        // TODO: Use onDone of animate callback instead with RC6
        setTimeout(() => {
            this.animating = false;
        }, 400);
    }

}

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule, RdSortableModule],
    exports: [RdPanelMenuComponent, RouterModule],
    declarations: [RdPanelMenuComponent, RdPanelMenuSubComponent]
})
export class RdPanelMenuModule { }
