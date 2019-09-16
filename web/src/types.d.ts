/// <reference types="react-scripts" />
import RollbarType from 'rollbar';

declare global {
  interface Window {
    Rollbar: RollbarType;
  }
}