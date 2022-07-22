import { Directive, HostListener } from '@angular/core';

/**
 * A simple directive to stop the `tab` `keydown` event from propagating. This
 * is mainly used in the `FilterDropDown` to prevent the drop down from closing
 * when the user clicks the `tab` key to navigate from one input to the next,
 * but it can be used anywhere you want to prevent the `tab` `keydown` event
 * from propagating to parent elements.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * <div [matMenuTriggerFor]="menu">
 *     <span>Drop Down</span>
 * </div>
 * <mat-menu #filterMenu="matMenu">
 *     <form appTabStopPropagation>
 *         <!-- form fields go here -->
 *     </form>
 * </div>
 * ```
 */
@Directive({
    selector: '[appTabStopPropagation]'
})
export class TabStopPropagationDirective {

    /**
     * Calls the `stopPropagation` function on the given event.
     *
     * @param event A `keydown.tab` event. 
     */
    @HostListener('keydown.tab', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        event.stopPropagation();
    }
}
