# Serverless Twitter Example

## Setup

### Prerequisites

* [Amazon AWS account](https://aws.amazon.com)
* [Homebrew](https://brew.sh)
* [Python](https://www.python.org/downloads/)
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com)

### AWS CLI

First, you would need to login to the [AWS console](https://aws.amazon.com/console/), create a new IAM User with administrator access and generate credentials. Write down your access key and secret access details, you will need them for configuring the CLI. More information on how to generate user credentials here: [Managing Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

Once that is done, run the following command to install [AWS CLI](https://aws.amazon.com/cli/) using Homebrew:
```
brew install awscli
```

After it gets installed, run the following to configure the User IAM credentials you generated:
```
aws configure
```

### Installation

To install the current project as is, just run:
```
npm install
```

This will take care of all the dependencies needed for the API and the Client.

## Deployment

To deploy, simply run the following command:
```
npm run deploy
```

Once it's done, it will provide a url to your app's website.

## Removing from AWS

You can remove your project running the following command:
```
npm run deploy:remove
```

This will take care of cleaning/removing all your resources from AWS automatically.

*WARNING*: This will even remove existing databases and user pools, so be careful.

## Manual User Creation

To create a username to be used in your application manually you can do the following from your terminal:
```
aws cognito-idp sign-up --region <aws_region> --client-id <user_client_id> --username <username> --password <password>
aws cognito-idp admin-confirm-sign-up --region <aws_region> --user-pool-id <user_pool_id> --username <username>
```

It will create and confirm your username for it to be available for testing.
