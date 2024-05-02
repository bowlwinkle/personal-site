# Personal Site

Creating a personal site for myself and gives me an excuse to try out Semantic UI and Pulumi.

## Commands

```shell
npm run start
npm run style
npm run lint
npm run build
npm run analyze
npm run test
```

## Deployment

User `personal_site` that can't do anything but assume a role.
Role `web_client_infra_management` that can perform CRUD on S3 and CloudFront.

Obtain temporary credentials:

```shell
aws sts assume-role --role-arn arn:aws:iam::<accountIDHere>:role/web_client_infra_management --role-session-name "personal_site" --profile personal_site > output.txt
```

Output is a file with `AccessKey`, `SecretAccessKey`, and `SessionToken`.

Export into environment vars into the shell session:

```shell
export AWS_ACCESS_KEY_ID=ASIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export AWS_SESSION_TOKEN=AQoDYXdzEJr...<remainder of session token>
```

Run `Pulumi` deployment:

```shell

```

### Pulumi

Setup AWS credentials (using temp creds, so will also need to provide SessionToken):

```shell
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
export AWS_REGION=<YOUR_AWS_REGION>
export AWS_SESSION_TOKEN=<YOUR_AWS_SESSION_TOKEN>
```

You can also set the region using the CLI: `pulumi config set aws:region <your-region>`

export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID> && export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY> && export AWS_REGION=<YOUR_AWS_REGION>
