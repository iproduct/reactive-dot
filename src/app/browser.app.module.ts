/* tslint:disable max-line-length */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    AppModule
  ]
})
export class BrowserAppModule {
  constructor(public appRef: ApplicationRef, private _store: Store<State>) { }

  hmrOnInit(store) {
    console.log('!!!! OnInit: HMR store', JSON.stringify(store, null, 2));
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    console.log('HMR store - onDestroy', JSON.stringify(store, null, 2));
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
