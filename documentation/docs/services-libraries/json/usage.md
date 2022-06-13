---
sidebar_position: 4
---

# Usage

import TasksBasicModel from '../shared/code-examples/_tasks-basic-model.md'
import JsonApiDatastoreConfig from '../shared/decorator-properties/_json-api-datastore-config.md'
import UsageIntro from '../shared/extending-usage/_intro.md'
import UsageJsonApiModelConfig from '../shared/extending-usage/_json-api-model-config.md'
import UsageDatastore from '../shared/extending-usage/_datastore.md'

<UsageIntro />

## Data Models

All data models you intend to use with this library should extend the base
JsonModel class defined in this library, and should include model configuration
and attribute decorators. The following is an example data model that you might
define in your angular app.

<TasksBasicModel />

<UsageJsonApiModelConfig />

## Datastore

<UsageDatastore />
