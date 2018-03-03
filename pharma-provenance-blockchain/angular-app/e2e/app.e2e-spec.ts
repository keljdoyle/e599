import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('navbar-brand should be pharma-provenance-blockchain@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('pharma-provenance-blockchain@0.0.1');
  });

  
    it('Batch component should be loadable',() => {
      page.navigateTo('/Batch');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Batch');
    });

    it('Batch table should have 6 columns',() => {
      page.navigateTo('/Batch');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Product');
    });

    it('Product table should have 4 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Container component should be loadable',() => {
      page.navigateTo('/Container');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Container');
    });

    it('Container table should have 4 columns',() => {
      page.navigateTo('/Container');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('IndividualPackage component should be loadable',() => {
      page.navigateTo('/IndividualPackage');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('IndividualPackage');
    });

    it('IndividualPackage table should have 7 columns',() => {
      page.navigateTo('/IndividualPackage');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  
    it('Location component should be loadable',() => {
      page.navigateTo('/Location');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Location');
    });

    it('Location table should have 4 columns',() => {
      page.navigateTo('/Location');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Shipment component should be loadable',() => {
      page.navigateTo('/Shipment');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Shipment');
    });

    it('Shipment table should have 6 columns',() => {
      page.navigateTo('/Shipment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('GoodsIssued component should be loadable',() => {
      page.navigateTo('/GoodsIssued');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('GoodsIssued');
    });

    it('GoodsIssued table should have 4 columns',() => {
      page.navigateTo('/GoodsIssued');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('GoodsReceived component should be loadable',() => {
      page.navigateTo('/GoodsReceived');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('GoodsReceived');
    });

    it('GoodsReceived table should have 4 columns',() => {
      page.navigateTo('/GoodsReceived');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
