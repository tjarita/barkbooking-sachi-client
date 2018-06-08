## Table of Contents

- [Folder Structure](#folder-structure)
  - [Components](#components)
  - [Scenes](#scenes)
  - [Services](#services)
- [Domain Terminology](#domain-terminology)
  - [Pet](#pet)
    - [Pet Flags](#pet-flags)
      - [Temperament Flag](#temperament-flag)
      - [Anxiety Flag](#anxiety-flag)
      - [Grooming Flag](#grooming-flag)
      - [Medical Flag](#medical-flag)
      - [User Flag](#user-flag)
  - [Customer](#customer)
  - [Artisan](#artisan)
- [Misc](#misc)

# Folder Structure

Consists of three main folders organized to help keep things clean as the project grows. 

1. components
2. scenes
3. services

Example:

```
/src
  /components 
    /Button 
    /Notifications
      /components
        /ButtonDismiss  
          /images
          /locales
          /specs 
          /index.js
          /styles.scss
      /index.js
      /styles.scss
  /scenes
    /Home 
      /components 
        /ButtonLike
      /services
        /processData
      /index.js
      /styles.scss
    /Sign 
      /components 
        /FormField
      /scenes
        /Login
        /Register 
          /locales
          /specs
          /index.js
          /styles.scss
  /services
    /api
    /geolocation
    /session
      /actions.js
      /index.js
      /reducer.js
    /users
      /actions.js
      /api.js
      /reducer.js
  index.js 
  store.js
```

Each component, scene, or service (a feature) has everything it needs to work on its own, such as its own styles, images, translations, set of actions as well as unit or integration tests. You can see a feature like an independent piece of code you will use in your app (kinda like *node modules*).

To work properly, they should follow these rules:

- A component can define nested components or services. It cannot use or define scenes.
- A scene can define nested components, scenes or services.
- A service can define nested services. It cannot use or define components or scenes.
- Nested features can only use from its parent.


*Note: By parent feature, I mean a parent, grandparent, great-grandparent etc… You cannot use a feature that is a “cousin”, this is not allowed. You will need to move it to a parent to use it.*

## Components

You all already know what a component is, but one important thing in this organization is the ability to nest a component into another component.

Components defined at the root level of your project, in the components folder, are global and can be used anywhere in your application. But if you decide to define a new component inside another component (nesting), this new component can only be used its direct parent.

**Why would you want to do that?**

When you develop a large application, it happens quite often that you need to create a component that you definitively know you won’t reuse anywhere else, but you need it. If you add it at the root level of your components folder, it will get lost with hundreds of components. Sure, you could categorize them, but when it’s time to do some clean-up, you won’t remember what they are all for or if they are still being used somewhere.

Although, if you define at the root level only the main components of your application, such as buttons, form fields, thumbnails, but also more complicated one like listComments, formComposer with their own children components, it gets much easier to find what you need.

Example:

```
/src
  /components
    /Button
      /index.js
    /Notifications 
      /components 
        /ButtonDismiss 
          /index.js
      /actions.js
      /index.js
      /reducer.js
```
- *Button* can be used anywhere in your application.
- *Notifications* can also be used anywhere. This component defines a component ButtonDismiss. You cannot use ButtonDismiss anywhere else than in the Notifications component.
- *ButtonDismiss* uses Button internally, this is authorized because Button is defined at the root level of components.

## Scenes

A scene is a page of your application. You can see a scene just like any component, but I like to separate them into their own folder.

If you use React-Router or React Native Router, you can import all your scenes in your main index.js file and setup your routes.

With the same principle components can be nested, you can also nest a scene into a scene, and also define components or services into a scene. You have to remember that if you decide to define something into a scene, you can only use it within the scene folder itself.

```
/src
  /scenes
    /Home 
      /components
        /ButtonShare
          /index.js
      /index.js
    /Sign
      /components
        /ButtonHelp
          /index.js
      /scenes
        /Login
          /components 
            /Form
              /index.js
            /ButtonFacebookLogin
              /index.js
          /index.js
       
        /Register
          /index.js
      /index.js
```

- *Home* has a component *ButtonShare*, it can only be used by the Home scene.
- *Sign* has a component *ButtonHelp*. This component can be used by *Login* or *Register* scenes, or by any components defined in those scenes.
- *Form* component uses *ButtonHelp* internally, this is authorized because *ButtonHelp* is defined by a parent.
- The *Register* scene cannot use any of the components defined in *Login*, but it can use the ButtonHelp.

## Services

Not everything can be a component, and you will need to create independent modules that can be used by your components or scenes.

You can see a service like a self-contained module where you will define the core business logic of your application. This can eventually be shared between several scenes or even applications, such as a web and native version of you app.

```
/src
  /services
    /api
      /services
        /handleError
          /index.js
      /index.js
    /geolocation 
    /session 
      /actions.js
      /index.js
      /reducer.js
```

I recommend you to create services to manage all api requests. You can see them as a bridge/an adapter between the server API and the view layer (scenes and components) of your application. It can take care of network calls your app will make, get and post content, and transform payloads as needed before being sent or saved in the store of your app (such as Redux). The scenes and components will only dispatch actions, read the store and update themselves based on the new changes.

*Inspired by [this](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) post by Alexis Mangin*

# Domain Terminology

In order to maintain consistency throughout the application and documentation, we will define standard terms and naming conventions here.

A pet is an animal that belongs to one [customer](#customer).


## Pet
```json
{
  "name":"Pet Name",
  "species":"Species Type",
  "breed":["Breed 1", "Breed 2"],
  "birthday":"Birthday",
  "gender":"Pet Gender",
  "textNote":["Note1","Note2"],
  "pictureNote":["BinaryPicture1","BinaryPicture2"],
  "petFlags":[
    {
      "flagType":"Type of flag. Defaults are temperament, anxiety, grooming, and medical", 
      "flagReason":"Reason for flagging / description of the condition"},
      {
        //another flag
      }
  ]
}
```

### Pet Flags

Description of the default flags

#### Temperament Flag

Temperament flags indicate *permanent characteristics* of a pet such as aggressiveness or frequent pooping.

#### Anxiety Flag

Anxiety flags indicate scenarios that can induce *temporary anxiety* such as bathing or blow drying.

#### Grooming Flag

Grooming flags indicate the need of *special care when grooming* such as long drying times or frequent matting.

#### Medical Flag

Medical flags indicate *special medical requirements* such as medicated shampoos or owner provided chemicals.

#### User Flag

[Artisans](#artisan) can create their own flag to use.

```json
{
  "flagType":"Type of flag like aggression",
  "flagReason":"Reason for flagging / description of the condition"
}
```

## Customer

Customers can be associated with many [artisans](#artisan). Customers can have zero or more [pets](#pet) registered to them. 

## Artisan

Artisans can have one to many [customers](#customer)

# Misc

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find a guide to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

