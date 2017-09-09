import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdowntoggle]'
})
export class DropdowntoggleDirective {
  @HostBinding('class.open') isOpen = false;
  
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
  constructor() { }

}
