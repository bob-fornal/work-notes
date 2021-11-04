# Application to PWA

Application without (or limited) Internet access.

## Options

1. Native Applications (specific codebases)
2. Hybrid (UX not seamless)
3. Cross-platform Native (Xamarin, React-Native)
3. Mobile Web (not mobile application)

## Needs

* Offline
* Slow Internet
* Seamless Installation

## PWA Principles

1. **Reliable** (load instantly, never show dinosaur)
2. **Fast** (no janky animations or scroll)
3. **Engaging** (natural, immersive UX)

## Web Application Manifest

JSON file that tells the browser about the "application" and how it should behave when "installed' on the user's device or desktop.

## Service Worker

At its simplest, a script that runs in a web browser and manages caching for an application.

* Scoped to the location of the worker.
* Must be serviced over https.
* Catch and cache requests for client under scope only.
