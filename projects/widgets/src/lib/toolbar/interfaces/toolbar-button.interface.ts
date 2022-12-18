import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A button to display in a toolbar. A toolbar button should have either a
 * click or href defined. The click will need to be handled programmatically,
 * while the href should be handled by the browser (but should only be used for
 * downloading files directly; at least for now). You may use the pre-defined
 * buttons I have included with the library, or you can see below how to define
 * and use your own toolbar buttons.
 *
 * @overviewDetails
 * ## Basic Usage Example
 *
 * ```typescript
 * import {ToolbarButton} from '@ngx-material-dashboard/toolbar-button.interface';
 *
 * const CREATE_TOOLBAR_BUTTON: ToolbarButton = {
 *     canDisable: false,
 *     disabled: false,
 *     multiSelectDisabled: false,
 *     text: 'Add',
 *     click: 'create'
 * };
 * ```
 *
 * ## Icon Usage Example
 *
 * ```typescript
 * import {faPlus} from '@fortawesome/free-solid-svg-icons';
 * import {ToolbarButton} from '@ngx-material-dashboard/toolbar-button.interface';
 *
 * const CREATE_TOOLBAR_BUTTON: ToolbarButton = {
 *     canDisable: false,
 *     disabled: false,
 *     icon: faPlus,
 *     multiSelectDisabled: false,
 *     text: 'Add',
 *     click: 'create'
 * };
 * ```
 *
 * ## Stacked Icon Usage Example
 *
 * ```typescript
 * import {faBan, faNetworkWired} from '@fortawesome/free-solid-svg-icons';
 * import {ToolbarButton} from '@ngx-material-dashboard/toolbar-button.interface';
 *
 * const CREATE_TOOLBAR_BUTTON: ToolbarButton = {
 *     canDisable: false,
 *     disabled: false,
 *     icon: faNetworkWired,
 *     stackedIcon: faBan,
 *     stackedIconStyles: {'color': 'red', 'font-size': '1.25em'},
 *     multiSelectDisabled: false,
 *     text: 'Disable Network',
 *     click: 'disableNetwork'
 * };
 * ```
 *
 * ## Features
 *
 * The `ToolbarButton` interface provides several optional features for
 * your buttons. You can add [Font Awesome](https://fontawesome.com/icons)
 * icons, which includes the use of stacked icons, and you can also configure
 * when the button should be enabled/disabled.
 *
 * ### Icons
 *
 * Icons can be included with buttons, but are not required. You can include a
 * "primary" icon and a stacked icon. If you want to use a stacked icon, you
 * must include both the `icon` and `stackedIcon` properties when defining your
 * button. The `icon` is the "primary" icon displayed next to the button text
 * and the `stackedIcon` is rendered on top of the "primary" icon you define.
 * This works just like stacked icons in the `angular-fontawesome` library.
 *
 * You may also include custom CSS styles to be applied to the `stackedIcon`
 * using the `stackedIconStyles` property. For example, setting this property
 * to `{'color': 'red', 'font-size': '1.25em'}` will render the stacked icon
 * red and slightly larger than the "primary" icon.
 *
 * See the `angular-fontawesome` documentation for
 * [stacked-icons](https://github.com/FortAwesome/angular-fontawesome/blob/5581dee5fc060ea5383e5a66bc3f3504bf491446/docs/usage/features.md#stacked-icons)
 * for more details on that.
 *
 * ### Enable/Disable Configuration
 *
 * There are several different properties that control when a button is enabled
 * and disabled. They are `disabled`, `canDisable`, and `multiSelectDisabled`.
 * The `SelectionService` controls how the buttons are enabled/disabled based on
 * properties defined. See the [docs](/widgets/services/selection/overview)
 * there for more details.
 *
 * The `disabled` property represents the current state of the button and it
 * controls whether or not the button is enabled or disabled in the component
 * view. The `canDisable` property is provided as an override to the `disabled`
 * property, and will ensure the button is always enabled.
 *
 * > NOTE: If you set `canDisable` to false, you should also set `disabled` to
 * > false. You might be able to get away without setting the `disabled`
 * > property (although I haven't tested this). But you should not set `disabled`
 * > to true, otherwise the button will never be enabled.
 *
 * The `multiSelectDisabled` property controls whether the button should be
 * disabled if more than one row in the table is selected. I included this
 * option because I found there were some buttons I did not want to enable when
 * multiple rows were selected, like the edit button. Most objects are going to
 * be modified one at a time, so I thought it made sense to disable the edit
 * button if more than one row was selected to prevent any issues trying to
 * determine which row to actually edit.
 *
 * This does beg the question of when would you want to make a button clickable
 * if there are multiple rows selected in a table? The easiest example I can
 * think of is deleting items. I should be able to select one or more items in
 * a table and delete them with a single button click (as opposed to deleting
 * each item individually).
 *
 * ## Included Buttons
 *
 * I have defined several default buttons that you may use without having to
 * define or configure them yourself. They are the `CREATE_TOOLBAR_BUTTON`,
 * `EDIT_TOOLBAR_BUTTON`, and `DELETE_TOOLBAR_BUTTON`. To use any of these
 * buttons simply import them from the `@ngx-material-dashboard/widgets`
 * library in whatever component you want to use them.
 *
 * The `CREATE_TOOLBAR_BUTTON` is configured for creating new objects and is
 * set to always be enabled. The `EDIT_TOOLBAR_BUTTON` is configured for
 * editing existing objects and is only enabled if 1 row is selected in the
 * table the button is associated with. The `DELETE_TOOLBAR_BUTTON` is
 * configured for deleting existing objects and is enabled when 1 or more
 * rows are selected.
 */
export interface ToolbarButton {
    /**
     * Boolean value to indicate whether the button can be disabled (based on selections in table;
     * i.e. 'add' button should not be disabled).
     */
    canDisable: boolean;
    /** Boolean value to indicate whether the button should be disabled/enabled. */
    disabled: boolean;
    /** The link to use when the button is clicked (should be a link to directly download file; at least for now). */
    href?: string;
    /** The icon to display next to the text. */
    icon?: IconDefinition;
    /** A stacked icon. */
    stackedIcon?: IconDefinition;
    /** Styles specific to stacked icon. */
    stackedIconStyles?: any;
    /** Boolean value to indicate whether the button should be disabled if more than one row selected. */
    multiSelectDisabled?: boolean;
    /** The text for the item (required). */
    text: string;
    /** The tooltip to display when the user hovers over the button. */
    tooltip?: string;
    /** The action the the button performs (use this when subscribing to click events).  */
    click?: string;
}
