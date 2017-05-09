import './polyfills.browser';
import './rxjs.imports';

import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser.app.module';
import { decorateModuleRef } from './environment';
import { bootloader } from '@angularclass/hmr';

if ('production' === ENV) {
  enableProdMode();
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(BrowserAppModule)
    .then(decorateModuleRef)
    .catch(err => console.error('!!!', err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
