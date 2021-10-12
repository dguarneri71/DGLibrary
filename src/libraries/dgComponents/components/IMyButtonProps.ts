import * as React from 'react';

export interface IMyButtonProps {
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    doubleClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}  