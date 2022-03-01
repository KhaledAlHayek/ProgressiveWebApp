# criteria to let chrome prompt a screen to add your website to the home
- make sure the user has interacted with the dowmain for at least **30 seconds**
- include a web app manifest
  - has a property of `short_name` or `name`
  - `icons` must include a 192px and 512px sized icons
  - has a `start_url` property
  - has a `display` property, it either can be
    - fullscreen
    - standalone
    - browser-ui
  - must be served on https **it is required for service workers** local host is an exception for the rule
  - has a registered service worker with a fetch event.

see [this guide](https://web.dev/install-criteria/) for more information.