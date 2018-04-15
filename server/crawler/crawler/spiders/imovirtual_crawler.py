# -*- coding: utf-8 -*-
import scrapy
import html2text

class ImovirtualCrawler(scrapy.Spider):
    name = "imovirtual"

    def start_requests(self):
        urls = [
            'https://www.imovirtual.com/comprar/apartamento/porto/'
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

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

        titleSelector = response.css('.section-offer-title')
        parametersSelector = response.css('.section-offer-params .params-list li')
        descriptionSelector = response.css('.section-offer-text div.text-contents')
        mapSelector = response.css('.section-offer-map div.ad-map')

        # Title parameters = Title, Zone
        title = titleSelector.css('h1[itemprop="name"]::text').extract_first()
        zone = titleSelector.css('p[itemprop="address"]::text').extract_first()

        # Main parameters = Price, Useful Area and Tipology
        mainParameters = parametersSelector.css('.main-list li span strong::text').extract()

        # Secondary Parameters = Brute Area, Energy Certificate, Construction Year, Condition, No. Bathrooms
        secondaryLabels = self.format_labels(parametersSelector.css('.sub-list li strong::text').extract())
        secondaryParameters = parametersSelector.css('.sub-list li::text').extract()
        secondaryDict = {}
        for i in range(0, len(secondaryLabels)):
            secondaryDict[secondaryLabels[i]] = secondaryParameters[i]

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
            'price': self.format_number(mainParameters[0]),
            'area': self.format_area(mainParameters[1]),
            'tipology': mainParameters[2],
            'characteristics': self.format_characteristics(characteristics),
            'description': self.format_description(description[0]),
            'address' : self.format_address(address),
            'webpage' : webPage
        }
        result["address"].update(self.format_zone(zone))
        result.update(self.format_secondary_parameters(secondaryDict))
        
        print(result)
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