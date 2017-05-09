import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { DBModule } from '@ngrx/db';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { routes } from './routes';
import { rootReducer } from './reducers';
import { RDStoreDevToolsModule } from './features/rd-store-devtools.module';
import { UserEffects } from './user/user.effects';
import { CommonModule } from './common/common.module';
import { schema } from './db';
import { BookEffects } from './effects/book';
import { CollectionEffects } from './effects/collection';
import { BooksModule } from './books/books.module';
import { PanelMenuModule, MenuModule } from 'primeng/primeng';
import { ComposerModule } from './composer/composer.module';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) {
  STORE_DEV_TOOLS_IMPORTS.push(...[
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    })
    // StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]);
}

export const APP_IMPORTS = [
  MaterialModule,
  EffectsModule.run(UserEffects),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules }),
  /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
  StoreModule.provideStore(rootReducer),
  /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
  RouterStoreModule.connectRouter(),
  /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
  EffectsModule.run(BookEffects),
  EffectsModule.run(CollectionEffects),
  /**
   * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
   * service available.
   */
  DBModule.provideDB(schema),

  STORE_DEV_TOOLS_IMPORTS,
  RDStoreDevToolsModule,
  TransferHttpModule,
  CommonModule,
  BooksModule,
  ComposerModule
];
