import * as React from 'react';
import { delay, cancellablePromise, noop } from "../../class/utils";

export interface IComponentWrapperProps {
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    onDoubleClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    WrappedComponent: any;
}

export default class ComponentWrapper extends React.Component<IComponentWrapperProps> {
    constructor(props: IComponentWrapperProps) {
        super(props);
    }

    public componentWillUnmount(): void {
        // cancel all pending promises to avoid
        // side effects when the component is unmounted
        this.clearPendingPromises();
    }

    private pendingPromises = [];

    private appendPendingPromise = promise => (this.pendingPromises = [...this.pendingPromises, promise]);

    private removePendingPromise = promise => (this.pendingPromises = this.pendingPromises.filter(p => p !== promise));

    private clearPendingPromises = () => this.pendingPromises.map(p => p.cancel());

    private handleClick = () => {
        // create the cancelable promise and add it to
        // the pending promises queue
        const waitForClick = cancellablePromise(delay(300));
        this.appendPendingPromise(waitForClick);

        return waitForClick.promise
            .then(() => {
                // if the promise wasn't cancelled, we execute
                // the callback and remove it from the queue
                this.removePendingPromise(waitForClick);
                this.props.onClick();
            })
            .catch(errorInfo => {
                // rethrow the error if the promise wasn't
                // rejected because of a cancelation
                this.removePendingPromise(waitForClick);
                if (!errorInfo.isCanceled) {
                    throw errorInfo.error;
                }
            });
    }

    private handleDoubleClick = () => {
        // all (click) pending promises are part of a 
        // dblclick event so we cancel them
        this.clearPendingPromises();
        this.props.onDoubleClick();
    }

    public render(): React.ReactElement<IComponentWrapperProps> {
        let Wrapper: any = this.props.WrappedComponent;
        return (
            <Wrapper
                {...this.props}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
            />
        );
    }
}