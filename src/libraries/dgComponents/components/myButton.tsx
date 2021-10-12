import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { IMyButtonProps } from './IMyButtonProps';

export default class MyButton extends React.Component<IMyButtonProps, {}> {
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
                onClick={(event) => { this.handleClick(event, this.props.clickHandler.bind(this)); }}
                onDoubleClick={(event) => { this.handleDoubleClick(event, this.props.doubleClickHandler.bind(this)); }}>No Double Click</PrimaryButton>
        );
    }

    /* private doClickAction(): void {
        console.log("CLICK: ");
    }

    private doDoubleClickAction(): void {
        console.log("DOUBLE-CLICK: ");
    }

    private noop = () => { }; */

    private handleClick(event: any, callbackClick: Function): void {
        this._handleClick.bind(this);
        this.timer = setTimeout(this._handleClick(callbackClick), this.delay);
    }

    private _handleClick(callbackClick: Function): any {
        if (!this.prevent) {
            if (callbackClick) {
                callbackClick();
            }
        }
        this.prevent = false;
    }

    private handleDoubleClick(event: any, callbackDoubleClick: Function): void {
        clearTimeout(this.timer);
        this.prevent = true;
        if (callbackDoubleClick) {
            callbackDoubleClick();
        }
    }
}