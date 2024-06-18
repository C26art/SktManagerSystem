import {
  Directive,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective implements OnInit, OnDestroy {
  protected navlinks: Array<AccordionLinkDirective> = [];
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkOpenLinks());

    setTimeout(() => this.checkOpenLinks(), 0);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  closeOtherLinks(selectedLink: AccordionLinkDirective): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks(): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        if (currentUrl.indexOf(link.group) > 0) {
          link.selected = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }
}
