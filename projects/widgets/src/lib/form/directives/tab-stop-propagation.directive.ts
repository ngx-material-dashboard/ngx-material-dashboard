import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appTabStopPropagation]'
})
export class TabStopPropagationDirective {

    @HostListener('keydown.tab', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        event.stopPropagation();
    }
}
