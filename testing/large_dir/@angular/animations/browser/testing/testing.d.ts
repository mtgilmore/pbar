/**
 * @license Angular v8.2.14
 * (c) 2010-2019 Google LLC. https://angular.io/
 * License: MIT
 */

import { AnimationPlayer } from '@angular/animations';
import { NoopAnimationPlayer } from '@angular/animations';
import { ɵAnimationDriver } from '@angular/animations/browser';
import { ɵStyleData } from '@angular/animations';

/**
 * @publicApi
 */
export declare class MockAnimationDriver implements ɵAnimationDriver {
    static log: AnimationPlayer[];
    validateStyleProperty(prop: string): boolean;
    matchesElement(element: any, selector: string): boolean;
    containsElement(elm1: any, elm2: any): boolean;
    query(element: any, selector: string, multi: boolean): any[];
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[]): MockAnimationPlayer;
}

/**
 * @publicApi
 */
export declare class MockAnimationPlayer extends NoopAnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    duration: number;
    delay: number;
    easing: string;
    previousPlayers: any[];
    private __finished;
    private __started;
    previousStyles: {
        [key: string]: string | number;
    };
    private _onInitFns;
    currentSnapshot: ɵStyleData;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers: any[]);
    finish(): void;
    destroy(): void;
    play(): void;
    hasStarted(): boolean;
    beforeDestroy(): void;
}

export { }
