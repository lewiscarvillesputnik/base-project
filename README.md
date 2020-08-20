# Base Project

Static files templated using [Hugo](https://gohugo.io/)

## Prerequisites

+ Hugo


## Developing Locally

Install dependencies:

    npm install

To run the local server:

    hugo server

http://localhost:1313/

For testing on devices on the same network run:

    hugo server --bind 0.0.0.0 --baseURL=http://192.168.1.72:1313

http://192.168.1.72:1313/

Change 192.168.1.72 to your computer's IPv4 address

## Structure

The site content lives in Markdown files in the content directory.

At the top of the file sits a YAML defined structure of the components that we want on the given page.

Each component has its own parameters which define the content for it.


## Compiling for production

To build the static site to the 'build' directory run:

    hugo

## Deployment

Deployment is automatic when merging into master via a Github action that triggers the following command

    hugo -v deploy --maxDeletes -1 --invalidateCDN

## Infrastructure

+ Cloudflare (DNS only)
+ AWS SSL certficate manager
+ CloudFront CDN to handle traffic
+ Lamda@Edge function to provide basic authentication
+ S3 static site
+ Github version control
+ Github Actions to trigger build & deployment on merge to master. Also invalidates CDN on push


