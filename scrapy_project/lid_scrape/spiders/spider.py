#!/usr/bin/env python3.6

import scrapy

class LidSpider(scrapy.Spider):
    """ Scraper for sharp helmet ratings """

    name = 'lidspider'

    def start_requests(self):
        urls = ['https://sharp.dft.gov.uk/testhelmetlist?page=%d&sharp-make=All&sharp-model=&sharp-type=All&sharp-rating=1&discontinued=1' % i for i in range(0, 41)]
        for url in urls:
            yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        rows = response.xpath('//table[@id="search-results"]/tbody/tr')
        for row in rows:
            yield {
                'name': row.xpath('./td[contains(@class, "views-field-title-1")]/a/text()').extract(),
                'type': row.xpath('./td[contains(@class, "views-field-name")]/text()').extract(),
                'image': row.xpath('./td[contains(@class, "views-field-field-helmet-image-fid-1")]/img/@src').extract(),
                'price': row.xpath('./td[contains(@class, "views-field-field-price-value")]/text()').extract(),
                'size_range': row.xpath('./td[contains(@class, "views-field-tid")]/text()').extract()
            }

