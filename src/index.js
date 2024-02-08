/* eslint-disable no-unused-vars */
import './index.css';
import App from './App/App';

const canvas = document.getElementById('webgl');
const loadingPanel = document.getElementById('loading-panel');
const app = new App(canvas, loadingPanel);
