import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdowntoggle]'
})
export class DropdowntoggleDirective {
  @HostBinding('class.open') isOpen = false;


    @HostListener('mouseover') mouseOverOpen(){
      this.isOpen = true;
    }

    @HostListener('mouseleave') mouseLeaveClose(){
      this.isOpen = false;
    }
  constructor() { }

}
