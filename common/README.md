# Commands used to build and package up the library

```commandline
# Install the npm package
npm install @travismtickets/common

# Update library rebuild and publish it
# Commit all changes to github:
git add .; git commit -m "UPDATE"; git push REPO BRANCH_NAME
npm run pub
# This is an alias for the following command:
npm version patch && npm run build && npm publish
```

# Updating services with new version

Once you update this package with the above commands you need to go into the services you want the updates and run the command: `npm update @travismtickets/common` this will update to the lastest version.

# Notes on the package
The `common` directory is a package that is shared between all the services, or thats the idea.
