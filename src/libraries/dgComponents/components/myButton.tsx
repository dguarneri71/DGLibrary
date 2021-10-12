import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';
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
                onClick={(event) => { this.handleClick(event, this.doClickAction.bind(this)); }}
                onDoubleClick={(event) => { this.handleDoubleClick(event, this.noop); }}>No Double Click</PrimaryButton>
        );
    }

    private doClickAction(): void {
        console.log("CLICK: ");
    }

    private doDoubleClickAction(): void {
        console.log("DOUBLE-CLICK: ");
    }

    //Funziona vuota - non fa nulla
    private noop = () => { };

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