#!/bin/bash

source ../venv/bin/activate

outjs=../data/lids.json

rm -f $outjs && scrapy runspider lid_scrape/spiders/spider.py -o $outjs

deactivate