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

    def parse(self, response):
        print("\n\nStarted parse\n")
        listing = response.css('div.listing');
        advertisements = response.css('div.listing .row')[0].css('article');
        firstAdvertisement = advertisements[0];
        advertisementPage = firstAdvertisement.xpath('@data-url').extract_first()
        print(advertisementPage)
        yield response.follow(advertisementPage, self.parseAdvertisement)

    def parseAdvertisement(self, response):
        mainParametersSelector = response.css('.section-offer-params .params-list li .main-list')
        secondaryParametersSelector = response.css('.section-offer-params .params-list li .sub-list')

        mainParameters = mainParametersSelector.css('li span strong::text').extract()
        secondaryParameters = secondaryParametersSelector.css('li::text').extract()
        secondaryLabelsUnformatted = secondaryParametersSelector.css('li strong::text').extract()
        print(secondaryLabelsUnformatted)
        print(self.formattedLabels)
        secondaryLabels = self.formattedLabels(secondaryParametersSelector.css('li strong::text').extract())
        print(secondaryLabels)
        print(secondaryParameters)

        result = {
            'price': mainParameters[0],
            'area': mainParameters[1],
            'tipology': mainParameters[2]
        }

        for i in range(0, len(secondaryLabels)):
            result[secondaryLabels[i]] = secondaryParameters[i]
        
        print(result)
        yield result

    def formattedLabels(self, parameters = []):
        print(parameters)
        result = []
        print("Printing labels")
        for label in parameters:
            print(label)
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
                result.append("bruteArea")
        
        print("Printing result")
        print(result)
        return result;