import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInOut = trigger('fadeInOut',[

    state('void', style({opacity: 0})),
    transition(':enter', [
        style({opacity: 0 }),
        animate('0.3s ease-in-out', style({opacity:1}))
    ]),
    transition(':leave',[
        animate('0.3s ease-in-out', style({opacity:0}))
    ])
]);