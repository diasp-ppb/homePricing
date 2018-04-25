# -*- coding: utf-8 -*-
import scrapy
import html2text

class ImovirtualCrawler(scrapy.Spider):
    name = "imovirtual"
    urls = [
            'https://www.imovirtual.com/comprar/apartamento/porto/'
    ]
    test_url = ""

    def __init__(self, test_url=None, *args, **kwargs):
        super(ImovirtualCrawler, self).__init__(*args, **kwargs)
        self.test_url = test_url

    def start_requests(self):
        for url in self.urls:
            if not self.test_url:
                yield scrapy.Request(url=url, callback=self.parse)
            else:
                yield scrapy.Request(url=self.test_url, callback=self.parseAdvertisement)

    def parse(self, response):
        print("\n\nStarted parse\n")
        listing = response.css('div.listing');
        advertisements = response.css('div.listing .row')[0].css('article');
        for advertisement in advertisements:
            advertisement_page = advertisement.xpath('@data-url').extract_first()
            yield response.follow(advertisement_page, self.parseAdvertisement)

        '''
        THIS WAS COMMENTED FOR TESTING PURPOSES

        next_page = response.css('.pager-next a[data-dir="next"]').xpath('@href').extract_first()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
        '''

    def parseAdvertisement(self, response):
        result = {
            'title': self.extract_title(response),
            'price': self.extract_price(response),
            'area': self.extract_area(response),
            'tipology': self.extract_tipology(response),
            'characteristics': self.extract_characteristics(response),
            'description': self.extract_description(response),
            'address' : self.extract_address(response),
            'webpage' : response.url,
            'images' : self.extract_images(response),
            'coordinates' : self.extract_coordinates(response)
        }
        result.update(self.extract_secondary_parameters(response))
        yield result

    def format_labels(self, parameters = []):
        result = []
        for label in parameters:
            if label == u"Ano de construção:":
                result.append("year")
            elif label == u"Certificado Energético:":
                result.append("energyCertificate")
            elif label == u"Condição:":
                result.append("condition")
            elif label == u"Casas de Banho:":
                result.append("bathrooms")
            elif label == u"Negociável:":
                result.append("negotiable")
            elif label == u"Área bruta (m²):":
                result.append("grossArea")
        
        return result
    
    def format_secondary_parameters(self, dictionary = {}):
        result = {}
        for label, value in dictionary.items():
            if label == "year":
                result[label] = self.format_number(value)
            elif label == "energyCertificate":
                result[label] = self.format_name(value)[0]
            elif label == "condition":
                result[label] = self.format_name(value)[0]
            elif label == "bathrooms":
                result[label] = self.format_number(value)
            elif label == "negotiable":
                result[label] = self.format_name(value)
            elif label == "grossArea":
                result[label] = self.format_area(value)

        return result
        
    def format_number(self, stringNumber):
        if type(stringNumber) is str:
            return int(filter(str.isdigit, stringNumber))
        elif type(stringNumber) is unicode:
            return int(filter(unicode.isdigit, stringNumber))

    def format_area(self, stringArea):
        return int(filter(unicode.isdigit, stringArea[0:-1]))
    
    def format_name(self, stringName):
		name_list = stringName.split(",")
		result = []
		for val in name_list:
			result.append(val.lstrip())
		return result
    
    def format_characteristics(self, characteristics):
		char_list = []
		for val in characteristics:
			char_list.append(val.lstrip())
		return char_list

    def format_address(self, address):
        result = {}
        address_list = address.split(",")
        result["zipcode"] = address_list[0].lstrip()
        result["county"] = address_list[1].lstrip()
        result["town"] = ",".join(address_list[2:]).lstrip()
        return result

    def format_description(self, description):
        converter = html2text.HTML2Text()
        converter.ignore_links = True
        return converter.handle(description)

    def format_zone(self, zone):
        result = {}
        zone_list = zone.split(",")
        result["town"] = ",".join(zone_list[:-1]).lstrip()
        result["district"] = zone_list[-1].lstrip()
        return result

    def format_coordinates(self, coordinates):
        result = []
        for val in coordinates:
            result.append(float(val))
        return result

    def extract_title(self, response):
        titleSelector = response.css('.section-offer-title')
        title = titleSelector.css('h1[itemprop="name"]::text').extract_first()
        return title
    
    def extract_price(self, response):
        parametersSelector = response.css('.section-offer-params .params-list li')
        price = parametersSelector.css('.main-list li span strong::text').extract()[0]
        return self.format_number(price)

    def extract_area(self, response):
        parametersSelector = response.css('.section-offer-params .params-list li')
        area = parametersSelector.css('.main-list li span strong::text').extract()[1]
        return self.format_area(area)

    def extract_tipology(self, response):
        parametersSelector = response.css('.section-offer-params .params-list li')
        tipology = parametersSelector.css('.main-list li span strong::text').extract()[2]
        return tipology

    def extract_characteristics(self, response):
        parametersSelector = response.css('.section-offer-params .params-list li')
        characteristics = parametersSelector.css('.dotted-list li::text').extract()
        return self.format_characteristics(characteristics)

    def extract_description(self, response):
        descriptionSelector = response.css('.section-offer-text div.text-contents')
        description = descriptionSelector.css('div[itemprop="description"]').extract_first()
        return self.format_description(description)

    def extract_address(self, response):
        mapSelector = response.css('.section-offer-map div.ad-map')
        titleSelector = response.css('.section-offer-title')
        address = self.format_address(mapSelector.css('div.ad-map-location-holder h4.ad-map-location::text').extract_first())
        zone = titleSelector.css('p[itemprop="address"]::text').extract_first()
        address.update(self.format_zone(zone))
        return address

    def extract_images(self, response):
        imageSelector = response.css('.section-offer-gallery')
        images = imageSelector.css('.col-md-offer-content div.slider-for figure img').xpath('@src').extract()
        return images

    def extract_secondary_parameters(self, response):
        parametersSelector = response.css('.section-offer-params .params-list li')
        secondaryLabels = self.format_labels(parametersSelector.css('.sub-list li strong::text').extract())
        secondaryParameters = parametersSelector.css('.sub-list li::text').extract()
        secondaryDict = {}
        for i in range(0, len(secondaryLabels)):
            secondaryDict[secondaryLabels[i]] = secondaryParameters[i]
        return self.format_secondary_parameters(secondaryDict)

    def extract_coordinates(self, response):
        mapSelector = response.css('.section-offer-map div.ad-map-holder')
        latitude = mapSelector.css('#adDetailInlineMap').xpath('@data-poi-lat').extract_first()
        longitude = mapSelector.css('#adDetailInlineMap').xpath('@data-poi-lon').extract_first()
        return self.format_coordinates([latitude, longitude])
