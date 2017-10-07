import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShowVolume]'
})
export class ShowVolumeDirective {


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  @Input('element') element: Element;

  @HostListener('mouseover')show(){

    this.renderer.setStyle(this.element,'visibility','visible');

  }

  @HostListener('mouseleave')hide(){
    this.renderer.setStyle(this.element,'visibility','hidden');
  }

}
