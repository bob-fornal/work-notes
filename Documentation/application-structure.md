# Application Structure

This guide is a focused on having an idea of what is important in structuring my application instead of focusing on the actual structure.

Instead of just picking a structure, it's helpful to think about the "why", 

> There are many **right ways** of doing this, and consistency in your project is key.

## Structure

- Core
    - Constants
    - Enums
    - Interfaces
    - Services
        - (api-service abstraction)
- Features
- Pages
    - (generally, component and api-service)
- Shared
    - (folder for _spec-files)
    - (page abstractions)

## LIFT Guidelines

The structure should follow these 4 basic guidelines. When the structure is not feeling comfortable, go back and revisit these LIFT guidelines

* **L**ocating code is easy
* **I**dentify code at a glance
* **F**lat structure as long as possible
* **T**ry to stay DRY (Don't Repeat Yourself)

Another way to check your app structure is to ask yourself ...

> How quickly can you open and work in all of the related files for a feature?

### Locating

If the team cannot find the files they need to work on quickly, that needs to change.

Locating code needs to be untuitive, simple and fast. You may not know the file name or where its related files are, so putting them in the most intuitive locations and near each other saves a ton of time.

### Identify

Looking at a file we expect to know what it contains and represents. If this means longer file names, then so be it. It's more about being descriptive with file names and keeping that contents of the file to exactly one thing. No files with multiple controllers, multiple services, or a mixture.

There are deviations of the 1-per-file rule when there are small sets of things that are all related to each other, they are still easily idnetifiable. If not, 1-per-file.

### Flat

Nobody wants to search 7 levels of folders to find a file. In a folder structure there is no hard and fast number rule, but when a folder has 10 files, that may be time to create subfolders.

The general guidelines here is comfort level. 
