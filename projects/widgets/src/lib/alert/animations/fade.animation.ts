import {
    trigger,
    transition,
    style,
    animate,
    group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        group([
            animate('0.5s ease', style({ transform: 'translateY(-20%)' })),
            animate('600ms', style({ opacity: 0 }))
        ])
    ])
]);
