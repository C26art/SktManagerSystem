import { Directive, HostListener } from '@angular/core';
import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordionToggle]'
})
export class AccordionAnchorDirective {
  constructor(private accordionLink: AccordionLinkDirective) { }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    this.accordionLink.toggle();
    e.preventDefault();
  }
}
