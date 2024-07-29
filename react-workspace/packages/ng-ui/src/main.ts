import { AppModule } from './app/app.module';
import { TwRadioComponent } from 'projects/ng-lib/src/public-api';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

(async () => {
    try {
        // Bootstrap the Angular module
        const platformRef = await platformBrowserDynamic().bootstrapModule(AppModule);

        // Get the injector from the bootstrapped module
        const appInjector = platformRef.injector;

        // Create custom element from TwRadioComponent
        const radioElement = createCustomElement(TwRadioComponent, { injector: appInjector });

        // Define the custom element
        customElements.define('tw-radio', radioElement);
    } catch (err) {
        console.error('Error during bootstrap:', err);
    }
})();
