import { Directive, HostListener, Input, OnInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective implements OnInit {

  @Input('scrollTo') scrollTo: string;
  @Input('scrollBoxID') scrollBoxID: string;

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('mousedown')
  onMouseClick() {


    var id = this.scrollTo;
    var scrollBoxID = 'html, body';

    $(scrollBoxID).animate({
      scrollTop: $(id).offset().top-200
    }, 500);

  }

}
