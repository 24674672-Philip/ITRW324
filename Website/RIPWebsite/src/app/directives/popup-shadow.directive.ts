import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPopupShadow]'
})
export class PopupShadowDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


  @HostListener('mouseover') mouseOver(event: Event){
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow','0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)');
    this.renderer.setStyle(this.elementRef.nativeElement,'margin','10 10 10 10');
    this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','rgb(30,30,30)');
  }

  @HostListener('mouseleave') mouseLeave(event: Event){
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow','initial');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'initial');
  }


}
