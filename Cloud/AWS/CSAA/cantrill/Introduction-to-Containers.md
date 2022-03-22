# Introduction to Containers

Virtualization Problems ...

* Guest OS consumes a lot of available EC2 resources.

Containerization ...

* Example, Docker.

Image Anatomy ...

* Docker Image.
* **Docker File** is used to build docker images. Each step creates file system layers.
* Images are created from a base image or scratch.
* Images contain **read-only** layers, changes are layered onto the image using a differential architecture.
* **Docker Container** is a Docker Image with a Read/Write layer.

Key Concepts ...

* **Dockerfiles** are used to **build images**.
* They are portable, self-contained, and always run as expected.
* Lightweight, parent OS is used, file system layers are shared.
* Container only runs the application and environment it needs.
* Provides much of the isolation that VMs do.
* Ports are **exposed** to the host and beyond.
* Application stacks can be multi-container.
