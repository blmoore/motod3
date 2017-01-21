## Eve settings

# cerberus schema
schema = {
    'name': {
        'type': 'string',
        'required': True,
        'unique': True
        },
    'type': {
        'type': 'string',
        'allowed': ['Full face', 'System']
        },
    'image': {
        'type': 'string'
        },
    'price': {
        'type': 'float',
        },
    'size_range': {
        'type': 'string'
        },
    'rating': {
        'type': 'string'
        }
}

helmets = {
    'item_title': 'helmet',
    'additional_lookup': {
        'url': 'regex(".+")',
        'field': 'name'
     },

    'cache_control': '',
    'cache_expires': 0,

    'resource_methods': ['GET'],
    'schema': schema
}

DOMAIN = {
  'helmet': helmets
}

MONGO_HOST = 'localhost'
MONGO_PORT = 27017

MONGO_DBNAME = 'moto'
