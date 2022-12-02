import { TabStopPropagationDirective } from './tab-stop-propagation.directive';

describe('TabStopPropagationDirective', () => {

    let directive: TabStopPropagationDirective;

    beforeEach(() => {
        directive = new TabStopPropagationDirective();
    });

    // this is the only way I could actually test the onKeyDown method since I
    // couldn't simulate tab keydown event in test (and from what I read is
    // probably not best approach for unit test at least)
    it('should stop propagation of tab event when tabbing in form', () => {
        // given: a  tab keydown event and a spy on the stopPropagation function
        const event = new KeyboardEvent('keydown', {
            key: 'tab',
            code: 'tab',
            keyCode: 9
        });
        const spy = spyOn(event, 'stopPropagation');

        // when: the onKeyDown function is called
        directive.onKeyDown(event);

        // then: the stopPropagation method should have been called on event
        expect(spy).toHaveBeenCalled();
    });
});
