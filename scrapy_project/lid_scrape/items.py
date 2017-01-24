# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class LidItem(scrapy.Item):

    name = scrapy.Field(serializer=str)
    type = scrapy.Field()
    image = scrapy.Field()
    price = scrapy.Field()
    size_range = scrapy.Field()
    rating = scrapy.Field()
    local = scrapy.Field()

    # details subpage
    detail_url = scrapy.Field()
    chinguard = scrapy.Field()
    weight = scrapy.Field()
    material = scrapy.Field()
    retention = scrapy.Field()
    standards = scrapy.Field()
    features = scrapy.Field()

    # impact ratings
    impact = scrapy.Field()

