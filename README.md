# Victor Jacek - 2021

# Requirements

- NodeJS
- Yarn

Written and tested on MacOS

# Design
  
I used `create-react-app` for getting the application up and running without needing to configure the details of several different important parts of the system such as React and Webpack.  In a production application, each of these should be configured and tuned to meet the specific needs of that system.

I kept the UI incredibly simple and went with an ASCII-art aesthetic similar to the tools `top` or `htop`.  I purposely avoided adding a layout library like Bootstrap in order to focus on features - while I enjoy the design process, that isn't the focus of this project, and I'd rather work with talented UX designers who know the space much better than I do.

### Backend

The backend service is a very simple Express server which returns the CPU load.  Since this project is a PoC for frontend code, there is no persistence, and only the current CPU load is returned.

If I were going to extend this project to production, I'd move all of the alerting logic to the backend as it would be useful to save that data for non-realtime analysis, and computing many different alerts could take siginificant compute resources.

### Frontend   

The Container/Presenter pattern is used (`AppContainer.js` and `App.js`) to separate data from layout/structure.

Network requests are separated into their own functions and file for reusability (`requests.js`).

The alert threshold can be changed (set really low) in `constants.js` to get the Alert to display frequently.  It's currently at 5%, and the tests are set up to use that, but it could be configurable and have the tests set to be relative to that variable.

A few feature ideas that I'd add if I were extending this project further: graphs and alerts for individual CPUs, cache 10 minutes (or more!) of data on the server so that the FE doesn't have to wait for the BE to generate data and can be useful immediately, eject from `create-react-app` and fully integrate the backend services instead of just using `proxy` in `package.json`.

# Running the application

Start the backend service application locally:  
This runs on port 3001 for development.
```
yarn start-service
```

Start the frontend application locally:  
This runs on port 3000 for development.
```
yarn start
```

Running unit tests:
```
yarn test
```