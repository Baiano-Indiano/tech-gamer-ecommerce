/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ComponentType, Suspense, forwardRef } from 'react';
import { Skeleton } from './Skeleton';

type LoadableOptions = {
  fallback?: React.ReactNode;
};

export function Loadable<T extends ComponentType<any>>(
  Component: T,
  options: LoadableOptions = {}
) {
  const { fallback = <Skeleton /> } = options;

  const LoadableComponent = forwardRef((props: any, ref: any) => (
    <Suspense fallback={fallback}>
      <Component {...props} ref={ref} />
    </Suspense>
  ));

  LoadableComponent.displayName = `Loadable(${
    Component.displayName || Component.name || 'Component'
  })`;

  return LoadableComponent as unknown as T;
}
