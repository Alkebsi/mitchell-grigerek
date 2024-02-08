# Mitchell Grigerek
This repo containes some information that are useful ro Mitchell only. I have created two small scene to show Mitchell some ideas on how his project can be. 

> Note: I have not created the models from zero. They were downloaded from Sketchfab. That doesn't mean that I am not knowledgabe in 3D softwares, especially Blender. It was just going to take so mush time!

## What is working?
I wanted to experiment with how an orthographic camera can interact with an isometric scene. If you go to https://alkebsi.github.io/mitchell-grigerek/dist/ you will see the scene as it is expected to be for the production phase. 

Adding `#tests` to the end of the URL and reloading the page will show you the GUI to play with some properties like lights, camera (though it has some bugs for now), and the whole scene. You can also go to https://alkebsi.github.io/mitchell-grigerek/dist/#tests directly to test things out.

## Why did I do that?
It was just a test of how things will be like. This will be full of bugs and is not ment for production at all. It was a fast test and it just shows things in a better manner.

## Dynamic Lights
Both scenes are using dynamic lights. Both are simple with not much textures. The city used a well-known material called `MeshToomMaterial()` that gave it a 2D vibe!

The room was exported as it is right from Blender!

## The Models
Those models have many issues. They were downloaded from Sketchfab and were not optimized at all. This was the main reason why the city flickers once the outlines are applyied on it. If the client just happend to have the same problem, then I will optimaize the models manually.

The city model was about `22MB` and its loading time is so bad! Though, exporting it with a DRACO compression will make it just `2.80MB`! That is really a huge difference, and may apply this techniqe in case the clients files are as big!

## What Should You Do With This?
I have made this to make some ideas clear in your mind. You can see how things will look like in case I was assigned for this project.

Moreover, I will not bother me at all if you want to share this work with your client and tell if a thing like this would be great. Even if say that MAG-RAW made this experment, I will not be bothered. It is yours now!

