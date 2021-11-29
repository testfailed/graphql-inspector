---
title: Using Environments
---

In cases where you have multiple environments and not only production, GraphQL Inspector App can help you keep track of them.

Everything works out of the box, you just need to define the environments and associated branches.

Using multiple environments means:

- targeted notifications
- custom configuration
- and a lot more in near future

> ⚠️ Available only in GitHub Application ⚠️

## Migrate from one to multiple environments

A single environment setup looks like this:

```yaml
schema: 'schema.graphql'
branch: 'master'
```

Adding a new environment is fairly simple:

```yaml
schema: 'schema.graphql'

env:
  production:
    branch: 'master'
  preview:
    branch: 'develop'
```

From now on, every Pull Request or Push to `develop` is tagged as `preview` environment, everything related to `master` is named `production`.

## Global configuration

Defining the same notifications setup in each environment seems like a lot of work! Fortunately, GraphQL Inspector is capable of having a global configuration.

```yaml
schema: 'schema.graphql'

notifications:
  slack: '<slack-webhook>'

env:
  production:
    branch: 'master'
  preview:
    branch: 'develop'
```

All defined environments have now Schema Change Notifications enabled, with Slack as the only target.

In some cases you may want to have a more advanced setup. GraphQL Inspector passes global settings to environment settings and merges them together. On conflicts, the environment setting wins.

```yaml
schema: 'schema.graphql'

diff:
  annotations: true
notifications:
  webhook: '<webhook-url>'
  slack: '<global-slack-url>'

env:
  production:
    branch: 'master'
    notifications:
      slack: '<production-slack-url>'
  preview:
    branch: 'develop'
      diff:
        annotations: false
```

In the example above, every environment has a webhook and Slack notifications enabled but in case of Production environment, Slack has a different url. The Preview environment uses the global Slack but has annotation disabled.
