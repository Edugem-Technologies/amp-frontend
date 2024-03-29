# About NextJs-Boilerplate

TBD

This is a [Next.js](https://nextjs.org/) project bootstrapped

with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements:

-   Next 14.0.4

-   NPM 6.14.15

-   Node >=v18.17

## Technical Details:

-   Frontend Framework: Next Js, Bootstrap V5

-   Source Control: Github

## Project Directory Structure

```



│ ├── .husky
│ │ └── pre-commit
│ │ 	└── this file contains all the pre-commit hooks that are executed automatically before commiting the code
│ │ 	└── lint
│ │  		└── for linting we use es-lint code standards
│ │  		└── `npm run lint` will executed to verify the es-lint code standards are followed
│ │ 	└── build
│ │ 		└── `npm run build` will executed to verify that production build is created successfully
│ ├── public
| | ├── images
| | 	└── this directory contains all the images and icons used in the application
├ ├── src
│ │ ├── app
│ │  	└── each folder in next js is a url.
│ │         └── components
│ │ 	        └── common reusable react components
| |  ├── styles
| | 	 └── scss
| | 		└── we follow scss for styling
│ | 	 	└── the default styling is bootstrap
│ | 	 	└── to write any custom scss, use \style.scss
| | ├── enums
│ │  	└── each file contains enums used in the code
| | ├── fixtures
| |  	└── each file contains static data used in different components
│ │ ├── services
│ │  	└── abstract layer to communicate to rest api
| | ├── types
| |  	└── auth
| | 		└── each file in this directory contains type information used as props for each component
| |  	└── components
| | 		└── each file in this directory contains type information used as props for each component
| | 	└── common
| | 		└── each file in this directory contains type information that is used in multiple places
│ │ ├── utils
│ │ 	└── utils has common methods which can be used on any page and component
│ │     └── constants
│ │ 	    └── this file contains all the constants used in the application
│ │ ├── validations
│ │ 	└── each file in this directory contains form-validation schemas with types used for different forms
│ │ └── README.md

```

## Getting Started

Setup .env file

```bash

Create  a  new  .env  file,  simply  run  the  following  command  in  your  terminal:

cp  .env.example  .env



This  command  will  copy  the  .env.example  file  and  create  a  new  file  called  .env.  You  can  then  edit  the  new  .env  file  to  include  the  necessary  values  for  your  application.

```

Then, install all the dependencies:

```bash

npm  ci

```

Run the development server:

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
