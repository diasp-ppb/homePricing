# -*- coding: utf-8 -*-
import scrapy

class ImovirtualCrawler(scrapy.Spider):
    name = "imovirtual"

    def start_requests(self):
        urls = [
            'https://www.imovirtual.com/comprar/apartamento/porto/'
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
			
	def formatNumber(stringNumber):
		return int(filter(str.isdigit, stringNumber))
    
	def formatName(stringName):
		name_list = stringName.split(",")
		result = []
		for val in name_list:
			result.append(val.lstrip())
		return result
    
	def formatCharacteristics(characteristics):
		char_list = []
		for val in characteristics:
			char_list.append(val.lstrip())
		return char_list

    def parse(self, response):
        print("\n\nStarted parse\n")
        listing = response.css('div.listing');
        advertisements = response.css('div.listing .row')[0].css('article');
        for advertisement in advertisements:
            advertisement_page = advertisement.xpath('@data-url').extract_first()
            yield response.follow(advertisement_page, self.parseAdvertisement)

        next_page = response.css('.pager-next a[data-dir="next"]').xpath('@href').extract_first()
        if next_page is not None:
            yield response.follow(next_page, self.parse)

    def parseAdvertisement(self, response):

        titleSelector = response.css('.section-offer-title')
        parametersSelector = response.css('.section-offer-params .params-list li')
        descriptionSelector = response.css('.section-offer-text div.text-contents')
        mapSelector = response.css('.section-offer-map div.ad-map')

        # Title parameters = Title, Zone
        title = titleSelector.css('h1[itemprop="name"]::text').extract_first()
        zone = titleSelector.css('p[itemprop="address"]::text').extract_first() #TODO Extrair a freguesia e o distrito

        # Main parameters = Price, Useful Area and Tipology
        mainParameters = parametersSelector.css('.main-list li span strong::text').extract()

        # Secondary Parameters = Brute Area, Energy Certificate, Construction Year, Condition, No. Bathrooms
        secondaryLabels = self.formatLabels(parametersSelector.css('.sub-list li strong::text').extract())
        secondaryParameters = parametersSelector.css('.sub-list li::text').extract()

        # Characteristics
        characteristics = parametersSelector.css('.dotted-list li::text').extract()

        # Description
        description = descriptionSelector.css('div[itemprop="description"]').extract() #TODO Criar um parser de HTML para texto

        # Address
        address = mapSelector.css('div.ad-map-location-holder h4.ad-map-location::text').extract_first()

        # Web page
        webPage = response.url

        result = {
            'title': title,
            'zone' : zone,
            'price': mainParameters[0],
            'area': mainParameters[1],
            'tipology': mainParameters[2],
            'characteristics': characteristics,
            'description': description,
            'address' : address,
            'webpage' : webPage
        }
        for i in range(0, len(secondaryLabels)):
            result[secondaryLabels[i]] = secondaryParameters[i]
        
        print(result)
        yield result

    def formatLabels(self, parameters = []):
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
        
        return result;