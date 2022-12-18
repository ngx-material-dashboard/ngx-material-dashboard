import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: any = {
    'base-json': [
        {
            text: 'base-json',
            selector: 'base-json',
            children: [
                {
                    text: 'Converters',
                    selector: 'converters',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'date-converter'
                            ],
                            selector: 'date-converter',
                            text: 'DateConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'json-model-converter'
                            ],
                            selector: 'json-model-converter',
                            text: 'JsonModelConverter'
                        }
                    ]
                },
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'attribute'
                            ],
                            selector: 'attribute',
                            text: 'Attribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-datastore-config'
                            ],
                            selector: 'json-api-datastore-config',
                            text: 'JsonApiDatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-model-config'
                            ],
                            selector: 'json-api-model-config',
                            text: 'JsonApiModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-attribute'
                            ],
                            selector: 'json-attribute',
                            text: 'JsonAttribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'nested-attribute'
                            ],
                            selector: 'nested-attribute',
                            text: 'NestedAttribute'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'attribute-decorator-options'
                            ],
                            selector: 'attribute-decorator-options',
                            text: 'AttributeDecoratorOptions'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'datastore-config'
                            ],
                            selector: 'datastore-config',
                            text: 'DatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-api-error'
                            ],
                            selector: 'json-api-error',
                            text: 'JsonApiError'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-model-converter-config'
                            ],
                            selector: 'json-model-converter-config',
                            text: 'JsonModelConverterConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-config'
                            ],
                            selector: 'model-config',
                            text: 'ModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'overrides'
                            ],
                            selector: 'overrides',
                            text: 'Overrides'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'property-converter'
                            ],
                            selector: 'property-converter',
                            text: 'PropertyConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-type'
                            ],
                            selector: 'model-type',
                            text: 'ModelType'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'error-response'
                            ],
                            selector: 'error-response',
                            text: 'ErrorResponse'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-meta-model'
                            ],
                            selector: 'json-api-meta-model',
                            text: 'JsonApiMetaModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-nested-model'
                            ],
                            selector: 'json-api-nested-model',
                            text: 'JsonApiNestedModel'
                        },
                        {
                            route: ['./', 'base-json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'meta-model-type'
                            ],
                            selector: 'meta-model-type',
                            text: 'MetaModelType'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'services',
                                'json-datastore'
                            ],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                },
                {
                    route: ['./', 'base-json', 'json-api-query-data'],
                    selector: 'json-api-query-data',
                    text: 'JsonApiQueryData'
                }
            ]
        },
        {
            text: 'json',
            selector: 'json',
            children: [
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: ['./', 'json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: ['./', 'json', 'services', 'json-datastore'],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                }
            ]
        },
        {
            text: 'json-api',
            selector: 'json-api',
            children: [
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'decorators',
                                'belongs-to'
                            ],
                            selector: 'belongs-to',
                            text: 'BelongsTo'
                        },
                        {
                            route: ['./', 'json-api', 'decorators', 'has-many'],
                            selector: 'has-many',
                            text: 'HasMany'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'models',
                                'json-api-model'
                            ],
                            selector: 'json-api-model',
                            text: 'JsonApiModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'services',
                                'json-api-datastore'
                            ],
                            selector: 'json-api-datastore',
                            text: 'JsonApiDatastore'
                        }
                    ]
                }
            ]
        }
    ],
    json: [
        {
            text: 'base-json',
            selector: 'base-json',
            children: [
                {
                    text: 'Converters',
                    selector: 'converters',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'date-converter'
                            ],
                            selector: 'date-converter',
                            text: 'DateConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'json-model-converter'
                            ],
                            selector: 'json-model-converter',
                            text: 'JsonModelConverter'
                        }
                    ]
                },
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'attribute'
                            ],
                            selector: 'attribute',
                            text: 'Attribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-datastore-config'
                            ],
                            selector: 'json-api-datastore-config',
                            text: 'JsonApiDatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-model-config'
                            ],
                            selector: 'json-api-model-config',
                            text: 'JsonApiModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-attribute'
                            ],
                            selector: 'json-attribute',
                            text: 'JsonAttribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'nested-attribute'
                            ],
                            selector: 'nested-attribute',
                            text: 'NestedAttribute'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'attribute-decorator-options'
                            ],
                            selector: 'attribute-decorator-options',
                            text: 'AttributeDecoratorOptions'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'datastore-config'
                            ],
                            selector: 'datastore-config',
                            text: 'DatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-api-error'
                            ],
                            selector: 'json-api-error',
                            text: 'JsonApiError'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-model-converter-config'
                            ],
                            selector: 'json-model-converter-config',
                            text: 'JsonModelConverterConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-config'
                            ],
                            selector: 'model-config',
                            text: 'ModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'overrides'
                            ],
                            selector: 'overrides',
                            text: 'Overrides'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'property-converter'
                            ],
                            selector: 'property-converter',
                            text: 'PropertyConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-type'
                            ],
                            selector: 'model-type',
                            text: 'ModelType'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'error-response'
                            ],
                            selector: 'error-response',
                            text: 'ErrorResponse'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-meta-model'
                            ],
                            selector: 'json-api-meta-model',
                            text: 'JsonApiMetaModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-nested-model'
                            ],
                            selector: 'json-api-nested-model',
                            text: 'JsonApiNestedModel'
                        },
                        {
                            route: ['./', 'base-json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'meta-model-type'
                            ],
                            selector: 'meta-model-type',
                            text: 'MetaModelType'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'services',
                                'json-datastore'
                            ],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                },
                {
                    route: ['./', 'base-json', 'json-api-query-data'],
                    selector: 'json-api-query-data',
                    text: 'JsonApiQueryData'
                }
            ]
        },
        {
            text: 'json',
            selector: 'json',
            children: [
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: ['./', 'json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: ['./', 'json', 'services', 'json-datastore'],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                }
            ]
        },
        {
            text: 'json-api',
            selector: 'json-api',
            children: [
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'decorators',
                                'belongs-to'
                            ],
                            selector: 'belongs-to',
                            text: 'BelongsTo'
                        },
                        {
                            route: ['./', 'json-api', 'decorators', 'has-many'],
                            selector: 'has-many',
                            text: 'HasMany'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'models',
                                'json-api-model'
                            ],
                            selector: 'json-api-model',
                            text: 'JsonApiModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'services',
                                'json-api-datastore'
                            ],
                            selector: 'json-api-datastore',
                            text: 'JsonApiDatastore'
                        }
                    ]
                }
            ]
        }
    ],
    'json-api': [
        {
            text: 'base-json',
            selector: 'base-json',
            children: [
                {
                    text: 'Converters',
                    selector: 'converters',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'date-converter'
                            ],
                            selector: 'date-converter',
                            text: 'DateConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'converters',
                                'json-model-converter'
                            ],
                            selector: 'json-model-converter',
                            text: 'JsonModelConverter'
                        }
                    ]
                },
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'attribute'
                            ],
                            selector: 'attribute',
                            text: 'Attribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-datastore-config'
                            ],
                            selector: 'json-api-datastore-config',
                            text: 'JsonApiDatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-api-model-config'
                            ],
                            selector: 'json-api-model-config',
                            text: 'JsonApiModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'json-attribute'
                            ],
                            selector: 'json-attribute',
                            text: 'JsonAttribute'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'decorators',
                                'nested-attribute'
                            ],
                            selector: 'nested-attribute',
                            text: 'NestedAttribute'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'attribute-decorator-options'
                            ],
                            selector: 'attribute-decorator-options',
                            text: 'AttributeDecoratorOptions'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'datastore-config'
                            ],
                            selector: 'datastore-config',
                            text: 'DatastoreConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-api-error'
                            ],
                            selector: 'json-api-error',
                            text: 'JsonApiError'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'json-model-converter-config'
                            ],
                            selector: 'json-model-converter-config',
                            text: 'JsonModelConverterConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-config'
                            ],
                            selector: 'model-config',
                            text: 'ModelConfig'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'overrides'
                            ],
                            selector: 'overrides',
                            text: 'Overrides'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'property-converter'
                            ],
                            selector: 'property-converter',
                            text: 'PropertyConverter'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'interfaces',
                                'model-type'
                            ],
                            selector: 'model-type',
                            text: 'ModelType'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'error-response'
                            ],
                            selector: 'error-response',
                            text: 'ErrorResponse'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-meta-model'
                            ],
                            selector: 'json-api-meta-model',
                            text: 'JsonApiMetaModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'json-api-nested-model'
                            ],
                            selector: 'json-api-nested-model',
                            text: 'JsonApiNestedModel'
                        },
                        {
                            route: ['./', 'base-json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        },
                        {
                            route: [
                                './',
                                'base-json',
                                'models',
                                'meta-model-type'
                            ],
                            selector: 'meta-model-type',
                            text: 'MetaModelType'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'base-json',
                                'services',
                                'json-datastore'
                            ],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                },
                {
                    route: ['./', 'base-json', 'json-api-query-data'],
                    selector: 'json-api-query-data',
                    text: 'JsonApiQueryData'
                }
            ]
        },
        {
            text: 'json',
            selector: 'json',
            children: [
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: ['./', 'json', 'models', 'json-model'],
                            selector: 'json-model',
                            text: 'JsonModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: ['./', 'json', 'services', 'json-datastore'],
                            selector: 'json-datastore',
                            text: 'JsonDatastore'
                        }
                    ]
                }
            ]
        },
        {
            text: 'json-api',
            selector: 'json-api',
            children: [
                {
                    text: 'Decorators',
                    selector: 'decorators',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'decorators',
                                'belongs-to'
                            ],
                            selector: 'belongs-to',
                            text: 'BelongsTo'
                        },
                        {
                            route: ['./', 'json-api', 'decorators', 'has-many'],
                            selector: 'has-many',
                            text: 'HasMany'
                        }
                    ]
                },
                {
                    text: 'Models',
                    selector: 'models',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'models',
                                'json-api-model'
                            ],
                            selector: 'json-api-model',
                            text: 'JsonApiModel'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'services',
                    children: [
                        {
                            route: [
                                './',
                                'json-api',
                                'services',
                                'json-api-datastore'
                            ],
                            selector: 'json-api-datastore',
                            text: 'JsonApiDatastore'
                        }
                    ]
                }
            ]
        }
    ],
    widgets: [
        {
            text: 'collection',
            selector: 'collection',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'collection'
                            ],
                            selector: 'collection',
                            text: 'Collection'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-collection'
                            ],
                            selector: 'paged-collection',
                            text: 'PagedCollection'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-collection-with-icon-toolbar'
                            ],
                            selector: 'paged-collection-with-icon-toolbar',
                            text: 'PagedCollectionWithIconToolbar'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-collection-with-raised-button-toolbar'
                            ],
                            selector:
                                'paged-collection-with-raised-button-toolbar',
                            text: 'PagedCollectionWithRaisedButtonToolbar'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-collection-with-toolbar'
                            ],
                            selector: 'paged-collection-with-toolbar',
                            text: 'PagedCollectionWithToolbar'
                        }
                    ]
                },
                {
                    text: 'Directives',
                    selector: 'Directives',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'directives',
                                'collection-button-click'
                            ],
                            selector: 'collection-button-click',
                            text: 'CollectionButtonClick'
                        }
                    ]
                },
                {
                    text: 'Enums',
                    selector: 'Enums',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'enums',
                                'button-click-action'
                            ],
                            selector: 'button-click-action',
                            text: 'ButtonClickAction'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'Interfaces',
                    children: [
                        {
                            route: ['./', 'widgets', 'interfaces', 'button'],
                            selector: 'button',
                            text: 'Button'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'Services',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'services',
                                'remote-data-source'
                            ],
                            selector: 'remote-data-source',
                            text: 'RemoteDataSource'
                        },
                        {
                            route: ['./', 'widgets', 'services', 'selection'],
                            selector: 'selection',
                            text: 'Selection'
                        }
                    ]
                }
            ]
        },
        {
            text: 'dialog',
            selector: 'dialog',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'confirm-delete'
                            ],
                            selector: 'confirm-delete',
                            text: 'ConfirmDelete'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'Interfaces',
                    children: [
                        {
                            route: ['./', 'widgets', 'interfaces', 'data'],
                            selector: 'data',
                            text: 'Data'
                        }
                    ]
                }
            ]
        },
        {
            text: 'form',
            selector: 'form',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'field-error'
                            ],
                            selector: 'field-error',
                            text: 'FieldError'
                        }
                    ]
                },
                {
                    text: 'Directives',
                    selector: 'Directives',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'directives',
                                'click-stop-propagation'
                            ],
                            selector: 'click-stop-propagation',
                            text: 'ClickStopPropagation'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'directives',
                                'tab-stop-propagation'
                            ],
                            selector: 'tab-stop-propagation',
                            text: 'TabStopPropagation'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'Interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'validation-message'
                            ],
                            selector: 'validation-message',
                            text: 'ValidationMessage'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'validation-messages'
                            ],
                            selector: 'validation-messages',
                            text: 'ValidationMessages'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'Services',
                    children: [
                        {
                            route: ['./', 'widgets', 'services', 'form'],
                            selector: 'form',
                            text: 'Form'
                        }
                    ]
                }
            ]
        },
        {
            text: 'grid',
            selector: 'grid',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: ['./', 'widgets', 'components', 'grid'],
                            selector: 'grid',
                            text: 'Grid'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'grid-with-icon-buttons-paginator-bar'
                            ],
                            selector: 'grid-with-icon-buttons-paginator-bar',
                            text: 'GridWithIconButtonsPaginatorBar'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-grid'
                            ],
                            selector: 'paged-grid',
                            text: 'PagedGrid'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-grid-with-raised-buttons-bar'
                            ],
                            selector: 'paged-grid-with-raised-buttons-bar',
                            text: 'PagedGridWithRaisedButtonsBar'
                        }
                    ]
                }
            ]
        },
        {
            text: 'layout',
            selector: 'layout',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'default-layout'
                            ],
                            selector: 'default-layout',
                            text: 'DefaultLayout'
                        },
                        {
                            route: ['./', 'widgets', 'components', 'loading'],
                            selector: 'loading',
                            text: 'Loading'
                        },
                        {
                            route: ['./', 'widgets', 'components', 'sidenav'],
                            selector: 'sidenav',
                            text: 'Sidenav'
                        }
                    ]
                },
                {
                    text: 'Enums',
                    selector: 'Enums',
                    children: [
                        {
                            route: ['./', 'widgets', 'enums', 'screen-size'],
                            selector: 'screen-size',
                            text: 'ScreenSize'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'Interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'sidenav-item'
                            ],
                            selector: 'sidenav-item',
                            text: 'SidenavItem'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'Services',
                    children: [
                        {
                            route: ['./', 'widgets', 'services', 'loading'],
                            selector: 'loading',
                            text: 'Loading'
                        }
                    ]
                }
            ]
        },
        {
            text: 'list',
            selector: 'list',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: ['./', 'widgets', 'components', 'list'],
                            selector: 'list',
                            text: 'List'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'list-with-icon-buttons-paginator-bar'
                            ],
                            selector: 'list-with-icon-buttons-paginator-bar',
                            text: 'ListWithIconButtonsPaginatorBar'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-list'
                            ],
                            selector: 'paged-list',
                            text: 'PagedList'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-list-with-raised-buttons-bar'
                            ],
                            selector: 'paged-list-with-raised-buttons-bar',
                            text: 'PagedListWithRaisedButtonsBar'
                        }
                    ]
                }
            ]
        },
        {
            text: 'table',
            selector: 'table',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-table'
                            ],
                            selector: 'paged-table',
                            text: 'PagedTable'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'paged-table-with-raised-buttons-bar'
                            ],
                            selector: 'paged-table-with-raised-buttons-bar',
                            text: 'PagedTableWithRaisedButtonsBar'
                        },
                        {
                            route: ['./', 'widgets', 'components', 'table'],
                            selector: 'table',
                            text: 'Table'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'table-with-icon-buttons-paginator-bar'
                            ],
                            selector: 'table-with-icon-buttons-paginator-bar',
                            text: 'TableWithIconButtonsPaginatorBar'
                        }
                    ]
                }
            ]
        },
        {
            text: 'toolbar',
            selector: 'toolbar',
            children: [
                {
                    text: 'Components',
                    selector: 'Components',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'button-toolbar'
                            ],
                            selector: 'button-toolbar',
                            text: 'ButtonToolbar'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'filter-drop-down'
                            ],
                            selector: 'filter-drop-down',
                            text: 'FilterDropDown'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'icon-buttons-with-paginator'
                            ],
                            selector: 'icon-buttons-with-paginator',
                            text: 'IconButtonsWithPaginator'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'components',
                                'raised-button-toolbar'
                            ],
                            selector: 'raised-button-toolbar',
                            text: 'RaisedButtonToolbar'
                        },
                        {
                            route: ['./', 'widgets', 'components', 'sorter'],
                            selector: 'sorter',
                            text: 'Sorter'
                        }
                    ]
                },
                {
                    text: 'Directives',
                    selector: 'Directives',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'directives',
                                'search-filter'
                            ],
                            selector: 'search-filter',
                            text: 'SearchFilter'
                        }
                    ]
                },
                {
                    text: 'Interfaces',
                    selector: 'Interfaces',
                    children: [
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'button-click'
                            ],
                            selector: 'button-click',
                            text: 'ButtonClick'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'search-filter-map'
                            ],
                            selector: 'search-filter-map',
                            text: 'SearchFilterMap'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'sort-order'
                            ],
                            selector: 'sort-order',
                            text: 'SortOrder'
                        },
                        {
                            route: [
                                './',
                                'widgets',
                                'interfaces',
                                'toolbar-button'
                            ],
                            selector: 'toolbar-button',
                            text: 'ToolbarButton'
                        }
                    ]
                },
                {
                    text: 'Services',
                    selector: 'Services',
                    children: [
                        {
                            route: ['./', 'widgets', 'services', 'filter'],
                            selector: 'filter',
                            text: 'Filter'
                        }
                    ]
                }
            ]
        }
    ],
    testing: [
        {
            text: 'Elements',
            selector: 'elements',
            children: [
                {
                    route: ['./', 'testing', 'elements', 'button'],
                    selector: 'button',
                    text: 'Button'
                },
                {
                    route: ['./', 'testing', 'elements', 'checkbox'],
                    selector: 'checkbox',
                    text: 'Checkbox'
                },
                {
                    route: ['./', 'testing', 'elements', 'collection'],
                    selector: 'collection',
                    text: 'Collection'
                },
                {
                    route: ['./', 'testing', 'elements', 'page'],
                    selector: 'page',
                    text: 'Page'
                },
                {
                    route: ['./', 'testing', 'elements', 'paged-collection'],
                    selector: 'paged-collection',
                    text: 'PagedCollection'
                },
                {
                    route: ['./', 'testing', 'elements', 'paged-table'],
                    selector: 'paged-table',
                    text: 'PagedTable'
                },
                {
                    route: [
                        './',
                        'testing',
                        'elements',
                        'paged-table-with-toolbar'
                    ],
                    selector: 'paged-table-with-toolbar',
                    text: 'PagedTableWithToolbar'
                },
                {
                    route: ['./', 'testing', 'elements', 'paginator'],
                    selector: 'paginator',
                    text: 'Paginator'
                },
                {
                    route: ['./', 'testing', 'elements', 'sidenav'],
                    selector: 'sidenav',
                    text: 'Sidenav'
                },
                {
                    route: ['./', 'testing', 'elements', 'table'],
                    selector: 'table',
                    text: 'Table'
                },
                {
                    route: ['./', 'testing', 'elements', 'toolbar'],
                    selector: 'toolbar',
                    text: 'Toolbar'
                },
                {
                    route: ['./', 'testing', 'elements', 'toolbar-header'],
                    selector: 'toolbar-header',
                    text: 'ToolbarHeader'
                }
            ]
        },
        {
            text: 'Pages',
            selector: 'pages',
            children: [
                {
                    route: ['./', 'testing', 'pages', 'default-layout-page'],
                    selector: 'default-layout-page',
                    text: 'DefaultLayoutPage'
                }
            ]
        },
        {
            text: 'Services',
            selector: 'services',
            children: [
                {
                    route: ['./', 'testing', 'services', 'datastore'],
                    selector: 'datastore',
                    text: 'Datastore'
                }
            ]
        },
        {
            route: ['./', 'testing', 'dummy-object'],
            selector: 'dummy-object',
            text: 'DummyObject'
        }
    ]
};

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {
    @ViewChild(MatSidenavContainer) sidenav!: MatSidenavContainer;
    sidenavItems: SidenavItem[] = [];

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        this.removeHidden(
            this.elementRef.nativeElement.parentElement?.parentElement
        );
    }
    ngOnInit(): void {
        this.setSidenavItems();
        this.router.events.subscribe((e) => {
            this.setSidenavItems();
        });
    }

    setSidenavItems() {
        Object.keys(routeSidenavItems).forEach((key: string) => {
            if (this.router.url.includes(`/${key}`)) {
                this.sidenavItems = routeSidenavItems[key];
            }
        });
    }

    removeHidden(el: HTMLElement | null | undefined): void {
        let parent = el?.querySelector('.sticky')?.parentElement;

        while (parent) {
            const hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible' && hasOverflow !== '') {
                parent.style.overflow = 'visible';
            }
            parent = parent.parentElement;
        }
    }
}
