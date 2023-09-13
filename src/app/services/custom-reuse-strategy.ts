import { Injectable } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {
    private handlers: { [key: string]: DetachedRouteHandle } = {};
    private scrollPositions: { [key: string]: number } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return route.data && route.data['reuseStrategy'] === 'enabled';
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        const path = this.getRoutePath(route);
        const reuseStrategyEnabled = route.data && route.data['reuseStrategy'] === 'enabled';
        if (reuseStrategyEnabled && handle) {
            this.handlers[path] = handle;
            this.scrollPositions[path] = window.pageYOffset;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getRoutePath(route);
        return !!this.handlers[path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const path = this.getRoutePath(route);
        return this.handlers[path] || null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private getRoutePath(route: ActivatedRouteSnapshot): string {
        return route.routeConfig && route.routeConfig.path || '';
    }
    private getKey(route: ActivatedRouteSnapshot): string {
        // Generate a unique key based on the route's URL and component
        return route.url.join('/') + `/${route.component?.name}`;
    }

    getScrollPosition(route: ActivatedRouteSnapshot): number {
        const key = this.getKey(route);
        return this.scrollPositions[key] || 0;
    }
}
