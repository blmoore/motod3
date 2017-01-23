#!/usr/bin/env python3.6

import scrapy

from lid_scrape.items import LidItem


def impact_xpath(region: str) -> str:
    """ Generate XPath for the different impact fields """
    xpath = 'substring(//span[contains(@class, "{region}-")]/@class, {start}, 1)'
    return xpath.format(region=region, start=len(region) + 2)


def detail_table_xpath(label: str) -> str:
    """ For details table get cell value under header """
    return '//dt[text()="{dt_label}"]/following::dd/text()'.format(dt_label=label)

class LidSpider(scrapy.Spider):
    """ Scraper for sharp helmet ratings """

    name = 'lidspider'

    def start_requests(self):
        urls = ['https://sharp.dft.gov.uk/testhelmetlist?page=%d&sharp-make=All&sharp-model=&sharp-type=All&sharp-rating=1&discontinued=1' % i for i in range(0, 41)]
        for url in urls:
            yield scrapy.Request(url, callback=self.parse_summary)

    def parse_summary(self, response):
        rows = response.xpath('//table[@id="search-results"]/tbody/tr')
        for row in rows:
            item = LidItem()
            item['name'] = row.xpath('./td[contains(@class, "views-field-title-1")]/a/text()').extract_first()
            item['type'] = row.xpath('./td[contains(@class, "views-field-name")]/text()').extract_first()
            item['image'] = row.xpath('./td[contains(@class, "views-field-field-helmet-image-fid-1")]/img/@src').extract()
            item['price'] =  row.xpath('./td[contains(@class, "views-field-field-price-value")]/text()').extract_first()
            item['size_range'] = row.xpath('./td[contains(@class, "views-field-tid")]/text()').extract_first()
            item['rating'] = row.xpath('substring(./td[contains(@class, "views-field-field-rating-value")]/img/@alt, 1, 1)').extract_first()

            details_href = ('https://sharp.dft.gov.uk' +
                            row.xpath('./td[contains(@class, "views-field-title-1")]/a/@href').extract_first())
            yield scrapy.Request(details_href,
                                 callback=self.parse_details,
                                 meta={'item': item})


    def parse_details(self, response):

        item = response.meta['item']
        item['detail_url'] = response.url

        # details from strange table
        item['chinguard'] = response.xpath('//p[contains(@class, "impact")]/span/text()').extract_first()

        # these vary, need to match by text and get next node
        item['weight'] = response.xpath(detail_table_xpath('Weight')).extract_first()
        item['material'] = response.xpath('//dt[text()="Construction materials"]/following::dd/ul/li/text()').extract_first()
        item['retention'] = response.xpath(detail_table_xpath('Retention system')).extract_first()
        item['standards'] = response.xpath(detail_table_xpath('Other standards')).extract_first()

        # grab feature list from sidebar
        item['features'] = response.xpath('//ul[contains(@class, "features")]/li/text()').extract()

        # impact ratings from colourmap
        item['impact'] = {}
        for pos in 'top front left right back'.split():
            this_xpath = impact_xpath(pos)
            item['impact'][pos] = response.xpath(this_xpath).extract_first()

        yield item


