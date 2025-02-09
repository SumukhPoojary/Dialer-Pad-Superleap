import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Register NativeScript theme
import { Application } from '@nativescript/core';
Application.setResources({ theme: "light" });

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: true });

ReactNativeScript.start(React.createElement(MainStack, {}, null));