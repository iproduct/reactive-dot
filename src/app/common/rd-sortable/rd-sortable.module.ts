import { NgModule, ModuleWithProviders } from '@angular/core';
import { RdSortableOptions } from './rd-sortable-options';
import { GLOBALS } from './globals';
import { RdSortableDirective } from './rd-sortable.directive';
import { RdSortableService } from './rd-sortable.service';

@NgModule({
  declarations: [ RdSortableDirective ],
  exports: [ RdSortableDirective ],
  providers: [ RdSortableService ]
})
export class RdSortableModule {

  public static forRoot(globalOptions: RdSortableOptions): ModuleWithProviders {
    GLOBALS.options = globalOptions;

    return {
        ngModule: RdSortableModule,
        providers: [
            RdSortableService
        ]
    };
  }

}
