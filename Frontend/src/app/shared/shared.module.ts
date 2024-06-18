import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { MenuItems } from './menu-items';



@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective
  ],
  providers: [
    MenuItems
  ]
})
export class SharedModule { }
