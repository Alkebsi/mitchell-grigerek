# Mitchell Grigerek
This repo containes some information that are useful ro Mitchell only. I have created two small scene to show Mitchell some ideas on how his project can be. 

> Note: I have not created the models from zero. They were downloaded from Sketchfab. That doesn't mean that I am not knowledgabe in 3D softwares, especially Blender. It was just going to take so mush time!

## What is working?
I wanted to expermient with how an orthographic camera can interact with the scene. If you go to https://alkebsi.github.io/mitchell-grigerek/dist/ you will see the scene as it is expected to be for the production phase. 

Adding `#tests` to the end of the URL and reloading the page will show you the GUI to play with some properties like lights, camera, and the whole scene. You can also go to https://alkebsi.github.io/mitchell-grigerek/dist/#tests directly to test things out.

I have also created a city and want you to test that one out. Go to the top-right corner of your screen and under `World` change the `Room` dropdown to the `City` and go to the `>City` properties to change play a little with them.

## Why did I do that?
It was just a test of how things will be like. This will be full of bugs and is not ment for production at all. It was a fast test and it just shows things in a better manner.

## Dynamic Lights
The room scene is using dynamic lights. Since it only has few geometries, it was smooth and will work on most devices.

The city, however, doesn't has any light at all! 