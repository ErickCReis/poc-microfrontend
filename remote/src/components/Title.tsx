import React from 'react';
import "../main.css";
import { cn } from '../utils/utils';
export default function Title(): React.JSX.Element {
    return <h1 className={cn('text-red-500')}>Remote Title</h1>
}