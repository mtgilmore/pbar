/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
import { COMPILER_OPTIONS, PLATFORM_ID } from '@angular/core';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS as INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { ResourceLoaderImpl } from './resource_loader/resource_loader_impl';
var ɵ0 = { providers: [{ provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }] }, ɵ1 = PLATFORM_BROWSER_ID;
/**
 * @publicApi
 */
export var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    {
        provide: COMPILER_OPTIONS,
        useValue: ɵ0,
        multi: true
    },
    { provide: PLATFORM_ID, useValue: ɵ1 },
];
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9wbGF0Zm9ybV9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBQyxvQ0FBb0MsSUFBSSxtQ0FBbUMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO1NBUzVELEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBQyxPQUczRCxtQkFBbUI7QUFWdEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSwyQ0FBMkMsR0FBcUI7SUFDM0UsbUNBQW1DO0lBQ25DO1FBQ0UsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixRQUFRLElBQWtGO1FBQzFGLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxJQUFxQixFQUFDO0NBQ3RELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1Jlc291cmNlTG9hZGVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0NPTVBJTEVSX09QVElPTlMsIFBMQVRGT1JNX0lELCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7ybVJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyBhcyBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSU30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7UmVzb3VyY2VMb2FkZXJJbXBsfSBmcm9tICcuL3Jlc291cmNlX2xvYWRlci9yZXNvdXJjZV9sb2FkZXJfaW1wbCc7XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgSU5URVJOQUxfQlJPV1NFUl9EWU5BTUlDX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMsXG4gIHtcbiAgICBwcm92aWRlOiBDT01QSUxFUl9PUFRJT05TLFxuICAgIHVzZVZhbHVlOiB7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFJlc291cmNlTG9hZGVyLCB1c2VDbGFzczogUmVzb3VyY2VMb2FkZXJJbXBsLCBkZXBzOiBbXX1dfSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9CUk9XU0VSX0lEfSxcbl07XG4iXX0=