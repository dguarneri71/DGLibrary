import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { IMyButtonProps } from './IMyButtonProps';

export class MyButton extends React.Component<IMyButtonProps, {}> {
    private timer: number = 0;
    private delay: number = 200;
    private prevent: boolean = false;

    constructor(props: IMyButtonProps) {
        super(props);

        this.handleClick.bind(this);
        this.handleDoubleClick.bind(this);
    }

    public render(): React.ReactElement<IMyButtonProps> {
        return (
            <PrimaryButton
                onClick={(event) => { this.handleClick(event, this.props.clickHandler); }}
                onDoubleClick={(event) => { this.handleDoubleClick(event, this.props.doubleClickHandler); }}>{this.props.label}</PrimaryButton>
        );
    }

    private handleClick(event: any, callbackClick: Function): void {
        event.persist();
        this._handleClick.bind(this);
        this.timer = setTimeout(this._handleClick(event, callbackClick), this.delay);
    }

    private _handleClick(event: any, callbackClick: Function): any {
        event.persist();
        if (!this.prevent) {
            if (callbackClick) {
                callbackClick(event);
            }
        }
        this.prevent = false;
    }

    private handleDoubleClick(event: any, callbackDoubleClick: Function): void {
        event.persist();
        clearTimeout(this.timer);
        this.prevent = true;
        if (callbackDoubleClick) {
            callbackDoubleClick(event);
        }
    }
}