import * as React from 'react';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReactLoaderService {
  loadComponent(componentName: string, elementId: string) {
    const script = document.createElement('script');
    script.src = `assets/js/main.js`;
    script.onload = () => {
      // @ts-ignore
      window.renderReactComponent(componentName, elementId);
    };
    document.body.appendChild(script);
  }
}
