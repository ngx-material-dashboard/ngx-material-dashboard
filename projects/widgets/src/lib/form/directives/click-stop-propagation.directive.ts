import { Directive, HostListener } from '@angular/core';

/**
 * A simple directive to stop a `click` event from propagating. This is mainly
 * being used in the `FilterDropDown` to prevent the drop down from closing
 * when the user clicks in the form defined for the drop down, but it can be
 * used anywhere you want to prevent `click` events from propagating to parent
 * elements.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * <div [matMenuTriggerFor]="menu">
 *     <span>Drop Down</span>
 * </div>
 * <mat-menu #filterMenu="matMenu">
 *     <form ngxMaterialDashboardClickStopPropagation>
 *         <!-- form fields go here -->
 *     </form>
 * </div>
 * ```
 */
@Directive({
  selector: '[ngxMaterialDashboardClickStopPropagation]'
})
export class ClickStopPropagationDirective {

    /**
     * Calls the `stopPropagation` function on the given event.
     *
     * @param event A `click` event. 
     */
    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        event.stopPropagation();
    }
}
