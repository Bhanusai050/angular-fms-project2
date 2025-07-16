import { Directive ,HostListener} from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
   private navKeys = [
    'Backspace','Delete','Tab','Escape','Enter',
    'Home','End','ArrowLeft','ArrowRight'
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const ctrl = event.ctrlKey || event.metaKey;
    if (
      this.navKeys.includes(event.key) ||
      (ctrl && ['a','c','v','x'].includes(event.key.toLowerCase()))
    ) return;

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text/plain') || '';
    const digits = pasted.replace(/\D/g, '').slice(0, 10);
    document.execCommand('insertText', false, digits);
  }
}


  


