import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        state('void', 
            style({ 
                position:'fixed', 
                width:'100%' 
            })),
            state('*', style({
                position:'fixed', 
                width:'100%'
            })),
        transition(':enter', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate('0.5s ease-in-out', 
            style({
                transform: 'translateX(0%)'
            }))
        ]),
        transition(':leave', [
            style({
                transform: 'translateX(0%)'
            }),
             animate('0.5s ease-in-out', 
             style({
                 transform: 'translateX(100%)'
            }))
        ])
    ]);